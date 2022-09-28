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
import ReportTypeSelector from 'ui/ReportTypeSelector'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import { parseFeesReportChartData } from 'ui/Charts/Charts.helpers'
import queryConstants from 'state/query/constants'
import constants from 'ui/ReportTypeSelector/constants'
import {
  checkInit,
  toggleSymbol,
  clearAllSymbols,
} from 'state/utils'

const TYPE = queryConstants.MENU_FEES_REPORT

const getReportTypeParams = (type) => {
  switch (type) {
    case constants.TRADING_FEES:
      return { isTradingFees: true, isFundingFees: false }
    case constants.FUNDING_FEES:
      return { isTradingFees: false, isFundingFees: true }
    case constants.FUNDING_TRADING_FEES:
      return { isTradingFees: true, isFundingFees: true }
    default:
      return { isTradingFees: true, isFundingFees: false }
  }
}

class FeesReport extends PureComponent {
  static propTypes = {
    currentFetchParams: PropTypes.shape({
      timeframe: PropTypes.string,
      targetPairs: PropTypes.arrayOf(PropTypes.string),
    }),
    dataReceived: PropTypes.bool.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      mts: PropTypes.number.isRequired,
    })),
    fetchData: PropTypes.func.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      timeframe: PropTypes.string,
      targetPairs: PropTypes.arrayOf(PropTypes.string),
    }),
    refresh: PropTypes.func.isRequired,
    reportType: PropTypes.string.isRequired,
    setParams: PropTypes.func.isRequired,
    setReportType: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetSymbols: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    params: {},
    entries: [],
    targetSymbols: [],
    currentFetchParams: {},
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
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

  toggleSymbol = symbol => toggleSymbol(TYPE, this.props, symbol)

  clearSymbols = () => clearAllSymbols(TYPE, this.props)

  handleReportTypeChange = (type) => {
    const { setParams, setReportType } = this.props
    const params = getReportTypeParams(type)
    setReportType(type)
    setParams(params)
  }

  render() {
    const {
      t,
      entries,
      refresh,
      reportType,
      pageLoading,
      dataReceived,
      targetSymbols,
      params: { timeframe },
    } = this.props
    const { chartData, dataKeys } = parseFeesReportChartData({
      data: _sortBy(entries, ['mts']),
      timeframe,
      t,
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
            {t('feesreport.title')}
          </SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <MultiSymbolSelector
                currentFilters={targetSymbols}
                toggleSymbol={this.toggleSymbol}
              />
            </SectionHeaderItem>
            <ClearFiltersButton onClick={this.clearSymbols} />
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
                {t('selector.report-type.title')}
              </SectionHeaderItemLabel>
              <ReportTypeSelector
                section={TYPE}
                value={reportType}
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

export default FeesReport
