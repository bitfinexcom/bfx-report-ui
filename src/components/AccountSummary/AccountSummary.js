import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'

import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import SectionHeader from 'ui/SectionHeader'

import Volume from './AccountSummary.volume'
import Fees from './AccountSummary.fees'
import DerivFees from './AccountSummary.derivFees'
import Leo from './AccountSummary.leo'
import PaidFees from './AccountSummary.paidFees'
import FeeTierVolume from './AccountSummary.feeTierVolume'

class AccountSummary extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      derivMakerRebate: PropTypes.number,
      derivTakerRebate: PropTypes.number,
      derivTakerFee: PropTypes.number,
      derivMakerFee: PropTypes.number,
      fees_funding_30d: PropTypes.shape({
        USD: PropTypes.number,
      }),
      fees_funding_total_30d: PropTypes.number,
      fees_trading_30d: PropTypes.shape({
        USD: PropTypes.number,
      }),
      fees_trading_total_30d: PropTypes.number,
      leoAmountAvg: PropTypes.number,
      leoLev: PropTypes.number,
      makerFee: PropTypes.number,
      takerFeeToCrypto: PropTypes.number,
      takerFeeToFiat: PropTypes.number,
      takerFeeToStable: PropTypes.number,
      trade_vol_30d: PropTypes.arrayOf(PropTypes.object),
    }),
    dataReceived: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: {},
  }

  componentDidMount() {
    const {
      dataReceived, pageLoading, fetchData,
    } = this.props
    if (!dataReceived && !pageLoading) {
      fetchData()
    }
  }

  render() {
    const {
      data,
      dataReceived,
      pageLoading,
      refresh,
    } = this.props

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (_isEmpty(data)) {
      showContent = <NoData refresh={refresh} />
    } else {
      showContent = (
        <div className='section-account-summary-data'>
          <Volume data={_get(data, 'trade_vol_30d', [])} />
          <Fees
            data={data}
            title='accountsummary.fees'
          />
          <DerivFees
            title='accountsummary.fees_deriv'
            makerFee={data.derivMakerFee || data.derivMakerRebate || 0}
            takerFee={data.derivTakerFee || data.derivTakerRebate || 0}
          />
          <br />
          <PaidFees
            data={_get(data, 'fees_funding_30d', {})}
            title='accountsummary.margin_funds'
            total={_get(data, 'fees_funding_total_30d', 0)}
          />
          <PaidFees
            data={_get(data, 'fees_trading_30d', {})}
            title='accountsummary.trading_funds'
            total={_get(data, 'fees_trading_total_30d', 0)}
          />
          <FeeTierVolume data={_get(data, 'trade_vol_30d', {})} />
          <Leo data={data} />
        </div>
      )
    }
    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12 no-table-scroll'>
        <SectionHeader
          filter={false}
          timeframe={false}
          title='accountsummary.title'
        />
        {showContent}
      </Card>
    )
  }
}

export default AccountSummary
