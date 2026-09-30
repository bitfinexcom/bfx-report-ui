import React, { useMemo, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, Card, Elevation } from '@blueprintjs/core'
import { invert, isEmpty } from '@bitfinex/lib-js-util-base'

import DateInput from 'ui/DateInput'
import InitSyncNote from 'ui/InitSyncNote'
import RefreshButton from 'ui/RefreshButton'
import NavSwitcher from 'ui/NavSwitcher/NavSwitcher'
import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import {
  generateSnapshots,
  cancelSnapshotsGeneration,
} from 'state/snapshots/actions'
import {
  getTimestamp,
  getPageLoading,
  getDataReceived,
  getWalletsEntries,
  getPositionsTotalPl,
  getPositionsEntries,
  getWalletsTotalBalance,
  getWalletsTickersEntries,
  getPositionsTickersEntries,
} from 'state/snapshots/selectors'
import queryConstants from 'state/query/constants'
import { isValidTimeStamp } from 'state/query/utils'
import { getIsFirstSyncing } from 'state/sync/selectors'

import GenerationNote from './Snapshots.note'
import TickersSnapshot from './TickersSnapshot'
import WalletsSnapshot from './WalletsSnapshot'
import PositionsSnapshot from './PositionsSnapshot'

const {
  MENU_TICKERS,
  MENU_WALLETS,
  MENU_POSITIONS,
} = queryConstants

const SECTION_PATHS = {
  [MENU_TICKERS]: '/snapshots_tickers',
  [MENU_WALLETS]: '/snapshots_wallets',
  [MENU_POSITIONS]: '/snapshots_positions',
}

const SECTIONS_BY_PATH = invert(SECTION_PATHS)

const Snapshots = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const { pathname, search } = useLocation()
  const currentTime = useSelector(getTimestamp)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const walletsEntries = useSelector(getWalletsEntries)
  const isFirstSyncing = useSelector(getIsFirstSyncing)
  const positionsEntries = useSelector(getPositionsEntries)
  const positionsTotalPlUsd = useSelector(getPositionsTotalPl)
  const walletsTotalBalanceUsd = useSelector(getWalletsTotalBalance)
  const walletsTickersEntries = useSelector(getWalletsTickersEntries)
  const positionsTickersEntries = useSelector(getPositionsTickersEntries)
  const [endTime, setEndTime] = useState(() => (currentTime ? new Date(currentTime) : null))
  const section = SECTIONS_BY_PATH[pathname] ?? ''
  const isLoading = !dataReceived && pageLoading
  const isNotGenerated = !dataReceived && !pageLoading

  const sections = useMemo(() => [
    { value: MENU_POSITIONS, label: t('positions.title') },
    { value: MENU_TICKERS, label: t('tickers.title') },
    { value: MENU_WALLETS, label: t('wallets.title') },
  ], [t])

  const switchSection = useCallback(
    (value) => history.push(`${SECTION_PATHS[value]}${search}`),
    [history, search],
  )

  // the date is only kept locally until the user explicitly requests generation
  const handleDateChange = useCallback((time) => {
    const end = time && time.getTime()
    if (isValidTimeStamp(end) || time === null) {
      setEndTime(time)
    }
  }, [])

  const handleGenerate = useCallback(
    () => dispatch(generateSnapshots(endTime?.getTime())),
    [dispatch, endTime],
  )

  const handleCancel = useCallback(
    () => dispatch(cancelSnapshotsGeneration()),
    [dispatch],
  )

  let showContent
  if (isFirstSyncing) {
    showContent = <InitSyncNote />
  } else if (isNotGenerated) {
    showContent = <GenerationNote />
  } else if (section === MENU_WALLETS) {
    showContent = (
      <WalletsSnapshot
        isLoading={isLoading}
        entries={walletsEntries}
        totalBalanceUsd={walletsTotalBalanceUsd}
      />
    )
  } else if (section === MENU_POSITIONS) {
    showContent = (
      <PositionsSnapshot
        isLoading={isLoading}
        entries={positionsEntries}
        totalPlUsd={positionsTotalPlUsd}
        isNoData={isEmpty(positionsEntries)}
      />
    )
  } else {
    showContent = (
      <TickersSnapshot
        isLoading={isLoading}
        walletsTickersEntries={walletsTickersEntries}
        positionsTickersEntries={positionsTickersEntries}
      />
    )
  }

  return (
    <Card
      elevation={Elevation.ZERO}
      className='snapshots col-lg-12 col-md-12 col-sm-12 col-xs-12'
    >
      <SectionHeader>
        <SectionHeaderTitle>
          {t('snapshots.title')}
        </SectionHeaderTitle>
        <NavSwitcher
          value={section}
          items={sections}
          onChange={switchSection}
        />
        <SectionHeaderRow>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('query.endTime')}
            </SectionHeaderItemLabel>
            <DateInput
              defaultValue={endTime}
              onChange={handleDateChange}
              isDisabled={isFirstSyncing || isLoading}
            />
          </SectionHeaderItem>
          {isLoading ? (
            <Button
              onClick={handleCancel}
              className='refresh-button'
            >
              {t('framework.cancel')}
            </Button>
          ) : (
            <RefreshButton
              onClick={handleGenerate}
              disabled={isFirstSyncing}
              label={t('snapshots.generate')}
            />
          )}
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default Snapshots
