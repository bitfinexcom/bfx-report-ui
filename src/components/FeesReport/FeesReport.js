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
import ReportTypeSelector from 'ui/ReportTypeSelector'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import { parseFeesReportChartData } from 'ui/Charts/Charts.helpers'
import {
  setParams,
  setReportType,
  fetchFeesReport,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
} from 'state/feesReport/actions'
import { setShouldRefreshAfterSync } from 'state/sync/actions'
import {
  getParams,
  getEntries,
  getReportType,
  getPageLoading,
  getDataReceived,
  getTargetSymbols,
  getCurrentFetchParams,
} from 'state/feesReport/selectors'
import {
  getIsSyncRequired,
  getIsFirstSyncing,
  getShouldRefreshAfterSync,
} from 'state/sync/selectors'
import queryConstants from 'state/query/constants'
import useSymbolFilter from 'hooks/useSymbolFilter'
import useFetchLifecycle from 'hooks/useFetchLifecycle'
import reportTypeConstants from 'ui/ReportTypeSelector/constants'
import { getIsTimeframeMoreThanYear } from 'state/timeRange/selectors'

const TYPE = queryConstants.MENU_FEES_REPORT

const getReportTypeParams = (type) => {
  switch (type) {
    case reportTypeConstants.TRADING_FEES:
      return { isTradingFees: true, isFundingFees: false }
    case reportTypeConstants.FUNDING_FEES:
      return { isTradingFees: false, isFundingFees: true }
    case reportTypeConstants.FUNDING_TRADING_FEES:
      return { isTradingFees: true, isFundingFees: true }
    default:
      return { isTradingFees: true, isFundingFees: false }
  }
}

const FeesReport = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const params = useSelector(getParams)
  const entries = useSelector(getEntries)
  const reportType = useSelector(getReportType)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const match = useRouteMatch('/fees_report/:symbol')
  const isSyncRequired = useSelector(getIsSyncRequired)
  const isFirstSyncing = useSelector(getIsFirstSyncing)
  const currentFetchParams = useSelector(getCurrentFetchParams)
  const shouldShowYear = useSelector(getIsTimeframeMoreThanYear)
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
    fetchData: () => dispatch(fetchFeesReport()),
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

  const handleReportTypeChange = useCallback((type) => {
    dispatch(setReportType(type))
    dispatch(setParams(getReportTypeParams(type)))
  }, [dispatch])

  const { chartData, dataKeys } = useMemo(
    () => parseFeesReportChartData({
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
        isSumUpEnabled
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
          {t('feesreport.title')}
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
              className={paramChangerClass}
              currentFilters={targetSymbols}
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
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.report-type.title')}
            </SectionHeaderItemLabel>
            <ReportTypeSelector
              section={TYPE}
              value={reportType}
              className={paramChangerClass}
              onChange={handleReportTypeChange}
            />
          </SectionHeaderItem>
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default FeesReport
