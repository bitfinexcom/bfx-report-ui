import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'
import { get, isEmpty } from '@bitfinex/lib-js-util-base'

import SectionHeader from 'ui/SectionHeader'
import Positions from 'components/AppSummary/AppSummary.positions'

import Leo from './AccountSummary.leo'
import Volume from './AccountSummary.volume'
import Assets from './AccountSummary.assets'
import PaidFees from './AccountSummary.paidFees'

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
          <Assets />
          <Volume
            t={t}
            isNoData={isNoData}
            isLoading={isLoading}
            data={get(data, 'trade_vol_30d', [])}
          />
          {!isTurkishSite && (
          <PaidFees
            t={t}
            isNoData={isNoData}
            isLoading={isLoading}
            title='accountsummary.margin_funds'
            data={get(data, 'fees_funding_30d', {})}
            total={get(data, 'fees_funding_total_30d', 0)}
          />
          )}
          <PaidFees
            t={t}
            isNoData={isNoData}
            isLoading={isLoading}
            title='accountsummary.trading_funds'
            data={get(data, 'fees_trading_30d', {})}
            total={get(data, 'fees_trading_total_30d', 0)}
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
