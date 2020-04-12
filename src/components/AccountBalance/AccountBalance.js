import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Card,
  Elevation,
  Intent,
} from '@blueprintjs/core'
import _isEqual from 'lodash/isEqual'
import _sortBy from 'lodash/sortBy'

import {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import DateInput from 'ui/DateInput'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import Chart from 'ui/Charts/Chart'
import parseChartData from 'ui/Charts/Charts.helpers'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { isValidTimeStamp } from 'state/query/utils'
import { checkInit } from 'state/utils'

import { propTypes, defaultProps } from './AccountBalance.props'

const TYPE = queryConstants.MENU_ACCOUNT_BALANCE

class AccountBalance extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  handleDateChange = (input, time) => {
    const { setParams } = this.props
    const timestamp = time && time.getTime()
    if (isValidTimeStamp(timestamp) || time === null) {
      setParams({ [input]: time ? timestamp : null })
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
      currentFetchParams: { timeframe: currTimeframe },
      entries,
      params,
      dataReceived,
      pageLoading,
      refresh,
      t,
    } = this.props
    const { start, end, timeframe } = params
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
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('accountbalance.title')}</SectionHeaderTitle>
          <SectionHeaderRow>
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

AccountBalance.propTypes = propTypes
AccountBalance.defaultProps = defaultProps

export default withTranslation('translations')(AccountBalance)
