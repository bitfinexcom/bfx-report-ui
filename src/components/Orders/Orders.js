import React, { Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import Pagination from 'components/Pagination'
import TimeRange from 'components/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import PairSelector from 'ui/PairSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
} from 'state/utils'

import { propTypes, defaultProps } from './Orders.props'

const COLUMN_WIDTHS = [100, 80, 150, 100, 100, 100, 100, 150, 200]
const LIMIT = queryConstants.DEFAULT_ORDERS_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_ORDERS_PAGE_SIZE
const TYPE = queryConstants.MENU_ORDERS
const ALL = 'ALL'
const WILD_CARD = ['', ALL]

class Orders extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  componentDidMount() {
    const { loading, fetchOrders } = this.props
    if (loading) {
      fetchOrders()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  handleClick(pair) {
    if (!this.handlers[pair]) {
      this.handlers[pair] = () => {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setTargetPair(pair === ALL ? '' : pair)
      }
    }
    return this.handlers[pair]
  }

  fetchPrev() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchPrevOrders()
  }

  fetchNext() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNextOrders()
  }

  render() {
    const {
      existingPairs,
      offset,
      pageOffset,
      pageLoading,
      pairs,
      entries,
      handleClickExport,
      intl,
      jumpPage,
      loading,
      refresh,
      targetPair,
      timezone,
    } = this.props
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const pairList = pairs ? [ALL, ...pairs] : [ALL, ...existingPairs]
    const currentPair = targetPair || ALL
    const numRows = filteredData.length

    const idCellRenderer = (rowIndex) => {
      const { id } = filteredData[rowIndex]
      return (
        <Cell tooltip={id}>
          {id}
        </Cell>
      )
    }

    const pairCellRenderer = (rowIndex) => {
      const { pair } = filteredData[rowIndex]
      return (
        <Cell tooltip={pair}>
          {pair}
        </Cell>
      )
    }

    const typeCellRenderer = (rowIndex) => {
      const { type } = filteredData[rowIndex]
      return (
        <Cell tooltip={type}>
          {type}
        </Cell>
      )
    }

    const amountOrigCellRenderer = (rowIndex) => {
      const { amountOrig } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={amountOrig}
        >
          {amountOrig}
        </Cell>
      )
    }

    const amountCellRenderer = (rowIndex) => {
      const { amount } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={amount}
        >
          {amount}
        </Cell>
      )
    }

    const priceCellRenderer = (rowIndex) => {
      const { price } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={price}
        >
          {price}
        </Cell>
      )
    }

    const priceAvgCellRenderer = (rowIndex) => {
      const { priceAvg } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={priceAvg}
        >
          {priceAvg}
        </Cell>
      )
    }

    const mtsUpdateCellRenderer = (rowIndex) => {
      const mtsUpdate = formatTime(filteredData[rowIndex].mtsUpdate, timezone)
      return (
        <Cell tooltip={mtsUpdate}>
          <TruncatedFormat>
            {mtsUpdate}
          </TruncatedFormat>
        </Cell>
      )
    }

    const statusCellRenderer = (rowIndex) => {
      const { status } = filteredData[rowIndex]
      return (
        <Cell tooltip={status}>
          {status}
        </Cell>
      )
    }

    const renderPagination = (
      <Pagination
        type={TYPE}
        dataLen={entries.length}
        loading={pageLoading}
        offset={offset}
        jumpPage={jumpPage}
        prevClick={this.fetchPrev}
        nextClick={this.fetchNext}
        pageOffset={pageOffset}
      />
    )

    const renderPairSelector = (
      <Fragment>
          &nbsp;
        <PairSelector
          currentPair={currentPair}
          existingPairs={existingPairs}
          onPairSelect={this.handleClick}
          pairList={pairList}
          pairs={pairs}
          wildCard={WILD_CARD}
        />
      </Fragment>
    )

    const tableColums = [
      {
        id: 'id',
        name: 'column.id',
        renderer: idCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].id,
      },
      {
        id: 'symbol',
        name: 'orders.column.pair',
        renderer: pairCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].pair,
      },
      {
        id: 'type',
        name: 'orders.column.type',
        renderer: typeCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].type,
      },
      {
        id: 'amount',
        name: 'orders.column.amount',
        renderer: amountCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].amount,
      },
      {
        id: 'amountOrig',
        name: 'orders.column.amount-orig',
        renderer: amountOrigCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].amountOrig,
      },
      {
        id: 'price',
        name: 'orders.column.price',
        renderer: priceCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].price,
      },
      {
        id: 'priceAvg',
        name: 'orders.column.avgprice',
        renderer: priceAvgCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].priceAvg,
      },
      {
        id: 'mtsUpdate',
        name: 'orders.column.update',
        renderer: mtsUpdateCellRenderer,
        tooltip: rowIndex => formatTime(filteredData[rowIndex].mtsUpdate, timezone),
      },
      {
        id: 'status',
        name: 'orders.column.status',
        renderer: statusCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].status,
      },
    ]

    let showContent
    if (loading) {
      showContent = (
        <Loading title='orders.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'orders.title' })}
            &nbsp;
            <TimeRange />
            {renderPairSelector}
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'orders.title' })}
            &nbsp;
            <TimeRange />
            {renderPairSelector}
            &nbsp;
            <ExportButton handleClickExport={handleClickExport} />
            &nbsp;
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          {renderPagination}
          <DataTable
            numRows={numRows}
            columnWidths={COLUMN_WIDTHS}
            tableColums={tableColums}
          />
          {renderPagination}
        </Fragment>
      )
    }

    return (
      <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        {showContent}
      </Card>
    )
  }
}

Orders.propTypes = propTypes
Orders.defaultProps = defaultProps

export default injectIntl(Orders)
