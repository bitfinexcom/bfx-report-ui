import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'

import Loading from 'ui/Loading'
import LinkButton from 'ui/LinkButton'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import { getFormattedDate } from 'utils/dates'

import { propTypes, defaultProps } from './AccountSummary.props'
import Volume from './AccountSummary.volume'
import Fees from './AccountSummary.fees'
import MarginFunds from './AccountSummary.marginFunds'

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
      t,
    } = this.props

    const updateTitle = `${t('updated')} ${getFormattedDate(data.time)} `

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = (
        <Loading title='accountsummary.title' />
      )
    } else if (_isEmpty(data)) {
      showContent = (
        <Fragment>
          <h4>
            {t('accountsummary.title')}
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
            {t('accountsummary.title')}
          </h4>
          <h3 className='bitfinex-show-soft'>
            {updateTitle}
            <LinkButton onClick={refresh}>
              {t('update')}
            </LinkButton>
          </h3>
          <Volume data={_get(data, 'trade_vol_30d', [])} />
          <br />
          <Fees
            title='accountsummary.fees'
            makerFee={data.maker_fee || data.maker_rebate}
            takerFee={data.taker_fee || data.taker_rebate}
          />
          <Fees
            title='accountsummary.fees_deriv'
            makerFee={data.deriv_maker_fee || data.deriv_maker_rebate}
            takerFee={data.deriv_taker_fee || data.deriv_taker_rebate}
          />
          <br />
          <MarginFunds data={_get(data, 'trade_vol_30d', [])} />
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

AccountSummary.propTypes = propTypes
AccountSummary.defaultProps = defaultProps

export default withTranslation('translations')(AccountSummary)
