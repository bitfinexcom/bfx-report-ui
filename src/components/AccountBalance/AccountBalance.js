import React, { useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Elevation } from '@blueprintjs/core'
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
import RefreshButton from 'ui/RefreshButton'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import parseChartData from 'ui/Charts/Charts.helpers'
import UnrealizedProfitSelector from 'ui/UnrealizedProfitSelector'
import {
  refresh,
  setParams,
  fetchBalance,
} from 'state/accountBalance/actions'
import {
  getEntries,
  getTimeframe,
  getPageLoading,
  getDataReceived,
  getCurrentTimeFrame,
  getIsUnrealizedProfitExcluded,
} from 'state/accountBalance/selectors'
import { getTimeRange } from 'state/timeRange/selectors'
import { getIsSyncRequired, getIsFirstSyncing } from 'state/sync/selectors'

const AccountBalance = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  const timeFrame = useSelector(getTimeframe)
  const timeRange = useSelector(getTimeRange)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isFirstSync = useSelector(getIsFirstSyncing)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const currTimeFrame = useSelector(getCurrentTimeFrame)
  const isLoading = isFirstSync || (!dataReceived && pageLoading)
  const isProfitExcluded = useSelector(getIsUnrealizedProfitExcluded)

  useEffect(() => {
    if (!dataReceived && !pageLoading && !isSyncRequired) {
      dispatch(fetchBalance())
    }
  }, [timeRange, dataReceived, pageLoading, isSyncRequired])

  const handleTimeframeChange = useCallback((timeframe) => {
    dispatch(setParams({ timeframe }))
  }, [dispatch, setParams])

  const handleUnrealizedProfitChange = useCallback((isUnrealizedProfitExcluded) => {
    dispatch(setParams({ isUnrealizedProfitExcluded }))
  }, [dispatch, setParams])

  const onRefresh = useCallback(() => {
    dispatch(refresh())
  }, [dispatch, refresh])

  const { chartData, presentCurrencies } = useMemo(
    () => parseChartData({
      timeframe: currTimeFrame,
      data: _sortBy(entries, ['mts']),
    }), [currTimeFrame, entries],
  )

  let showContent
  if (isLoading) {
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
            <TimeRange className='section-header-time-range' />
          </SectionHeaderItem>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.select')}
            </SectionHeaderItemLabel>
            <TimeFrameSelector
              value={timeFrame}
              onChange={handleTimeframeChange}
            />
          </SectionHeaderItem>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.unrealized-profits.title')}
            </SectionHeaderItemLabel>
            <UnrealizedProfitSelector
              value={isProfitExcluded}
              onChange={handleUnrealizedProfitChange}
            />
          </SectionHeaderItem>
          <RefreshButton onClick={onRefresh} />
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default AccountBalance
