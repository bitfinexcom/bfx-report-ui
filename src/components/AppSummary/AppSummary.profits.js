import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import _sortBy from 'lodash/sortBy'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import NoData from 'ui/NoData'
import Chart from 'ui/Charts/Chart'
import { parseChartData } from 'ui/Charts/Charts.helpers'
import timeframeConstants from 'ui/TimeFrameSelector/constants'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
} from 'state/profits/selectors'
import { fetchProfits } from 'state/profits/actions'
import { getTimeRange } from 'state/timeRange/selectors'
import { setShouldRefreshAfterSync } from 'state/sync/actions'
import { getIsSyncRequired, getShouldRefreshAfterSync } from 'state/sync/selectors'

const AccountSummaryProfits = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  const timeRange = useSelector(getTimeRange)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const shouldRefreshAfterSync = useSelector(getShouldRefreshAfterSync)

  useEffect(() => {
    if (!dataReceived && !pageLoading && !isSyncRequired) {
      dispatch(fetchProfits())
    }
    if (shouldRefreshAfterSync && !isSyncRequired) {
      dispatch(fetchProfits())
      dispatch(setShouldRefreshAfterSync(false))
    }
  }, [timeRange, dataReceived, pageLoading, isSyncRequired, shouldRefreshAfterSync])

  const { chartData, presentCurrencies } = useMemo(
    () => parseChartData({
      data: _sortBy(entries, ['mts']),
      timeframe: timeframeConstants.DAY,
    }), [entries],
  )

  let showContent
  if (dataReceived && isEmpty(entries)) {
    showContent = <NoData title='summary.no_data' />
  } else {
    showContent = (
      <div className='chart-wrapper'>
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
        {t('summary.profits.title')}
      </div>
      <div className='app-summary-item-sub-title'>
        {t('summary.profits.sub_title')}
      </div>
      {showContent}
    </div>
  )
}

export default AccountSummaryProfits
