import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import _sortBy from 'lodash/sortBy'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import Chart from 'ui/Charts/Chart'
import parseChartData from 'ui/Charts/Charts.helpers'
import { getTimeRange } from 'state/timeRange/selectors'
// import queryConstants from 'state/query/constants'
// import { checkFetch, checkInit } from 'state/utils'

// const TYPE = queryConstants.MENU_ACCOUNT_BALANCE

const AccountSummaryValue = ({
  entries,
  pageLoading,
  dataReceived,
  timeframe,
  fetchData,
  currentFetchParams,
  currentFetchParams: { timeframe: currTimeframe },
  t,
}) => {
  const timeRange = useSelector(getTimeRange)

  useEffect(() => {
    if (!dataReceived && !pageLoading) fetchData()
  }, [timeRange])


  console.log('+++timeRange', timeRange)
  console.log('+++timeframe', timeframe)
  console.log('+++currentFetchParams', currentFetchParams)


  const { chartData, presentCurrencies } = parseChartData({
    timeframe: currTimeframe,
    data: _sortBy(entries, ['mts']),
  })

  let showContent
  if (!dataReceived && pageLoading) {
    showContent = <Loading />
  } else if (!entries.length) {
    showContent = <NoData />
  } else {
    showContent = (
      <Chart
        aspect={2}
        data={chartData}
        showLegend={false}
        dataKeys={presentCurrencies}
      />
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


AccountSummaryValue.propTypes = {
  currentFetchParams: PropTypes.shape({
    timeframe: PropTypes.string,
    isUnrealizedProfitExcluded: PropTypes.bool,
  }),
  dataReceived: PropTypes.bool.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({
    mts: PropTypes.number,
    USD: PropTypes.number,
  })),
  pageLoading: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  timeframe: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
}

AccountSummaryValue.defaultProps = {
  entries: [],
  currentFetchParams: {},
}

export default AccountSummaryValue
