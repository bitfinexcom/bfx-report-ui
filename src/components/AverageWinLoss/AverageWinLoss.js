import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Elevation } from '@blueprintjs/core'
import classNames from 'classnames'
import _sortBy from 'lodash/sortBy'
import { isEmpty } from '@bitfinex/lib-js-util-base'

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
import {
  parseChartData,
  parseVSAccBalanceChartData,
} from 'ui/Charts/Charts.helpers'
import ReportTypeSelector from 'ui/ReportTypeSelector'
import UnrealizedProfitSelector from 'ui/UnrealizedProfitSelector'
import {
  setParams,
  fetchWinLoss,
  setReportType,
} from 'state/winLoss/actions'
import {
  getParams,
  getEntries,
  getReportType,
  getPageLoading,
  getDataReceived,
  getCurrentFetchParams,
} from 'state/winLoss/selectors'
import { getIsTimeframeMoreThanYear } from 'state/timeRange/selectors'
import {
  getIsSyncRequired,
  getIsFirstSyncing,
  getShouldRefreshAfterSync,
} from 'state/sync/selectors'
import { setShouldRefreshAfterSync } from 'state/sync/actions'
import queryConstants from 'state/query/constants'
import constants from 'ui/ReportTypeSelector/constants'
import useFetchLifecycle from 'hooks/useFetchLifecycle'

const TYPE = queryConstants.MENU_WIN_LOSS

const prepareChartData = (
  entries, timeframe, isVSAccBalanceData, shouldShowYear, t,
) => {
  if (isVSAccBalanceData) {
    const { chartData, dataKeys } = parseVSAccBalanceChartData({
      data: _sortBy(entries, ['mts']),
      shouldShowYear,
      timeframe,
      t,
    })
    return { chartData, dataKeys }
  }

  const { chartData, presentCurrencies } = parseChartData({
    data: _sortBy(entries, ['mts']),
    shouldShowYear,
    timeframe,
  })
  return { chartData, dataKeys: presentCurrencies }
}

const getReportTypeParams = (type) => {
  switch (type) {
    case constants.WIN_LOSS:
      return { isVsAccountBalanceSelected: false }
    case constants.GAINS_DEPOSITS:
      return { isVsAccountBalanceSelected: true, isVSPrevDayBalance: false }
    case constants.GAINS_BALANCE:
      return { isVsAccountBalanceSelected: true, isVSPrevDayBalance: true }
    default:
      return { isVsAccountBalanceSelected: false }
  }
}

const AverageWinLoss = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  const params = useSelector(getParams)
  const reportType = useSelector(getReportType)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const isFirstSyncing = useSelector(getIsFirstSyncing)
  const currentFetchParams = useSelector(getCurrentFetchParams)
  const shouldShowYear = useSelector(getIsTimeframeMoreThanYear)
  const shouldRefreshAfterSync = useSelector(getShouldRefreshAfterSync)

  const { timeframe, isUnrealizedProfitExcluded, isVsAccountBalanceSelected } = params
  const { timeframe: currTimeframe } = currentFetchParams

  useFetchLifecycle(TYPE, {
    dataReceived,
    pageLoading,
    isSyncRequired,
    fetchData: () => dispatch(fetchWinLoss()),
    params,
    shouldRefreshAfterSync,
    setShouldRefreshAfterSync: (val) => dispatch(setShouldRefreshAfterSync(val)),
  })

  const handleTimeframeChange = useCallback((tf) => {
    dispatch(setParams({ timeframe: tf }))
  }, [dispatch])

  const handleUnrealizedProfitChange = useCallback((val) => {
    dispatch(setParams({ isUnrealizedProfitExcluded: val }))
  }, [dispatch])

  const handleReportTypeChange = useCallback((rpType) => {
    const rpParams = getReportTypeParams(rpType)
    dispatch(setReportType(rpType))
    dispatch(setParams(rpParams))
  }, [dispatch])

  const paramChangerClass = classNames({ disabled: isFirstSyncing })

  const { chartData, dataKeys } = useMemo(
    () => prepareChartData(
      entries, currTimeframe, isVsAccountBalanceSelected, shouldShowYear, t,
    ),
    [entries, currTimeframe, isVsAccountBalanceSelected, shouldShowYear, t],
  )

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
          {t('averagewinloss.title')}
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
              {t('selector.unrealized-profits.title')}
            </SectionHeaderItemLabel>
            <UnrealizedProfitSelector
              className={paramChangerClass}
              value={isUnrealizedProfitExcluded}
              onChange={handleUnrealizedProfitChange}
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

export default AverageWinLoss
