import React, { Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Card,
  Elevation,
} from '@blueprintjs/core'
import {
  Cell,
  Column,
  Table,
  TruncatedFormat,
} from '@blueprintjs/table'

import Loading from 'components/Loading'
import NoData from 'components/NoData'
import Pagination from 'components/Pagination'
import queryConstants from 'state/query/constants'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
  getPageLoadingState,
} from 'state/utils'

import { propTypes, defaultProps } from './Orders.props'

const COLUMN_WIDTHS = [100, 80, 150, 100, 100, 100, 100, 150, 200]
const LIMIT = queryConstants.DEFAULT_ORDERS_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_ORDERS_PAGE_SIZE

class Orders extends PureComponent {
  constructor(props) {
    super(props)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  state = {
    offset: 0,
    pageLoading: false,
  }

  componentDidMount() {
    const { loading, fetchOrders } = this.props
    if (loading) {
      fetchOrders()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, 'orders')
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getPageLoadingState(nextProps.offset, prevState.offset)
  }

  fetchPrev() {
    this.setState({ pageLoading: true })
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchPrevOrders()
  }

  fetchNext() {
    this.setState({ pageLoading: true })
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNextOrders()
  }

  render() {
    const {
      offset,
      pageOffset,
      entries,
      handleClickExport,
      intl,
      jumpPage,
      loading,
    } = this.props
    const {
      pageLoading,
    } = this.state
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const numRows = filteredData.length

    const idCellRenderer = rowIndex => (
      <Cell wrapText={false}>
        {filteredData[rowIndex].id}
      </Cell>
    )

    const pairCellRenderer = rowIndex => (
      <Cell>
        {filteredData[rowIndex].pair}
      </Cell>
    )

    const typeCellRenderer = rowIndex => (
      <Cell>
        {filteredData[rowIndex].type}
      </Cell>
    )

    const amountOrigCellRenderer = rowIndex => (
      <Cell className='bitfinex-text-align-right'>
        {filteredData[rowIndex].amountOrig}
      </Cell>
    )

    const amountCellRenderer = rowIndex => (
      <Cell className='bitfinex-text-align-right'>
        {filteredData[rowIndex].amount}
      </Cell>
    )

    const priceCellRenderer = rowIndex => (
      <Cell className='bitfinex-text-align-right'>
        {filteredData[rowIndex].price}
      </Cell>
    )

    const priceAvgCellRenderer = rowIndex => (
      <Cell className='bitfinex-text-align-right'>
        {filteredData[rowIndex].priceAvg}
      </Cell>
    )

    const mtsUpdateCellRenderer = rowIndex => (
      <Cell>
        <TruncatedFormat>
          {formatTime(filteredData[rowIndex].mtsUpdate)}
        </TruncatedFormat>
      </Cell>
    )

    const statusCellRenderer = rowIndex => (
      <Cell>
        {filteredData[rowIndex].status}
      </Cell>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='orders.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <NoData title='orders.title' />
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'orders.title' })}
            &nbsp;
            <Button icon='cloud-download' onClick={handleClickExport}>
              {intl.formatMessage({ id: 'timeframe.download' })}
            </Button>
          </h4>
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
          <Pagination
            type='orders'
            dataLen={entries.length}
            loading={pageLoading}
            offset={offset}
            jumpPage={jumpPage}
            prevClick={this.fetchPrev}
            nextClick={this.fetchNext}
            pageOffset={pageOffset}
          />
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
