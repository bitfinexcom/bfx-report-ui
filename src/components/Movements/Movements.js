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
import SymbolSelector from 'ui/SymbolSelector'
import queryConstants from 'state/query/constants'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
} from 'state/utils'

import { propTypes, defaultProps } from './Movements.props'
import Inspector from './Inspector'

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
      const mtsUpdated = formatTime(filteredData[rowIndex].mtsUpdated)
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
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {amount}
          &nbsp;
          <span className='bitfinex-show-soft'>
            {currency}
          </span>
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
          <Inspector currency={currency} destinationAddress={destinationAddress} />
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
        type='movements'
        dataLen={entries.length}
        loading={pageLoading}
        offset={offset}
        jumpPage={jumpPage}
        prevClick={this.fetchPrev}
        nextClick={this.fetchNext}
        pageOffset={pageOffset}
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
              id='mtsupdated'
              name={intl.formatMessage({ id: 'movements.column.updated' })}
              cellRenderer={mtsUpdatedCellRenderer}
            />
            <Column
              id='currency'
              name={intl.formatMessage({ id: 'movements.column.currency' })}
              cellRenderer={currencyCellRenderer}
            />
            <Column
              id='status'
              name={intl.formatMessage({ id: 'movements.column.status' })}
              cellRenderer={statusCellRenderer}
            />
            <Column
              id='amount'
              name={intl.formatMessage({ id: 'movements.column.amount' })}
              cellRenderer={amountCellRenderer}
            />
            <Column
              id='destination'
              name={intl.formatMessage({ id: 'movements.column.destination' })}
              cellRenderer={destinationCellRenderer}
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

Movements.propTypes = propTypes
Movements.defaultProps = defaultProps

export default injectIntl(Movements)
