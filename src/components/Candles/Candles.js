import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
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
import TimeRange from 'ui/TimeRange'
import QueryButton from 'ui/QueryButton'
import PairSelector from 'ui/PairSelector'
import Timeframe from 'ui/CandlesTimeframe'
import RefreshButton from 'ui/RefreshButton'
import Candlestick from 'ui/Charts/Candlestick'
import CandlesSyncPref from 'ui/CandlesSyncPref'
import TradesSwitch from 'components/Trades/TradesSwitch'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch } from 'state/utils'

const TYPE = queryConstants.MENU_CANDLES

class Candles extends PureComponent {
  static propTypes = {
    candles: PropTypes.shape({
      entries: PropTypes.arrayOf(PropTypes.object),
      isLoading: PropTypes.bool,
      nextPage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    }),
    currentFetchParams: PropTypes.shape({
      pair: PropTypes.string.isRequired,
      timeframe: PropTypes.string.isRequired,
    }).isRequired,
    fetchData: PropTypes.func.isRequired,
    pairs: PropTypes.arrayOf(PropTypes.string).isRequired,
    params: PropTypes.shape({
      pair: PropTypes.string.isRequired,
      timeframe: PropTypes.string.isRequired,
    }).isRequired,
    refresh: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    trades: PropTypes.shape({
      entries: PropTypes.arrayOf(PropTypes.object),
      isLoading: PropTypes.bool,
      nextPage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    }),
  }

  static defaultProps = {
    trades: {},
    candles: {},
  }

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
      <Card
        elevation={Elevation.ZERO}
        className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader>
          <SectionHeaderTitle>{t('candles.title')}</SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <PairSelector
                pairs={pairs}
                currentPair={pair}
                onPairSelect={this.onPairSelect}
              />
            </SectionHeaderItem>
            <Timeframe
              value={timeframe}
              onChange={this.onTimeframeChange}
            />
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

export default withTranslation('translations')(Candles)
