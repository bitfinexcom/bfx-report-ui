import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'
import _map from 'lodash/map'
import _sumBy from 'lodash/sumBy'
import _groupBy from 'lodash/groupBy'

import { get, isEmpty } from '@bitfinex/lib-js-util-base'

import SectionHeader from 'ui/SectionHeader'
import Positions from 'components/AppSummary/AppSummary.positions'

import Leo from './AccountSummary.leo'
import Fees from './AccountSummary.fees'
import Volume from './AccountSummary.volume'
import PaidFees from './AccountSummary.paidFees'
import DerivFees from './AccountSummary.derivFees'
import FeeTierVolume from './AccountSummary.feeTierVolume'

const walletsMock = [
  {
    type: 'contribution',
    currency: 'UST',
    balance: 500,
    unsettledInterest: 0,
    balanceAvailable: 500,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'creditline',
    currency: 'UST',
    balance: 500,
    unsettledInterest: 0,
    balanceAvailable: 500,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'funding',
    currency: 'ETH',
    balance: 75.19748273,
    unsettledInterest: 0,
    balanceAvailable: 9.4150902,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'funding',
    currency: 'IOT',
    balance: 101.65617908,
    unsettledInterest: 0,
    balanceAvailable: 101.65617908,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'funding',
    currency: 'JPY',
    balance: 23468.18510406,
    unsettledInterest: 0,
    balanceAvailable: 23468.18510406,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'funding',
    currency: 'USD',
    balance: 543.59104978,
    unsettledInterest: 0,
    balanceAvailable: 0.85983473,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'funding',
    currency: 'UST',
    balance: 200.72123561,
    unsettledInterest: 0,
    balanceAvailable: 200.72123561,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'BTC',
    balance: 1.0745711,
    unsettledInterest: 0,
    balanceAvailable: 1.0745711,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'ETH',
    balance: 41.27958958,
    unsettledInterest: 0,
    balanceAvailable: 41.27958958,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'EUR',
    balance: 550.27976385,
    unsettledInterest: 0,
    balanceAvailable: 550.27976385,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'IOT',
    balance: 301.22971424,
    unsettledInterest: 0,
    balanceAvailable: 301.22971424,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'JPY',
    balance: 46691.61216429,
    unsettledInterest: 0,
    balanceAvailable: 46691.61216429,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'USD',
    balance: 21836.75178168,
    unsettledInterest: 0,
    balanceAvailable: 21836.75178168,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'exchange',
    currency: 'UST',
    balance: 1336.81517648,
    unsettledInterest: 0,
    balanceAvailable: 1336.81517648,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'margin',
    currency: 'USD',
    balance: 320.00399401,
    unsettledInterest: 0,
    balanceAvailable: 320.00399401,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    type: 'margin',
    currency: 'USTF0',
    balance: 150,
    unsettledInterest: 0,
    balanceAvailable: 150,
    description: null,
    meta: null,
    _isDataFromApiV2: true,
  },
]

const prepareAssetsData = (data) => {
  const groupedBalances = _groupBy(data, 'currency')
  return _map(groupedBalances, (group, key) => ({ currency: key, balance: _sumBy(group, 'balance') }))
}

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
      trade_vol_30d: PropTypes.arrayOf(PropTypes.shape({
        curr: PropTypes.string,
      })),
    }),
    dataReceived: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    isTurkishSite: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
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
      t,
      data,
      pageLoading,
      dataReceived,
      isTurkishSite,
    } = this.props
    const isNoData = isEmpty(data)
    const isLoading = !dataReceived && pageLoading

    return (
      <Card
        elevation={Elevation.ZERO}
        className='col-lg-12 col-md-12 col-sm-12 col-xs-12 no-table-scroll'
      >
        <SectionHeader
          filter={false}
          timeframe={false}
          title='accountsummary.title'
        />
        <div className='section-account-summary-data'>
          <Positions />
          <Volume
            t={t}
            isNoData={isNoData}
            isLoading={isLoading}
            data={get(data, 'trade_vol_30d', [])}
          />
          <Fees
            t={t}
            data={data}
            isNoData={isNoData}
            isLoading={isLoading}
            title='accountsummary.fees'
          />
          {!isTurkishSite && (
            <>
              <DerivFees
                t={t}
                isNoData={isNoData}
                isLoading={isLoading}
                title='accountsummary.fees_deriv'
                makerFee={data.derivMakerFee || data.derivMakerRebate || 0}
                takerFee={data.derivTakerFee || data.derivTakerRebate || 0}
              />
              <PaidFees
                t={t}
                isNoData={isNoData}
                isLoading={isLoading}
                title='accountsummary.margin_funds'
                data={get(data, 'fees_funding_30d', {})}
                total={get(data, 'fees_funding_total_30d', 0)}
              />
            </>
          )}
          <PaidFees
            t={t}
            isNoData={isNoData}
            isLoading={isLoading}
            title='accountsummary.trading_funds'
            data={get(data, 'fees_trading_30d', {})}
            total={get(data, 'fees_trading_total_30d', 0)}
          />
          <FeeTierVolume
            t={t}
            isNoData={isNoData}
            isLoading={isLoading}
            data={get(data, 'trade_vol_30d', [])}
          />
          <Leo
            t={t}
            data={data}
            isNoData={isNoData}
            isLoading={isLoading}
          />
        </div>
      </Card>
    )
  }
}

export default AccountSummary
