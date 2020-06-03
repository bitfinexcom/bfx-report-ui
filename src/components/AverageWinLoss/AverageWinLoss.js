import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
import _sortBy from 'lodash/sortBy'

import {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import Chart from 'ui/Charts/Chart'
import parseChartData from 'ui/Charts/Charts.helpers'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import QueryButton from 'ui/QueryButton'
import RefreshButton from 'ui/RefreshButton'
import TimeRange from 'ui/TimeRange'

import { propTypes, defaultProps } from './AverageWinLoss.props'

class AverageWinLoss extends PureComponent {
  constructor(props) {
    super(props)

    const { params: { timeframe } } = props
    this.state = {
      timeframe,
    }
  }

  componentDidMount() {
    const {
      dataReceived, pageLoading, fetchData, params,
    } = this.props
    if (!dataReceived && !pageLoading) {
      fetchData(params)
    }
  }

  handleQuery = () => {
    const { fetchData } = this.props
    const { timeframe } = this.state
    const params = {
      timeframe,
    }
    fetchData(params)
  }

  handleTimeframeChange = (timeframe) => {
    this.setState({ timeframe })
  }

  hasChanges = () => {
    const { params: { timeframe: currTimeframe } } = this.props
    const { timeframe } = this.state
    return timeframe !== currTimeframe
  }

  render() {
    const {
      entries,
      params: { timeframe: currTimeframe },
      dataReceived,
      pageLoading,
      refresh,
      t,
    } = this.props
    const { timeframe } = this.state

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
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('averagewinloss.title')}</SectionHeaderTitle>
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

            <QueryButton
              disabled={!this.hasChanges()}
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

AverageWinLoss.propTypes = propTypes
AverageWinLoss.defaultProps = defaultProps

export default withTranslation('translations')(AverageWinLoss)
