import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'
import _sortBy from 'lodash/sortBy'
import _isEqual from 'lodash/isEqual'

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
import {
  parseChartData,
  parseVSAccBalanceChartData,
} from 'ui/Charts/Charts.helpers'
import ReportTypeSelector from 'ui/ReportTypeSelector'
import UnrealizedProfitSelector from 'ui/UnrealizedProfitSelector'
import queryConstants from 'state/query/constants'
import { checkFetch, checkInit } from 'state/utils'

const TYPE = queryConstants.MENU_WIN_LOSS

const prepareChartData = (
  entries, timeframe, isVSAccBalanceData, t,
) => {
  if (isVSAccBalanceData) {
    const { chartData, dataKeys } = parseVSAccBalanceChartData({
      data: _sortBy(entries, ['mts']),
      timeframe,
      t,
    })
    return { chartData, dataKeys }
  }

  const { chartData, presentCurrencies } = parseChartData({
    data: _sortBy(entries, ['mts']),
    timeframe,
  })
  return { chartData, dataKeys: presentCurrencies }
}

class AverageWinLoss extends PureComponent {
  static propTypes = {
    currentFetchParams: PropTypes.shape({
      timeframe: PropTypes.string.isRequired,
      isUnrealizedProfitExcluded: PropTypes.bool.isRequired,
      isVsAccountBalanceSelected: PropTypes.bool.isRequired,
    }).isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      mts: PropTypes.number.isRequired,
      USD: PropTypes.number.isRequired,
    })).isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    params: PropTypes.shape({
      timeframe: PropTypes.string.isRequired,
      isUnrealizedProfitExcluded: PropTypes.bool.isRequired,
      isVsAccountBalanceSelected: PropTypes.bool.isRequired,
    }).isRequired,
    fetchData: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
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

  handleReportTypeChange = (isVsAccountBalanceSelected) => {
    const { setParams } = this.props
    setParams({ isVsAccountBalanceSelected })
  }

  hasChanges = () => {
    const { currentFetchParams, params } = this.props
    return !_isEqual(currentFetchParams, params)
  }

  render() {
    const {
      t,
      entries,
      refresh,
      pageLoading,
      dataReceived,
      currentFetchParams: {
        timeframe: currTimeframe,
      },
      params: {
        timeframe,
        isUnrealizedProfitExcluded,
        isVsAccountBalanceSelected,
      },
    } = this.props

    const { chartData, dataKeys } = prepareChartData(
      entries, currTimeframe, isVsAccountBalanceSelected, t,
    )

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
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
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.report-type.title')}
              </SectionHeaderItemLabel>
              <ReportTypeSelector
                value={isVsAccountBalanceSelected}
                onChange={this.handleReportTypeChange}
              />
            </SectionHeaderItem>
            <QueryButton
              onClick={this.handleQuery}
              disabled={!this.hasChanges()}
            />
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default AverageWinLoss
