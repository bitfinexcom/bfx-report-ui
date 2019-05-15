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
import { DateInput, TimePrecision } from '@blueprintjs/datetime'
import _sortBy from 'lodash/sortBy'

import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import LineChart from 'ui/Charts/LineChart'
import parseChartData from 'ui/Charts/Charts.helpers'
import { CURRENCIES } from 'ui/Charts/constants'
import TimeframeSelector from 'ui/TimeframeSelector/TimeframeSelector'
import RefreshButton from 'ui/RefreshButton'
import { isValidTimeStamp } from 'state/query/utils'
import {
  momentFormatter, DEFAULT_DATETIME_FORMAT,
} from 'state/utils'
import { platform } from 'var/config'

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
    const { loading, fetchWinLoss, params } = this.props
    if (loading) {
      fetchWinLoss(params)
    }
  }

  handleDateChange = (input, time) => {
    const timestamp = time && time.getTime()
    if (isValidTimeStamp(timestamp) || time === null) {
      this.setState({ [input]: time || null })
    }
  }

  handleQuery = () => {
    const { fetchWinLoss } = this.props
    const { start, end, timeframe } = this.state
    const params = {
      start: start ? start.getTime() : undefined,
      end: end ? end.getTime() : undefined,
      timeframe,
    }
    fetchWinLoss(params)
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
      loading,
      refresh,
      t,
      timezone,
    } = this.props
    const { start, end, timeframe } = this.state
    const hasNewTime = this.hasNewTime()
    const timePrecision = platform.showSyncMode ? TimePrecision.SECOND : undefined
    const { formatDate, parseDate } = momentFormatter(DEFAULT_DATETIME_FORMAT, timezone)

    const chartData = parseChartData({
      data: _sortBy(entries, ['mts']),
      timeframe: currTimeframe,
    })

    const renderTimeSelection = (
      <Fragment>
        <Tooltip
          content={(
            <span>
              {t('averagewinloss.query.startDateTooltip')}
            </span>
          )}
          position={Position.TOP}
        >
          <DateInput
            formatDate={formatDate}
            parseDate={parseDate}
            onChange={date => this.handleDateChange('start', date)}
            value={start}
            timePrecision={timePrecision}
          />
        </Tooltip>
        {' '}
        <Tooltip
          content={(
            <span>
              {t('averagewinloss.query.endDateTooltip')}
            </span>
          )}
          position={Position.TOP}
        >
          <DateInput
            formatDate={formatDate}
            parseDate={parseDate}
            onChange={date => this.handleDateChange('end', date)}
            value={end}
            timePrecision={timePrecision}
          />
        </Tooltip>
        {' '}
        <TimeframeSelector
          currentTimeframe={timeframe}
          onTimeframeSelect={this.handleTimeframeChange}
        />
        {' '}
        <Button
          onClick={this.handleQuery}
          intent={hasNewTime ? Intent.PRIMARY : null}
          disabled={!hasNewTime}
        >
          {t('averagewinloss.query.title')}
        </Button>
      </Fragment>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='averagewinloss.title' />
      )
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('averagewinloss.title')}
            {' '}
            {renderTimeSelection}
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
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <LineChart
            data={chartData}
            dataKeys={CURRENCIES}
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
