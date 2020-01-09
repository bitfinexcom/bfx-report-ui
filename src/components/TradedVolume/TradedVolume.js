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
import _isEqual from 'lodash/isEqual'

import DateInput from 'ui/DateInput'
import MultiPairSelector from 'ui/MultiPairSelector'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import Chart from 'ui/Charts/Chart'
import parseChartData from 'ui/Charts/Charts.helpers'
import TimeframeSelector from 'ui/TimeframeSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { togglePair } from 'state/utils'
import { isValidTimeStamp } from 'state/query/utils'
import { getMappedSymbolsFromUrl } from 'state/symbols/utils'

import { propTypes, defaultProps } from './TradedVolume.props'

const TYPE = queryConstants.MENU_TRADED_VOLUME

class TradedVolume extends PureComponent {
  constructor(props) {
    super(props)

    const { params: { start, end } } = props
    this.state = {
      start: start && new Date(start),
      end: end && new Date(end),
    }
  }

  componentDidMount() {
    const {
      dataReceived, pageLoading, setTargetPairs, fetchTradedVolume, match,
    } = this.props
    const pairs = (match.params && match.params.pair) || ''
    if (!dataReceived && !pageLoading) {
      if (pairs) {
        setTargetPairs(getMappedSymbolsFromUrl(pairs))
      }
      fetchTradedVolume()
    }
  }

  handleDateChange = (input, time) => {
    const { setParams } = this.props
    const timestamp = time && time.getTime()
    if (isValidTimeStamp(timestamp) || time === null) {
      setParams({ [input]: time ? timestamp : undefined })
    }
  }

  handleQuery = () => {
    const { fetchTradedVolume } = this.props
    fetchTradedVolume()
  }

  handleTimeframeChange = (timeframe) => {
    const { setParams } = this.props
    setParams({ timeframe })
  }

  hasChanges = () => {
    const { currentFetchParams, params } = this.props
    return !_isEqual(currentFetchParams, params)
  }

  render() {
    const {
      entries,
      targetPairs,
      params: { timeframe },
      dataReceived,
      pageLoading,
      refresh,
      t,
    } = this.props
    const { start, end } = this.state
    const hasChanges = this.hasChanges()

    const { chartData, presentCurrencies } = parseChartData({
      data: _sortBy(entries, ['mts']),
      timeframe,
    })

    const renderTimeSelection = (
      <Fragment>
        <Tooltip
          content={(
            <span>
              {t('tradedvolume.query.startDateTooltip')}
            </span>
          )}
          position={Position.TOP}
        >
          <DateInput
            onChange={date => this.handleDateChange('start', date)}
            value={start}
            daysOnly
          />
        </Tooltip>
        {' '}
        <Tooltip
          content={(
            <span>
              {t('tradedvolume.query.endDateTooltip')}
            </span>
          )}
          position={Position.TOP}
        >
          <DateInput
            onChange={date => this.handleDateChange('end', date)}
            value={end}
            daysOnly
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
          intent={hasChanges ? Intent.PRIMARY : null}
          disabled={!hasChanges}
        >
          {t('tradedvolume.query.title')}
        </Button>
      </Fragment>
    )

    const renderPairSelector = (
      <Fragment>
        {' '}
        <MultiPairSelector
          currentFilters={targetPairs}
          togglePair={pair => togglePair(TYPE, this.props, pair)}
        />
      </Fragment>
    )

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = (
        <Loading title='tradedvolume.title' />
      )
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('tradedvolume.title')}
            {' '}
            {renderPairSelector}
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
            {t('tradedvolume.title')}
            {' '}
            {renderPairSelector}
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

TradedVolume.propTypes = propTypes
TradedVolume.defaultProps = defaultProps

export default withTranslation('translations')(TradedVolume)
