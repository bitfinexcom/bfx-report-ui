import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import _sortBy from 'lodash/sortBy'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import NoData from 'ui/NoData'
import Chart from 'ui/Charts/Chart'
import LoadingPlaceholder from 'ui/LoadingPlaceholder'
import {
  parseChartData,
  getFormattedChartLastValue,
  getFormattedPercentChange,
} from 'ui/Charts/Charts.helpers'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
  getCurrentTimeFrame,
} from 'state/accountBalance/selectors'
import { getTimeRange } from 'state/timeRange/selectors'
import { fetchBalance } from 'state/accountBalance/actions'
import {
  getIsSyncRequired,
  getIsFirstSyncing,
  getShouldRefreshAfterSync,
} from 'state/sync/selectors'
import { setShouldRefreshAfterSync } from 'state/sync/actions'

const AccountSummaryValue = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  const timeRange = useSelector(getTimeRange)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isFirstSync = useSelector(getIsFirstSyncing)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const currTimeFrame = useSelector(getCurrentTimeFrame)
  const isLoading = isFirstSync || (!dataReceived && pageLoading)
  const shouldRefreshAfterSync = useSelector(getShouldRefreshAfterSync)

  useEffect(() => {
    if (!dataReceived && !pageLoading && !isSyncRequired) {
      dispatch(fetchBalance())
    }
    if (shouldRefreshAfterSync) {
      dispatch(fetchBalance())
      dispatch(setShouldRefreshAfterSync(false))
    }
  }, [timeRange, dataReceived, pageLoading, isSyncRequired, shouldRefreshAfterSync])

  const { chartData, presentCurrencies } = useMemo(
    () => parseChartData({
      timeframe: currTimeFrame,
      data: _sortBy(entries, ['mts']),
    }), [currTimeFrame, entries],
  )

  const chartLastValue = useMemo(
    () => getFormattedChartLastValue(chartData),
    [chartData],
  )

  const formattedPercValue = useMemo(
    () => getFormattedPercentChange(chartData),
    [chartData],
  )

  let showContent
  if (dataReceived && isEmpty(entries)) {
    showContent = <NoData title='summary.no_data' />
  } else {
    showContent = (
      <div className='chart-wrapper'>
        {isLoading ? (
          <LoadingPlaceholder
            isStrong
            height={22}
            baseWidth={72}
          />
        ) : (
          <div className='chart-value'>
            $
            {chartLastValue}
          </div>
        )}
        {isLoading ? (
          <LoadingPlaceholder
            height={22}
            baseWidth={36}
          />
        ) : (
          <div className='chart-value-perc'>
            { formattedPercValue }
          </div>
        )}
        <Chart
          height={375}
          data={chartData}
          showLegend={false}
          dataKeys={presentCurrencies}
        />
      </div>
    )
  }

  return (
    <div className='app-summary-item chart-item'>
      <div className='app-summary-item-title'>
        {t('summary.value.title')}
      </div>
      <div className='app-summary-item-sub-title'>
        {t('summary.value.sub_title')}
      </div>
      {showContent}
    </div>
  )
}

export default AccountSummaryValue
