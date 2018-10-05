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
import RefreshButton from 'ui/RefreshButton'
import SymbolSelector from 'ui/SymbolSelector'
import queryConstants from 'state/query/constants'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
} from 'state/utils'

import { propTypes, defaultProps } from './FundingOfferHistory.props'

const COLUMN_WIDTHS = [80, 100, 100, 150, 100, 200, 150, 80, 150]
const LIMIT = queryConstants.DEFAULT_FOFFER_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_FOFFER_PAGE_SIZE
const TYPE = queryConstants.MENU_FOFFER
const ALL = 'ALL'
const WILD_CARD = ['', ALL]

class FundingOfferHistory extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  componentDidMount() {
    const { loading, fetchFoffer } = this.props
    if (loading) {
      fetchFoffer()
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
    this.props.fetchPrevFOffer()
  }

  fetchNext() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNextFOffer()
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

    const idCellRenderer = (rowIndex) => {
      const { id } = filteredData[rowIndex]
      return (
        <Cell tooltip={id}>
          {id}
        </Cell>
      )
    }

    const symbolCellRenderer = (rowIndex) => {
      const { symbol } = filteredData[rowIndex]
      return (
        <Cell tooltip={symbol}>
          {symbol}
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

    const typeCellRenderer = (rowIndex) => {
      const { type } = filteredData[rowIndex]
      return (
        <Cell tooltip={type}>
          {type}
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

    const rateCellRenderer = (rowIndex) => {
      const { rate } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={rate}
        >
          {rate}
        </Cell>
      )
    }

    const periodCellRenderer = (rowIndex) => {
      const period = `${filteredData[rowIndex].period} ${intl.formatMessage({ id: 'foffer.column.period.days' })}`
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={period}
        >
          {period}
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
        prevClick={this.fetchPrev}
        nextClick={this.fetchNext}
        pageOffset={pageOffset}
      />
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
        name: 'foffer.column.symbol',
        renderer: symbolCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].symbol,
      },
      {
        id: 'amount',
        name: 'foffer.column.amount',
        renderer: amountCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].amount,
      },
      {
        id: 'amountorig',
        name: 'foffer.column.amount-orig',
        renderer: amountOrigCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].amountOrig,
      },
      {
        id: 'type',
        name: 'foffer.column.type',
        renderer: typeCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].type,
      },
      {
        id: 'status',
        name: 'foffer.column.status',
        renderer: statusCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].status,
      },
      {
        id: 'rate',
        name: 'foffer.column.rate',
        renderer: rateCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].rate,
      },
      {
        id: 'period',
        name: 'foffer.column.period',
        renderer: periodCellRenderer,
        tooltip: rowIndex =>
          `${filteredData[rowIndex].period} ${intl.formatMessage({ id: 'foffer.column.period.days' })}`,
      },
      {
        id: 'mtsUpdate',
        name: 'foffer.column.updated',
        renderer: mtsUpdateCellRenderer,
        tooltip: rowIndex =>  formatTime(filteredData[rowIndex].mtsUpdate),
      },
    ]

    let showContent
    if (loading) {
      showContent = (
        <Loading title='foffer.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'foffer.title' })}
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
            {intl.formatMessage({ id: 'foffer.title' })}
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

FundingOfferHistory.propTypes = propTypes
FundingOfferHistory.defaultProps = defaultProps

export default injectIntl(FundingOfferHistory)
