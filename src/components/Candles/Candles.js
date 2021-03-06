import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
import _isEqual from 'lodash/isEqual'

import {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import TradesSwitch from 'components/Trades/TradesSwitch'
import PairSelector from 'ui/PairSelector'
import Timeframe from 'ui/CandlesTimeframe'
import QueryButton from 'ui/QueryButton'
import RefreshButton from 'ui/RefreshButton'
import Candlestick from 'ui/Charts/Candlestick'
import CandlesSyncPref from 'ui/CandlesSyncPref'
import TimeRange from 'ui/TimeRange'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch } from 'state/utils'

import { propTypes, defaultProps } from './Candles.props'

const TYPE = queryConstants.MENU_CANDLES

class Candles extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  hasChanges = () => {
    const { currentFetchParams, params } = this.props
    return !_isEqual(currentFetchParams, params)
  }

  handleQuery = () => {
    const { refresh, fetchData } = this.props
    refresh()
    fetchData()
  }

  onPairSelect = (pair) => {
    const { setParams } = this.props
    setParams({ pair })
  }

  onTimeframeChange = (timeframe) => {
    const { setParams } = this.props
    setParams({ timeframe })
  }

  render() {
    const {
      candles,
      fetchData,
      pairs,
      params,
      refresh,
      t,
      trades,
    } = this.props
    const { pair, timeframe } = params
    const hasChanges = this.hasChanges()

    let showContent
    if (!candles.entries.length && candles.isLoading) {
      showContent = <Loading />
    } else if (!candles.entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <Candlestick
          candles={candles}
          trades={trades}
          fetchData={fetchData}
        />
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('candles.title')}</SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <PairSelector
                currentPair={pair}
                onPairSelect={this.onPairSelect}
                pairs={pairs}
              />
            </SectionHeaderItem>
            <Timeframe value={timeframe} onChange={this.onTimeframeChange} />
            <QueryButton
              disabled={!hasChanges}
              onClick={this.handleQuery}
            />
            <RefreshButton onClick={refresh} />
            <CandlesSyncPref />
          </SectionHeaderRow>
        </SectionHeader>
        <TradesSwitch target={TYPE} />
        {showContent}
      </Card>
    )
  }
}

Candles.propTypes = propTypes
Candles.defaultProps = defaultProps

export default withTranslation('translations')(Candles)
