import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Card, Elevation } from '@blueprintjs/core'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import config from 'config'
import DataTable from 'ui/DataTable'
import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import TimeRange from 'ui/TimeRange'
import PairSelector from 'ui/PairSelector'
import SectionSwitch from 'ui/SectionSwitch'
import {
  setTargetPair,
  fetchWeightedAwerages,
} from 'state/weightedAverages/actions'
import { setShouldRefreshAfterSync } from 'state/sync/actions'
import {
  getEntries,
  getNextPage,
  getPageLoading,
  getTargetPair,
  getDataReceived,
} from 'state/weightedAverages/selectors'
import {
  getIsSyncRequired,
  getShouldRefreshAfterSync,
} from 'state/sync/selectors'
import { getFullTime } from 'state/base/selectors'
import { getColumns } from 'state/filters/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import useFetchLifecycle from 'hooks/useFetchLifecycle'
import useSinglePairFilter from 'hooks/useSinglePairFilter'
import queryConstants from 'state/query/constants'

import LimitNote from './WeightedAverages.note'
import { getColumns as getTableColumns } from './WeightedAverages.columns'

const { showFrameworkMode } = config
const TYPE = queryConstants.MENU_WEIGHTED_AVERAGES

const WeightedAverages = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  const nextPage = useSelector(getNextPage)
  const getFullTimeFn = useSelector(getFullTime)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const match = useRouteMatch('/weighted_averages/:pair')
  const columns = useSelector(state => getColumns(state, TYPE))
  const columnsWidth = useSelector(state => getColumnsWidth(state, TYPE))
  const shouldRefreshAfterSync = useSelector(getShouldRefreshAfterSync)

  useFetchLifecycle(TYPE, {
    match,
    pageLoading,
    dataReceived,
    isSyncRequired,
    shouldRefreshAfterSync,
    setTargetPair: (p) => dispatch(setTargetPair(p)),
    fetchData: () => dispatch(fetchWeightedAwerages()),
    setShouldRefreshAfterSync: (v) => dispatch(setShouldRefreshAfterSync(v)),
  })

  const { targetPair, setPair } = useSinglePairFilter(TYPE, {
    getTargetPair,
    setTargetPair,
  })

  const isNoData = isEmpty(entries)
  const isLoading = !dataReceived && pageLoading
  const tableColumns = getTableColumns({
    t,
    isNoData,
    isLoading,
    columnsWidth,
    filteredData: entries,
    getFullTime: getFullTimeFn,
  }).filter(({ id }) => columns[id])

  let showContent
  if (isNoData) {
    showContent = (
      <div className='data-table-wrapper'>
        <DataTable
          numRows={1}
          section={TYPE}
          isNoData={isNoData}
          isLoading={isLoading}
          tableColumns={tableColumns}
        />
      </div>
    )
  } else {
    showContent = (
      <DataTable
        numRows={1}
        section={TYPE}
        tableColumns={tableColumns}
      />
    )
  }

  return (
    <Card
      elevation={Elevation.ZERO}
      className='weighted-averages col-lg-12 col-md-12 col-sm-12 col-xs-12'
    >
      <SectionHeader>
        <SectionHeaderTitle>
          {t('weightedaverages.title')}
        </SectionHeaderTitle>
        {showFrameworkMode && (
          <SectionSwitch target={TYPE} />
        )}
        {nextPage && <LimitNote />}
        <SectionHeaderRow>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.date')}
            </SectionHeaderItemLabel>
            <TimeRange className='section-header-time-range' />
          </SectionHeaderItem>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.symbol')}
            </SectionHeaderItemLabel>
            <PairSelector
              currentPair={targetPair}
              onPairSelect={setPair}
            />
          </SectionHeaderItem>
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default WeightedAverages
