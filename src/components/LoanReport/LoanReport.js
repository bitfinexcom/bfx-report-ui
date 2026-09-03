import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Elevation } from '@blueprintjs/core'
import classNames from 'classnames'
import { isEmpty, orderBy } from '@bitfinex/lib-js-util-base'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import Chart from 'ui/Charts/Chart'
import TimeRange from 'ui/TimeRange'
import InitSyncNote from 'ui/InitSyncNote'
import SectionSwitch from 'ui/SectionSwitch'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import { parseLoanReportChartData } from 'ui/Charts/Charts.helpers'
import {
  setParams,
  addTargetSymbol,
  fetchLoanReport,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
} from 'state/loanReport/actions'
import { setShouldRefreshAfterSync } from 'state/sync/actions'
import {
  getParams,
  getEntries,
  getPageLoading,
  getDataReceived,
  getTargetSymbols,
  getCurrentFetchParams,
} from 'state/loanReport/selectors'
import {
  getIsSyncRequired,
  getIsFirstSyncing,
  getShouldRefreshAfterSync,
} from 'state/sync/selectors'
import queryConstants from 'state/query/constants'
import useSymbolFilter from 'hooks/useSymbolFilter'
import useFetchLifecycle from 'hooks/useFetchLifecycle'
import { getIsTimeframeMoreThanYear } from 'state/timeRange/selectors'

const TYPE = queryConstants.MENU_LOAN_REPORT

const LoanReport = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const params = useSelector(getParams)
  const entries = useSelector(getEntries)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const match = useRouteMatch('/loan_report/:symbol')
  const isSyncRequired = useSelector(getIsSyncRequired)
  const isFirstSyncing = useSelector(getIsFirstSyncing)
  const shouldShowYear = useSelector(getIsTimeframeMoreThanYear)
  const currentFetchParams = useSelector(getCurrentFetchParams)
  const shouldRefreshAfterSync = useSelector(getShouldRefreshAfterSync)

  const { timeframe } = params
  const { timeframe: currTimeframe } = currentFetchParams

  useFetchLifecycle(TYPE, {
    match,
    params,
    pageLoading,
    dataReceived,
    isSyncRequired,
    shouldRefreshAfterSync,
    fetchData: () => dispatch(fetchLoanReport()),
    setTargetSymbols: (s) => dispatch(setTargetSymbols(s)),
    setShouldRefreshAfterSync: (v) => dispatch(setShouldRefreshAfterSync(v)),
  })

  const { targetSymbols, toggleSymbol, clearSymbols } = useSymbolFilter(TYPE, {
    getTargetSymbols,
    addTargetSymbol,
    removeTargetSymbol,
    clearTargetSymbols,
  })

  const handleTimeframeChange = useCallback((tf) => {
    dispatch(setParams({ timeframe: tf }))
  }, [dispatch])

  const { chartData, dataKeys } = useMemo(
    () => parseLoanReportChartData({
      t,
      shouldShowYear,
      timeframe: currTimeframe,
      data: orderBy(entries, ['mts']),
    }),
    [entries, currTimeframe, shouldShowYear, t],
  )

  const paramChangerClass = classNames({ disabled: isFirstSyncing })

  let showContent
  if (isFirstSyncing) {
    showContent = <InitSyncNote />
  } else if (!dataReceived && pageLoading) {
    showContent = <Loading />
  } else if (isEmpty(entries)) {
    showContent = <NoData />
  } else {
    showContent = (
      <Chart
        data={chartData}
        dataKeys={dataKeys}
      />
    )
  }

  return (
    <Card
      elevation={Elevation.ZERO}
      className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
    >
      <SectionHeader>
        <SectionHeaderTitle>
          {t('loanreport.title')}
        </SectionHeaderTitle>
        <SectionSwitch target={TYPE} />
        <SectionHeaderRow>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.date')}
            </SectionHeaderItemLabel>
            <TimeRange className={paramChangerClass} />
          </SectionHeaderItem>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.symbol')}
            </SectionHeaderItemLabel>
            <MultiSymbolSelector
              toggleSymbol={toggleSymbol}
              currentFilters={targetSymbols}
              className={paramChangerClass}
            />
          </SectionHeaderItem>
          <ClearFiltersButton onClick={clearSymbols} />
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.select')}
            </SectionHeaderItemLabel>
            <TimeFrameSelector
              value={timeframe}
              className={paramChangerClass}
              onChange={handleTimeframeChange}
            />
          </SectionHeaderItem>
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default LoanReport
