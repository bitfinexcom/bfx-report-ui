import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'
import _sortBy from 'lodash/sortBy'

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
import QueryButton from 'ui/QueryButton'
import RefreshButton from 'ui/RefreshButton'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import parseChartData from 'ui/Charts/Charts.helpers'
import UnrealizedProfitSelector from 'ui/UnrealizedProfitSelector'
import queryConstants from 'state/query/constants'
import { checkFetch, checkInit } from 'state/utils'

const TYPE = queryConstants.MENU_ACCOUNT_BALANCE

class AccountBalance extends PureComponent {
  static propTypes = {
    currentFetchParams: PropTypes.shape({
      timeframe: PropTypes.string,
      isUnrealizedProfitExcluded: PropTypes.bool,
    }),
    dataReceived: PropTypes.bool.isRequired,
    isUnrealizedProfitExcluded: PropTypes.bool.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      mts: PropTypes.number,
      USD: PropTypes.number,
    })),
    fetchData: PropTypes.func.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    timeframe: PropTypes.string.isRequired,
    refresh: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    entries: [],
    currentFetchParams: {},
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  handleQuery = () => {
    const { fetchData } = this.props
    fetchData()
  }

  handleTimeframeChange = (timeframe) => {
    const { setParams } = this.props
    setParams({ timeframe })
  }

  handleUnrealizedProfitChange = (isUnrealizedProfitExcluded) => {
    const { setParams } = this.props
    setParams({ isUnrealizedProfitExcluded })
  }

  hasChanges = () => {
    const {
      timeframe,
      isUnrealizedProfitExcluded,
      currentFetchParams: {
        timeframe: currTimeframe,
        isUnrealizedProfitExcluded: currUnrealizedProfitState,
      },
    } = this.props
    return currTimeframe !== timeframe
      || currUnrealizedProfitState !== isUnrealizedProfitExcluded
  }

  render() {
    const {
      t,
      refresh,
      entries,
      timeframe,
      pageLoading,
      dataReceived,
      isUnrealizedProfitExcluded,
      currentFetchParams: { timeframe: currTimeframe },
    } = this.props
    const hasChanges = this.hasChanges()

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
      <Card
        elevation={Elevation.ZERO}
        className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader>
          <SectionHeaderTitle>
            {t('accountbalance.title')}
          </SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.select')}
              </SectionHeaderItemLabel>
              <TimeFrameSelector
                value={timeframe}
                onChange={this.handleTimeframeChange}
              />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.unrealized-profits.title')}
              </SectionHeaderItemLabel>
              <UnrealizedProfitSelector
                value={isUnrealizedProfitExcluded}
                onChange={this.handleUnrealizedProfitChange}
              />
            </SectionHeaderItem>
            <QueryButton
              disabled={!hasChanges}
              onClick={this.handleQuery}
            />
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default AccountBalance
