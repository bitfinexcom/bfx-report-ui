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
import Explorer from 'components/Explorer'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import SymbolSelector from 'ui/SymbolSelector'
import queryConstants from 'state/query/constants'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
} from 'state/utils'

import { propTypes, defaultProps } from './Movements.props'

// const TYPE_DEPOSITS = 'deposits'
const TYPE_WITHDRAWALS = queryConstants.MENU_WITHDRAWALS
const COLUMN_WIDTHS = [80, 150, 100, 125, 120, 400]
const LIMIT = queryConstants.DEFAULT_MOVEMENTS_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_MOVEMENTS_PAGE_SIZE
const ALL = 'ALL'
const WILD_CARD = ['', ALL]

class Movements extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  componentDidMount() {
    const { loading, fetchMovements } = this.props
    if (loading) {
      fetchMovements()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, 'movements')
  }

  handleClick(symbol) {
    if (!this.handlers[symbol]) {
      this.handlers[symbol] = () => {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setTargetSymbol(symbol === ALL ? '' : symbol)
      }
    }
    return this.handlers[symbol]
  }

  fetchPrev() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchPrevMovements()
  }

  fetchNext() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNextMovements()
  }

  render() {
    const {
      coins,
      currencies,
      offset,
      pageOffset,
      pageLoading,
      targetSymbol,
      entries,
      existingCoins,
      handleClickExport,
      intl,
      jumpPage,
      type,
      loading,
      refresh,
      timezone,
      nextPage,
    } = this.props
    const currentEntries = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const filteredData = currentEntries.filter(entry => (type === TYPE_WITHDRAWALS
      ? parseFloat(entry.amount) < 0 : parseFloat(entry.amount) > 0))
    const coinList = coins ? [ALL, ...coins] : [ALL, ...existingCoins]
    const currentCoin = targetSymbol || ALL
    const numRows = filteredData.length

    const idCellRenderer = (rowIndex) => {
      const { id } = filteredData[rowIndex]
      return (
        <Cell tooltip={id}>
          {id}
        </Cell>
      )
    }

    const mtsUpdatedCellRenderer = (rowIndex) => {
      const mtsUpdated = formatTime(filteredData[rowIndex].mtsUpdated, timezone)
      return (
        <Cell tooltip={mtsUpdated}>
          <TruncatedFormat>
            {mtsUpdated}
          </TruncatedFormat>
        </Cell>
      )
    }

    const currencyCellRenderer = (rowIndex) => {
      const { currency } = filteredData[rowIndex]
      return (
        <Cell tooltip={currency}>
          {currency}
        </Cell>
      )
    }

    const amountCellRenderer = (rowIndex) => {
      const { amount, currency } = filteredData[rowIndex]
      const tooltip = `${amount} ${currency}`
      const classes = parseFloat(amount) > 0
        ? 'bitfinex-green-text bitfinex-text-align-right'
        : 'bitfinex-red-text bitfinex-text-align-right'
      return (
        <Cell
          className={classes}
          tooltip={tooltip}
        >
          {amount}
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

    const destinationCellRenderer = (rowIndex) => {
      const { currency, destinationAddress } = filteredData[rowIndex]
      return (
        <Cell tooltip={destinationAddress}>
          {destinationAddress}
          &nbsp;
          <Explorer currency={currency} destinationAddress={destinationAddress} />
        </Cell>
      )
    }

    const tableColums = [
      {
        id: 'id',
        name: 'column.id',
        renderer: idCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].id,
      },
      {
        id: 'mtsupdated',
        name: 'movements.column.updated',
        renderer: mtsUpdatedCellRenderer,
        tooltip: rowIndex => formatTime(filteredData[rowIndex].mtsUpdated, timezone),
      },
      {
        id: 'currency',
        name: 'movements.column.currency',
        renderer: currencyCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].currency,
      },
      {
        id: 'status',
        name: 'movements.column.status',
        renderer: statusCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].status,
      },
      {
        id: 'amount',
        name: 'movements.column.amount',
        renderer: amountCellRenderer,
        tooltip: (rowIndex) => {
          const { amount, currency } = filteredData[rowIndex]
          return `${amount} ${currency}`
        },
      },
      {
        id: 'destination',
        name: 'movements.column.destination',
        renderer: destinationCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].destinationAddress,
      },
    ]

    const renderSymbolSelector = (
      <Fragment>
        &nbsp;
        <SymbolSelector
          coinList={coinList}
          coins={coins}
          currencies={currencies}
          currentCoin={currentCoin}
          existingCoins={existingCoins}
          onSymbolSelect={this.handleClick}
          wildCard={WILD_CARD}
        />
      </Fragment>
    )

    const renderPagination = (
      <Pagination
        type='movements'
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

    const titleMsgId = type === TYPE_WITHDRAWALS ? 'withdrawals.title' : 'deposits.title'
    let showContent
    if (loading) {
      showContent = (
        <Loading title={titleMsgId} />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: titleMsgId })}
            &nbsp;
            <TimeRange />
            {renderSymbolSelector}
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: titleMsgId })}
            &nbsp;
            <TimeRange />
            {renderSymbolSelector}
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

Movements.propTypes = propTypes
Movements.defaultProps = defaultProps

export default injectIntl(Movements)
