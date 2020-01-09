import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import queryString from 'query-string'
import { Card, Elevation } from '@blueprintjs/core'

import ColumnsFilter from 'ui/ColumnsFilter'
import Pagination from 'ui/Pagination'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import MultiPairSelector from 'ui/MultiPairSelector'
import RefreshButton from 'ui/RefreshButton'
import QueryLimitSelector from 'ui/QueryLimitSelector'
import queryConstants from 'state/query/constants'
import { getMappedSymbolsFromUrl, mapRequestPairs } from 'state/symbols/utils'
import { checkFetch, togglePair } from 'state/utils'
import { getPath } from 'state/query/utils'

import getColumns from './Orders.columns'
import { propTypes, defaultProps } from './Orders.props'

const TYPE = queryConstants.MENU_ORDERS

class Orders extends PureComponent {
  componentDidMount() {
    const {
      dataReceived, pageLoading, setTargetPairs, fetchOrders, match,
    } = this.props
    if (!dataReceived && !pageLoading) {
      const pairs = (match.params && match.params.pair) || ''
      if (pairs) {
        setTargetPairs(getMappedSymbolsFromUrl(pairs))
      }
      fetchOrders()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  jumpToOrderTrades = (e, { id, pair }) => {
    e.preventDefault()
    const { history, location } = this.props
    const params = queryString.parse(location.search)
    const search = queryString.stringify({ ...params, orderId: id })

    const demappedPair = mapRequestPairs(pair, true)

    history.push({
      pathname: `${getPath(queryConstants.MENU_ORDER_TRADES)}/${demappedPair}`,
      search,
    })
  }

  render() {
    const {
      columns,
      existingPairs,
      entries,
      dataReceived,
      pageLoading,
      refresh,
      targetPairs,
      getFullTime,
      t,
      timeOffset,
    } = this.props
    const tableColumns = getColumns({
      filteredData: entries,
      getFullTime,
      onIdClick: this.jumpToOrderTrades,
      t,
      timeOffset,
    }).filter(({ id }) => columns[id])

    const renderPairSelector = (
      <Fragment>
        {' '}
        <MultiPairSelector
          currentFilters={targetPairs}
          existingPairs={existingPairs}
          togglePair={pair => togglePair(TYPE, this.props, pair)}
        />
      </Fragment>
    )

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = (
        <Loading title='orders.title' />
      )
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('orders.title')}
            {' '}
            <TimeRange />
            {renderPairSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
            {' '}
            <QueryLimitSelector target={TYPE} />
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('orders.title')}
            {' '}
            <TimeRange />
            {renderPairSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <ExportButton />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <Pagination target={TYPE} loading={pageLoading} />
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination target={TYPE} loading={pageLoading} />
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

Orders.propTypes = propTypes
Orders.defaultProps = defaultProps

export default withTranslation('translations')(Orders)
