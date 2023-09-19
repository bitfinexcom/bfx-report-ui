import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { Card, Elevation } from '@blueprintjs/core'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import { SectionHeader, SectionHeaderTitle } from 'ui/SectionHeader'

import Leo from './AppSummary.leo'
import Fees from './AppSummary.fees'
import DerivFees from './AppSummary.derivFees'

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
    refresh: PropTypes.func.isRequired,
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
      refresh,
      pageLoading,
      dataReceived,
      isTurkishSite,
    } = this.props

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (_isEmpty(data)) {
      showContent = <NoData refresh={refresh} />
    } else {
      showContent = (
        <div className='section-account-summary-data'>
          <Fees
            t={t}
            data={data}
            title='accountsummary.fees'
          />
          {!isTurkishSite && (
            <>
              <DerivFees
                t={t}
                title='accountsummary.fees_deriv'
                makerFee={data.derivMakerFee || data.derivMakerRebate || 0}
                takerFee={data.derivTakerFee || data.derivTakerRebate || 0}
              />
            </>
          )}
        </div>
      )
    }
    return (
      <Card
        elevation={Elevation.ZERO}
        className='app-summary-card col-lg-12 col-md-12 col-sm-12 col-xs-12 no-table-scroll'
      >
        <div className='app-summary-wrapper'>
          <SectionHeader>
            <SectionHeaderTitle>
              <div className='app-summary-title-row'>
                <div className='app-summary-title-item'>
                  {t('summary.title')}
                </div>
                <div className='app-summary-title-item'>
                  <Leo data={data} />
                </div>
              </div>
            </SectionHeaderTitle>
          </SectionHeader>
          {showContent}
        </div>
      </Card>

    )
  }
}

export default AccountSummary
