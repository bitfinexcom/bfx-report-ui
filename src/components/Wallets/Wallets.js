import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Elevation } from '@blueprintjs/core'

import config from 'config'
import DateInput from 'ui/DateInput'
import InitSyncNote from 'ui/InitSyncNote'
import BalancePrecisionSelector from 'ui/BalancePrecisionSelector'
import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import {
  refresh,
  setTimestamp,
  setExactBalance,
} from 'state/wallets/actions'
import {
  getEntries,
  getTimestamp,
  getPageLoading,
  getExactBalance,
  getDataReceived,
} from 'state/wallets/selectors'
import useFetchLifecycle from 'hooks/useFetchLifecycle'
import queryConstants from 'state/query/constants'
import { isValidTimeStamp } from 'state/query/utils'
import { getIsSyncRequired, getIsFirstSyncing } from 'state/sync/selectors'

import WalletsData from './Wallets.data'

const TYPE = queryConstants.MENU_WALLETS
const isFrameworkMode = config.showFrameworkMode

const Wallets = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  const currentTime = useSelector(getTimestamp)
  const pageLoading = useSelector(getPageLoading)
  const exactBalance = useSelector(getExactBalance)
  const dataReceived = useSelector(getDataReceived)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const isFirstSyncing = useSelector(getIsFirstSyncing)

  useFetchLifecycle(TYPE, {
    pageLoading,
    dataReceived,
    isSyncRequired,
    fetchData: () => dispatch(refresh()),
    params: { timestamp: currentTime, exactBalance },
  })

  const dateValue = useMemo(
    () => (currentTime ? new Date(currentTime) : null),
    [currentTime],
  )

  const handleDateChange = useCallback((time) => {
    const end = time && time.getTime()
    if (isValidTimeStamp(end) || time === null) {
      dispatch(setTimestamp(end))
    }
  }, [dispatch])

  const handleExactBalanceChange = useCallback(
    (value) => dispatch(setExactBalance(value)),
    [dispatch],
  )

  const isLoading = !dataReceived && pageLoading

  return (
    <Card
      elevation={Elevation.ZERO}
      className='col-lg-12 col-md-12 col-sm-12 col-xs-12 section-wallets'
    >
      <SectionHeader>
        <SectionHeaderTitle>
          {t('navItems.myHistory.walletsTabs.balances')}
        </SectionHeaderTitle>
        {isFrameworkMode && (
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('query.endTime')}
              </SectionHeaderItemLabel>
              <DateInput
                defaultValue={dateValue}
                onChange={handleDateChange}
              />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.balance-precision.title')}
              </SectionHeaderItemLabel>
              <BalancePrecisionSelector
                value={exactBalance}
                onChange={handleExactBalanceChange}
              />
            </SectionHeaderItem>
          </SectionHeaderRow>
        )}
      </SectionHeader>
      {isFirstSyncing ? (
        <InitSyncNote />
      ) : (
        <WalletsData
          entries={entries}
          isLoading={isLoading}
        />
      )}
    </Card>
  )
}

export default Wallets
