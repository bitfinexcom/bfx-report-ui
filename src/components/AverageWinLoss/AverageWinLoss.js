import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Card,
  Elevation,
  Intent,
  Position,
  Tooltip,
} from '@blueprintjs/core'
import _sortBy from 'lodash/sortBy'

import DateInput from 'ui/DateInput'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import Chart from 'ui/Charts/Chart'
import ExportButton from 'ui/ExportButton'
import parseChartData from 'ui/Charts/Charts.helpers'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import RefreshButton from 'ui/RefreshButton'
import { isValidTimeStamp } from 'state/query/utils'

import { propTypes, defaultProps } from './AverageWinLoss.props'

class AverageWinLoss extends PureComponent {
  constructor(props) {
    super(props)

    const { params: { start, end, timeframe } } = props
    this.state = {
      start: start && new Date(start),
      end: end && new Date(end),
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

  handleDateChange = (input, time) => {
    const timestamp = time && time.getTime()
    if (isValidTimeStamp(timestamp) || time === null) {
      this.setState({ [input]: time || null })
    }
  }

  handleQuery = () => {
    const { fetchData } = this.props
    const { start, end, timeframe } = this.state
    const params = {
      start: start ? start.getTime() : undefined,
      end: end ? end.getTime() : undefined,
      timeframe,
    }
    fetchData(params)
  }

  handleTimeframeChange = (timeframe) => {
    this.setState({ timeframe })
  }

  hasNewTime = () => {
    const { params } = this.props
    const { start: currStart, end: currEnd, timeframe: currTimeframe } = params
    const { start, end, timeframe } = this.state
    const isDiffStart = start ? start.getTime() !== currStart : !!start !== !!currStart
    const isDiffEnd = end ? end.getTime() !== currEnd : !!end !== !!currEnd
    const isDiffTimeframe = timeframe !== currTimeframe
    return isDiffStart || isDiffEnd || isDiffTimeframe
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
    const { start, end, timeframe } = this.state
    const hasNewTime = this.hasNewTime()

    const { chartData, presentCurrencies } = parseChartData({
      data: _sortBy(entries, ['mts']),
      timeframe: currTimeframe,
    })

    const renderTimeSelection = (
      <Fragment>
        <Tooltip
          content={(
            <span>
              {t('query.startDateTooltip')}
            </span>
          )}
          position={Position.TOP}
        >
          <DateInput
            onChange={date => this.handleDateChange('start', date)}
            defaultValue={start}
            daysOnly
          />
        </Tooltip>
        {' '}
        <Tooltip
          content={(
            <span>
              {t('query.endDateTooltip')}
            </span>
          )}
          position={Position.TOP}
        >
          <DateInput
            onChange={date => this.handleDateChange('end', date)}
            defaultValue={end}
            daysOnly
          />
        </Tooltip>
        {' '}
        <TimeFrameSelector
          value={timeframe}
          onChange={this.handleTimeframeChange}
        />
        {' '}
        <Button
          onClick={this.handleQuery}
          intent={hasNewTime ? Intent.PRIMARY : null}
          disabled={!hasNewTime}
        >
          {t('query.title')}
        </Button>
      </Fragment>
    )

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('averagewinloss.title')}
            {' '}
            {renderTimeSelection}
            {' '}
            <ExportButton />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('averagewinloss.title')}
            {' '}
            {renderTimeSelection}
            {' '}
            <ExportButton />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <Chart
            data={chartData}
            dataKeys={presentCurrencies}
          />
        </Fragment>
      )
    }
    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        {showContent}
      </Card>
    )
  }
}

AverageWinLoss.propTypes = propTypes
AverageWinLoss.defaultProps = defaultProps

export default withTranslation('translations')(AverageWinLoss)
