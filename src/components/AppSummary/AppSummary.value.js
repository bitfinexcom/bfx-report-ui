import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _sortBy from 'lodash/sortBy'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import Chart from 'ui/Charts/Chart'
import parseChartData from 'ui/Charts/Charts.helpers'
import queryConstants from 'state/query/constants'
import { checkFetch, checkInit } from 'state/utils'

const TYPE = queryConstants.MENU_ACCOUNT_BALANCE

class AccountSummaryValue extends PureComponent {
  static propTypes = {
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
  }

  static defaultProps = {
    currentFetchParams: {},
    entries: [],
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  render() {
    const {
      currentFetchParams: { timeframe: currTimeframe },
      dataReceived,
      entries,
      pageLoading,
      t,
    } = this.props

    const { chartData, presentCurrencies } = parseChartData({
      data: _sortBy(entries, ['mts']),
      timeframe: currTimeframe,
    })

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
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
      <div className='app-summary-item'>
        <div className='app-summary-item-title'>
          {t('summary.fees.title')}
        </div>
        <div className='app-summary-item-sub-title'>
          {t('summary.fees.sub_title')}
        </div>
        {showContent}
      </div>
    )
  }
}

export default AccountSummaryValue
