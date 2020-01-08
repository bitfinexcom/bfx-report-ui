import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import queryString from 'query-string'
import { Card, Elevation } from '@blueprintjs/core'

import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getMappedSymbolsFromUrl } from 'state/symbols/utils'
import { checkFetch } from 'state/utils'

import OrderTradesNoData from './OrderTrades.NoData'
import getColumns from '../Trades/Trades.columns'
import { propTypes, defaultProps } from './OrderTrades.props'

const { MENU_ORDER_TRADES } = queryConstants

class OrderTrades extends PureComponent {
  componentDidMount() {
    const {
      dataReceived, pageLoading, setParams, fetchOrdertrades, match, location, params,
    } = this.props
    const { targetPair, id } = params
    const { pair } = match.params
    const { orderId } = queryString.parse(location.search)

    const hasCorrectData = pair && orderId
    const isLoading = !dataReceived && !pageLoading
    const isParamsChanged = targetPair !== pair || id !== +orderId
    if (hasCorrectData && (isLoading || isParamsChanged)) {
      setParams({ targetPair: getMappedSymbolsFromUrl(pair)[0], id: +orderId })
      fetchOrdertrades()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, MENU_ORDER_TRADES)
  }

  render() {
    const {
      entries,
      handleClickExport,
      dataReceived,
      pageLoading,
      refresh,
      getFullTime,
      params: { targetPair, id },
      t,
      timeOffset,
    } = this.props

    if (!targetPair || !id) {
      return <OrderTradesNoData />
    }

    const tableColumns = getColumns({
      filteredData: entries,
      getFullTime,
      t,
      timeOffset,
    })

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = (
        <Loading title='orders.title' />
      )
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('ordertrades.title')}
            {' '}
            <TimeRange />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <br />
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('ordertrades.title')}
            {' '}
            <TimeRange />
            {' '}
            <ExportButton handleClickExport={handleClickExport} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <br />
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
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

OrderTrades.propTypes = propTypes
OrderTrades.defaultProps = defaultProps

export default withTranslation('translations')(OrderTrades)
