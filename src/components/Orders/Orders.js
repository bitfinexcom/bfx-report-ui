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
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import PairSelector from 'ui/PairSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getPath } from 'state/query/utils'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
} from 'state/utils'
import { amountStyle } from 'ui/utils'

import { propTypes, defaultProps } from './Orders.props'

const COLUMN_WIDTHS = [100, 80, 150, 100, 100, 100, 100, 150, 150, 200]
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
  }

  componentDidMount() {
    const { loading, fetchOrders, match } = this.props
    if (loading) {
      const pair = (match.params && match.params.pair) || ''
      fetchOrders(pair)
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  handleClick(pair) {
    if (!this.handlers[pair]) {
      this.handlers[pair] = () => {
        const { history, setTargetPair } = this.props
        // show select pair in url
        if (pair === ALL) {
          history.push(`${getPath(TYPE)}${history.location.search}`)
          setTargetPair('')
        } else {
          history.push(`${getPath(TYPE)}/${pair.toUpperCase()}${history.location.search}`)
          setTargetPair(pair)
        }
      }
    }
    return this.handlers[pair]
  }

  render() {
    const {
      existingPairs,
      fetchNext,
      fetchPrev,
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
      nextPage,
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

    const amountExecutedCellRenderer = (rowIndex) => {
      const { amountExecuted } = filteredData[rowIndex]
      const classes = amountStyle(amountExecuted)
      return (
        <Cell
          className={classes}
          tooltip={amountExecuted}
        >
          {amountExecuted}
        </Cell>
      )
    }

    const amountCellRenderer = (rowIndex) => {
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

    const mtsCreateCellRenderer = (rowIndex) => {
      const mtsCreate = formatTime(filteredData[rowIndex].mtsCreate, timezone)
      return (
        <Cell tooltip={mtsCreate}>
          <TruncatedFormat>
            {mtsCreate}
          </TruncatedFormat>
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
        prevClick={fetchPrev}
        nextClick={fetchNext}
        pageOffset={pageOffset}
        nextPage={nextPage}
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
        tooltip: rowIndex => filteredData[rowIndex].amountOrig,
      },
      {
        id: 'amountExecuted',
        name: 'orders.column.amount-exe',
        renderer: amountExecutedCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].amountExecuted,
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
        id: 'mtsCreate',
        name: 'orders.column.create',
        renderer: mtsCreateCellRenderer,
        tooltip: rowIndex => formatTime(filteredData[rowIndex].mtsCreate, timezone),
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
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        {showContent}
      </Card>
    )
  }
}

Orders.propTypes = propTypes
Orders.defaultProps = defaultProps

export default injectIntl(Orders)
