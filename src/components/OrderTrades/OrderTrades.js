import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import queryString from 'query-string'
import { Card, Elevation } from '@blueprintjs/core'

import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import { SectionHeader, SectionHeaderTitle } from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import { getMappedSymbolsFromUrl } from 'state/symbols/utils'
import { checkFetch } from 'state/utils'

import OrderTradesNoData from './OrderTrades.NoData'
import getColumns from '../Trades/Trades.columns'

const { MENU_ORDER_TRADES } = queryConstants

class OrderTrades extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ pair: PropTypes.string }),
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    setParams: PropTypes.func.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      execAmount: PropTypes.number.isRequired,
      execPrice: PropTypes.number.isRequired,
      fee: PropTypes.number,
      feeCurrency: PropTypes.string,
      mtsCreate: PropTypes.number.isRequired,
      orderID: PropTypes.number.isRequired,
    })).isRequired,
    fetchData: PropTypes.func.isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      targetPair: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
    t: PropTypes.func.isRequired,
    getFullTime: PropTypes.func.isRequired,
    timeOffset: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const {
      dataReceived, pageLoading, setParams, fetchData, match, location, params,
    } = this.props
    const { targetPair, id } = params
    const { pair } = match.params
    const { orderId } = queryString.parse(location.search)

    const hasCorrectData = pair && orderId
    const isLoading = !dataReceived && !pageLoading
    const isParamsChanged = targetPair !== pair || id !== +orderId
    if (hasCorrectData && (isLoading || isParamsChanged)) {
      setParams({ targetPair: getMappedSymbolsFromUrl(pair)[0], id: +orderId })
      fetchData()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, MENU_ORDER_TRADES)
  }

  render() {
    const {
      entries,
      dataReceived,
      pageLoading,
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
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <DataTable
          numRows={entries.length}
          tableColumns={tableColumns}
        />
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('ordertrades.title')}</SectionHeaderTitle>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(OrderTrades)
