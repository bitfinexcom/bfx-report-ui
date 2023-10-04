import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import _sortBy from 'lodash/sortBy'
import _isEmpty from 'lodash/isEmpty'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import Chart from 'ui/Charts/Chart'
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

const AccountSummaryValue = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  const timeRange = useSelector(getTimeRange)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const currTimeFrame = useSelector(getCurrentTimeFrame)

  useEffect(() => {
    if (!dataReceived && !pageLoading) dispatch(fetchBalance())
  }, [timeRange])

  const { chartData, presentCurrencies } = useMemo(
    () => parseChartData({
      timeframe: currTimeFrame,
      data: _sortBy(entries, ['mts']),
    }), [currTimeFrame, entries],
  )

  const formattedPercValue = getFormattedPercentChange(chartData)

  const chartLastValue = useMemo(
    () => getFormattedChartLastValue(chartData),
    [chartData],
  )

  let showContent
  if (!dataReceived && pageLoading) {
    showContent = <Loading />
  } else if (_isEmpty(entries)) {
    showContent = <NoData />
  } else {
    showContent = (
      <div className='chart-wrapper'>
        <div className=''>
          {formattedPercValue}
        </div>
        <div className='chart-value'>
          $
          {chartLastValue}
        </div>
        <Chart
          aspect={2}
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
