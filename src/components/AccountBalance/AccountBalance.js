import React, {
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Elevation } from '@blueprintjs/core'
import classNames from 'classnames'
import { isEmpty, isEqual, orderBy } from '@bitfinex/lib-js-util-base'

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
import TimeFrameSelector from 'ui/TimeFrameSelector'
import parseChartData from 'ui/Charts/Charts.helpers'
import UnrealizedProfitSelector from 'ui/UnrealizedProfitSelector'
import { setParams, fetchBalance } from 'state/accountBalance/actions'
import {
  getEntries,
  getTimeframe,
  getPageLoading,
  getDataReceived,
  getCurrentTimeFrame,
  getIsUnrealizedProfitExcluded,
} from 'state/accountBalance/selectors'
import { getTimeRange, getIsTimeframeMoreThanYear } from 'state/timeRange/selectors'
import {
  getIsSyncRequired,
  getIsFirstSyncing,
  getShouldRefreshAfterSync,
} from 'state/sync/selectors'
import { setShouldRefreshAfterSync } from 'state/sync/actions'

const AccountBalance = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const lastFetchParams = useRef(null)
  const entries = useSelector(getEntries)
  const timeFrame = useSelector(getTimeframe)
  const timeRange = useSelector(getTimeRange)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isFirstSync = useSelector(getIsFirstSyncing)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const currTimeFrame = useSelector(getCurrentTimeFrame)
  const shouldShowYear = useSelector(getIsTimeframeMoreThanYear)
  const isLoading = isFirstSync || (!dataReceived && pageLoading)
  const paramChangerClass = classNames({ disabled: isFirstSync })
  const isProfitExcluded = useSelector(getIsUnrealizedProfitExcluded)
  const shouldRefreshAfterSync = useSelector(getShouldRefreshAfterSync)
  const shouldFetchAccountBalance = !dataReceived && !pageLoading && !isSyncRequired

  // Single fetch point, so mount, params change and sync refresh can't overlap
  useEffect(() => {
    if (isSyncRequired) return
    const params = { timeFrame, timeRange, isProfitExcluded }
    if (!shouldFetchAccountBalance && !shouldRefreshAfterSync && isEqual(lastFetchParams.current, params)) return
    lastFetchParams.current = params
    dispatch(fetchBalance({ useDefaults: false }))
    if (shouldRefreshAfterSync) dispatch(setShouldRefreshAfterSync(false))
  }, [timeFrame, timeRange, isSyncRequired, isProfitExcluded, shouldRefreshAfterSync, shouldFetchAccountBalance])

  const handleTimeframeChange = useCallback((timeframe) => {
    dispatch(setParams({ timeframe }))
  }, [dispatch, setParams])

  const handleUnrealizedProfitChange = useCallback((isUnrealizedProfitExcluded) => {
    dispatch(setParams({ isUnrealizedProfitExcluded }))
  }, [dispatch, setParams])

  const { chartData, presentCurrencies } = useMemo(
    () => parseChartData({
      shouldShowYear,
      timeframe: currTimeFrame,
      data: orderBy(entries, ['mts']),
    }), [currTimeFrame, entries, shouldShowYear],
  )

  let showContent
  if (isFirstSync) {
    showContent = <InitSyncNote />
  } else if (isLoading) {
    showContent = <Loading />
  } else if (isEmpty(entries)) {
    showContent = <NoData />
  } else {
    showContent = (
      <Chart
        data={chartData}
        dataKeys={presentCurrencies}
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
          {t('accountbalance.title')}
        </SectionHeaderTitle>
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
              value={timeFrame}
              className={paramChangerClass}
              onChange={handleTimeframeChange}
            />
          </SectionHeaderItem>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.unrealized-profits.title')}
            </SectionHeaderItemLabel>
            <UnrealizedProfitSelector
              value={isProfitExcluded}
              className={paramChangerClass}
              onChange={handleUnrealizedProfitChange}
            />
          </SectionHeaderItem>
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default AccountBalance
