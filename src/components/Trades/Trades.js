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
import classNames from 'classnames'

import Pagination from 'components/Pagination'
import TimeRange from 'components/TimeRange'
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

import { propTypes, defaultProps } from './Trades.props'

const COLUMN_WIDTHS = [85, 100, 80, 125, 125, 125, 150]
const LIMIT = queryConstants.DEFAULT_TRADES_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_TRADES_PAGE_SIZE
const TYPE = queryConstants.MENU_TRADES
const ALL = 'ALL'
const WILD_CARD = ['', ALL]

class Trades extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  componentDidMount() {
    const { loading, fetchTrades, match } = this.props
    if (loading) {
      const pair = (match.params && match.params.pair) || ''
      fetchTrades(pair)
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

  fetchPrev() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchPrevTrades()
  }

  fetchNext() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNextTrades()
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

    const orderidCellRenderer = (rowIndex) => {
      const { orderID } = filteredData[rowIndex]
      return (
        <Cell tooltip={orderID}>
          {orderID}
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

    const amountCellRenderer = (rowIndex) => {
      const { execAmount } = filteredData[rowIndex]
      const classes = parseFloat(execAmount) > 0
        ? classNames('bitfinex-green-text', 'bitfinex-text-align-right')
        : classNames('bitfinex-red-text', 'bitfinex-text-align-right')
      return (
        <Cell
          className={classes}
          tooltip={execAmount}
        >
          {execAmount}
        </Cell>
      )
    }

    const priceCellRenderer = (rowIndex) => {
      const { execPrice } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={execPrice}
        >
          {execPrice}
        </Cell>
      )
    }

    const feeCellRenderer = (rowIndex) => {
      const { fee, feeCurrency } = filteredData[rowIndex]
      const tooltip = `${fee} ${feeCurrency}`
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {fee}
          &nbsp;
          <span className='bitfinex-show-soft'>
            {feeCurrency}
          </span>
        </Cell>
      )
    }

    const mtsCellRenderer = (rowIndex) => {
      const mtsCreate = formatTime(filteredData[rowIndex].mtsCreate, timezone)
      return (
        <Cell tooltip={mtsCreate}>
          <TruncatedFormat>
            {mtsCreate}
          </TruncatedFormat>
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
        id: 'order_id',
        name: 'trades.column.orderid',
        renderer: orderidCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].orderID,
      },
      {
        id: 'pair',
        name: 'trades.column.pair',
        renderer: pairCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].pair,
      },
      {
        id: 'amount',
        name: 'trades.column.amount',
        renderer: amountCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].execAmount,
      },
      {
        id: 'price',
        name: 'trades.column.price',
        renderer: priceCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].execPrice,
      },
      {
        id: 'fee',
        name: 'trades.column.fee',
        renderer: feeCellRenderer,
        tooltip: (rowIndex) => {
          const { fee, feeCurrency } = filteredData[rowIndex]
          return `${fee} ${feeCurrency}`
        },
      },
      {
        id: 'mts',
        name: 'trades.column.time',
        renderer: mtsCellRenderer,
        tooltip: rowIndex => formatTime(filteredData[rowIndex].mtsCreate, timezone),
      },
    ]

    let showContent
    if (loading) {
      showContent = (
        <Loading title='trades.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'trades.title' })}
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
            {intl.formatMessage({ id: 'trades.title' })}
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

Trades.propTypes = propTypes
Trades.defaultProps = defaultProps

export default injectIntl(Trades)
