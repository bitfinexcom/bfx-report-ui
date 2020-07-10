import React, { PureComponent } from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'

import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import SectionHeader from 'ui/SectionHeader'

import { propTypes, defaultProps } from './AccountSummary.props'
import Volume from './AccountSummary.volume'
import Fees from './AccountSummary.fees'
import MarginFunds from './AccountSummary.marginFunds'
import FeeTierVolume from './AccountSummary.feeTierVolume'

class AccountSummary extends PureComponent {
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
            title='accountsummary.fees'
            makerFee={data.maker_fee || data.maker_rebate || 0}
            takerFee={data.taker_fee || data.taker_rebate || 0}
          />
          <Fees
            title='accountsummary.fees_deriv'
            makerFee={data.deriv_maker_fee || data.deriv_maker_rebate || 0}
            takerFee={data.deriv_taker_fee || data.deriv_taker_rebate || 0}
          />
          <br />
          <MarginFunds data={_get(data, 'fees_funding_30d', {})} />
          <FeeTierVolume data={_get(data, 'trade_vol_30d', {})} />
        </div>
      )
    }
    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
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

AccountSummary.propTypes = propTypes
AccountSummary.defaultProps = defaultProps

export default AccountSummary
