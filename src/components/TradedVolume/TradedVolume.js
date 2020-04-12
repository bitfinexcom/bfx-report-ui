import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Card,
  Elevation,
  Intent,
} from '@blueprintjs/core'
import _sortBy from 'lodash/sortBy'
import _isEqual from 'lodash/isEqual'

import {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import DateInput from 'ui/DateInput'
import MultiPairSelector from 'ui/MultiPairSelector'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import Chart from 'ui/Charts/Chart'
import parseChartData from 'ui/Charts/Charts.helpers'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { checkInit, togglePair } from 'state/utils'
import { isValidTimeStamp } from 'state/query/utils'

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
    checkInit(this.props, TYPE)
  }

  handleDateChange = (input, time) => {
    const { setParams } = this.props
    const timestamp = time && time.getTime()
    if (isValidTimeStamp(timestamp) || time === null) {
      setParams({ [input]: time ? timestamp : undefined })
    }
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
          <SectionHeaderTitle>{t('tradedvolume.title')}</SectionHeaderTitle>
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
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('query.startTime')}
              </SectionHeaderItemLabel>
              <DateInput
                onChange={date => this.handleDateChange('start', date)}
                defaultValue={start}
                daysOnly
              />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('query.endTime')}
              </SectionHeaderItemLabel>
              <DateInput
                onChange={date => this.handleDateChange('end', date)}
                defaultValue={end}
                daysOnly
              />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.select')}
              </SectionHeaderItemLabel>
              <TimeFrameSelector
                value={timeframe}
                onChange={this.handleTimeframeChange}
              />
            </SectionHeaderItem>

            <Button
              className='button--large'
              onClick={this.handleQuery}
              intent={Intent.PRIMARY}
              disabled={!hasChanges}
            >
              {t('query.title')}
            </Button>
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

TradedVolume.propTypes = propTypes
TradedVolume.defaultProps = defaultProps

export default withTranslation('translations')(TradedVolume)
