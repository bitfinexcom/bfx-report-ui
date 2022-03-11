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
import MultiPairSelector from 'ui/MultiPairSelector'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import parseChartData from 'ui/Charts/Charts.helpers'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import queryConstants from 'state/query/constants'
import {
  checkInit,
  checkFetch,
  togglePair,
  clearAllPairs,
} from 'state/utils'


const TYPE = queryConstants.MENU_FEES_REPORT

class FeesReport extends PureComponent {
  static propTypes = {
    currentFetchParams: PropTypes.shape({
      timeframe: PropTypes.string,
      targetPairs: PropTypes.arrayOf(PropTypes.string),
    }),
    entries: PropTypes.arrayOf(PropTypes.shape({
      mts: PropTypes.number.isRequired,
    })),
    targetPairs: PropTypes.arrayOf(PropTypes.string),
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    params: PropTypes.shape({
      timeframe: PropTypes.string,
      targetPairs: PropTypes.arrayOf(PropTypes.string),
    }),
    fetchData: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }

  static defaultProps = {
    params: {},
    entries: [],
    targetPairs: [],
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

  hasChanges = () => {
    const { currentFetchParams, params } = this.props
    return !_isEqual(currentFetchParams, params)
  }

  clearPairs = () => clearAllPairs(TYPE, this.props)

  render() {
    const {
      t,
      entries,
      refresh,
      targetPairs,
      pageLoading,
      dataReceived,
      params: { timeframe },
    } = this.props
    const hasChanges = this.hasChanges()

    const { chartData, presentCurrencies } = parseChartData({
      timeframe,
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
          isSumUpEnabled
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
            {t('feesreport.title')}
          </SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <MultiPairSelector
                currentFilters={targetPairs}
                togglePair={pair => togglePair(TYPE, this.props, pair)}
              />
            </SectionHeaderItem>
            <ClearFiltersButton onClick={this.clearPairs} />
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.select')}
              </SectionHeaderItemLabel>
              <TimeFrameSelector
                value={timeframe}
                onChange={this.handleTimeframeChange}
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

export default FeesReport
