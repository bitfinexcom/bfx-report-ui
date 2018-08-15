import React, { Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'
import {
  Cell,
  Column,
  Table,
  TruncatedFormat,
} from '@blueprintjs/table'

import Pagination from 'components/Pagination'
import TimeRange from 'components/TimeRange'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import ExportButton from 'ui/ExportButton'
import RefreshButton from 'ui/RefreshButton'
import PairSelector from 'ui/PairSelector'
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
          <Table
            className='bitfinex-table'
            numRows={numRows}
            enableRowHeader={false}
            columnWidths={COLUMN_WIDTHS}
          >
            <Column
              id='id'
              name='#'
              cellRenderer={idCellRenderer}
            />
            <Column
              id='symbol'
              name={intl.formatMessage({ id: 'orders.column.pair' })}
              cellRenderer={pairCellRenderer}
            />
            <Column
              id='type'
              name={intl.formatMessage({ id: 'orders.column.type' })}
              cellRenderer={typeCellRenderer}
            />
            <Column
              id='amount'
              name={intl.formatMessage({ id: 'orders.column.amount' })}
              cellRenderer={amountCellRenderer}
            />
            <Column
              id='amountOrig'
              name={intl.formatMessage({ id: 'orders.column.amount-orig' })}
              cellRenderer={amountOrigCellRenderer}
            />
            <Column
              id='price'
              name={intl.formatMessage({ id: 'orders.column.price' })}
              cellRenderer={priceCellRenderer}
            />
            <Column
              id='priceAvg'
              name={intl.formatMessage({ id: 'orders.column.avgprice' })}
              cellRenderer={priceAvgCellRenderer}
            />
            <Column
              id='mtsUpdate'
              name={intl.formatMessage({ id: 'orders.column.update' })}
              cellRenderer={mtsUpdateCellRenderer}
            />
            <Column
              id='status'
              name={intl.formatMessage({ id: 'orders.column.status' })}
              cellRenderer={statusCellRenderer}
            />
          </Table>
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
