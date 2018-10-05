import React, { PureComponent, Fragment } from 'react'
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
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import ExportButton from 'ui/ExportButton'
import RefreshButton from 'ui/RefreshButton'
import SymbolSelector from 'ui/SymbolSelector'
import queryConstants from 'state/query/constants'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
} from 'state/utils'

import DataTable from 'ui/DataTable'

import { propTypes, defaultProps } from './Ledgers.props'

const COLUMN_WIDTHS = [500, 100, 120, 120, 120, 150]
const LIMIT = queryConstants.DEFAULT_LEDGERS_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_LEDGERS_PAGE_SIZE
const TYPE = queryConstants.MENU_LEDGERS
const ALL = 'ALL'
const WILD_CARD = ['', ALL]

class Ledgers extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  componentDidMount() {
    const { loading, fetchLedgers } = this.props
    if (loading) {
      fetchLedgers()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
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
    this.props.fetchPrevLedgers()
  }

  fetchNext() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNextLedgers()
  }

  render() {
    const {
      coins,
      offset,
      pageOffset,
      pageLoading,
      targetSymbol,
      entries,
      existingCoins,
      handleClickExport,
      intl,
      jumpPage,
      loading,
      refresh,
      timezone,
    } = this.props
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const coinList = coins ? [ALL, ...coins] : [ALL, ...existingCoins]
    const currentCoin = targetSymbol || ALL
    const numRows = filteredData.length

    const descriptionCellRenderer = (rowIndex) => {
      const { description } = filteredData[rowIndex]
      return (
        <Cell tooltip={description}>
          {description}
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

    const mtsCellRenderer = (rowIndex) => {
      const mts = formatTime(filteredData[rowIndex].mts, timezone)
      return (
        <Cell tooltip={mts}>
          <TruncatedFormat>
            {mts}
          </TruncatedFormat>
        </Cell>
      )
    }

    const creditCellRenderer = (rowIndex) => {
      const { amount, currency } = filteredData[rowIndex]
      const show = parseFloat(amount) > 0
      const showAmount = show ? amount : ''
      // eslint-disable-next-line react/destructuring-assignment
      const showCurrency = show && WILD_CARD.includes(targetSymbol) ? (
        <Fragment>
          &nbsp;
          <span className='bitfinex-show-soft'>
            {currency}
          </span>
        </Fragment>
      ) : ''
      const tooltip = show ? `${amount} ${currency}` : undefined
      return (
        <Cell
          className='bitfinex-green-text bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {showAmount}
          {showCurrency}
        </Cell>
      )
    }

    const debitCellRenderer = (rowIndex) => {
      const { amount, currency } = filteredData[rowIndex]
      const show = parseFloat(amount) < 0
      const showAmount = show ? Math.abs(amount) : ''
      // eslint-disable-next-line react/destructuring-assignment
      const showCurrency = show && WILD_CARD.includes(targetSymbol) ? (
        <Fragment>
          &nbsp;
          <span className='bitfinex-show-soft'>
            {currency}
          </span>
        </Fragment>
      ) : ''
      const tooltip = show ? `${Math.abs(amount)} ${currency}` : undefined
      return (
        <Cell
          className='bitfinex-red-text bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {showAmount}
          {showCurrency}
        </Cell>
      )
    }

    const balanceCellRenderer = (rowIndex) => {
      const { balance, currency } = filteredData[rowIndex]
      const tooltip = `${balance} ${currency}`
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {balance}
        </Cell>
      )
    }

    const renderSymbolSelector = (
      <Fragment>
        &nbsp;
        <SymbolSelector
          coinList={coinList}
          coins={coins}
          currentCoin={currentCoin}
          existingCoins={existingCoins}
          onSymbolSelect={this.handleClick}
          wildCard={WILD_CARD}
        />
      </Fragment>
    )

    const renderPagination = (
      <Pagination
        type={TYPE}
        dataLen={entries.length}
        loading={pageLoading}
        offset={offset}
        jumpPage={jumpPage}
        nextClick={this.fetchNext}
        prevClick={this.fetchPrev}
        pageOffset={pageOffset}
      />
    )

    const tableColums = [
      {
        id: 'description',
        name: 'ledgers.column.description',
        renderer: descriptionCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].description,
      },
      {
        id: 'currency',
        name: 'ledgers.column.currency',
        renderer: currencyCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].currency,
      },
      {
        id: 'credit',
        name: 'ledgers.column.credit',
        renderer: creditCellRenderer,
        tooltip: (rowIndex) => {
          const { amount, currency } = filteredData[rowIndex]
          const show = parseFloat(amount) > 0
          return show ? `${amount} ${currency}` : ''
        },
      },
      {
        id: 'debit',
        name: 'ledgers.column.debit',
        renderer: debitCellRenderer,
        tooltip: (rowIndex) => {
          const { amount, currency } = filteredData[rowIndex]
          const show = parseFloat(amount) < 0
          return show ? `${amount} ${currency}` : ''
        },
      },
      {
        id: 'balance',
        name: 'ledgers.column.balance',
        renderer: balanceCellRenderer,
        tooltip: (rowIndex) => {
          const { balance, currency } = filteredData[rowIndex]
          return `${balance} ${currency}`
        },
      },
      {
        id: 'mts',
        name: 'ledgers.column.time',
        renderer: mtsCellRenderer,
        tooltip: rowIndex => formatTime(filteredData[rowIndex].mts),
      },
    ]

    let showContent
    if (loading) {
      showContent = (
        <Loading title='ledgers.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'ledgers.title' })}
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
            {intl.formatMessage({ id: 'ledgers.title' })}
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
      <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        {showContent}
      </Card>
    )
  }
}

Ledgers.propTypes = propTypes
Ledgers.defaultProps = defaultProps

export default injectIntl(Ledgers)
