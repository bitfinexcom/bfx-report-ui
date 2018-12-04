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
import RefreshButton from 'ui/RefreshButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import queryConstants from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
  getSideMsg,
  handleAddSymbolFilter,
  handleRemoveSymbolFilter,
} from 'state/utils'
import { amountStyle } from 'ui/utils'

import { propTypes, defaultProps } from './FundingLoanHistory.props'

const COLUMN_WIDTHS = [80, 100, 80, 100, 150, 130, 80, 150, 150, 150]
const TYPE = queryConstants.MENU_FLOAN
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

class FundingLoanHistory extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.handleTagRemove = this.handleTagRemove.bind(this)
  }

  componentDidMount() {
    const { loading, fetchFloan, match } = this.props
    if (loading) {
      const symbol = (match.params && match.params.symbol) || ''
      fetchFloan(symbol)
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  handleClick(symbol) {
    if (!this.handlers[symbol]) {
      this.handlers[symbol] = () => handleAddSymbolFilter(TYPE, symbol, this.props)
    }
    return this.handlers[symbol]
  }

  handleTagRemove(tag) {
    handleRemoveSymbolFilter(TYPE, tag, this.props)
  }

  render() {
    const {
      fetchNext,
      fetchPrev,
      offset,
      pageOffset,
      pageLoading,
      targetSymbols,
      entries,
      existingCoins,
      handleClickExport,
      intl,
      jumpPage,
      loading,
      refresh,
      timezone,
      nextPage,
    } = this.props
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
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

    const sideCellRenderer = (rowIndex) => {
      const side = intl.formatMessage({ id: `floan.side.${getSideMsg(filteredData[rowIndex].side)}` })
      return (
        <Cell tooltip={side}>
          {side}
        </Cell>
      )
    }

    const amountCellRenderer = (rowIndex) => {
      const { amount } = filteredData[rowIndex]
      const classes = amountStyle(amount)
      return (
        <Cell
          className={classes}
          tooltip={amount}
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
      const period = `${filteredData[rowIndex].period} ${intl.formatMessage({ id: 'floan.column.period.days' })}`
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={period}
        >
          {period}
        </Cell>
      )
    }

    const mtsOpeningCellRenderer = (rowIndex) => {
      const { mtsOpening } = filteredData[rowIndex]
      const opening = mtsOpening ? formatTime(mtsOpening, timezone) : ''
      return (
        <Cell tooltip={opening}>
          <TruncatedFormat>
            {opening}
          </TruncatedFormat>
        </Cell>
      )
    }

    const mtsLastPayoutCellRenderer = (rowIndex) => {
      const { mtsLastPayout } = filteredData[rowIndex]
      const payout = mtsLastPayout ? formatTime(mtsLastPayout, timezone) : ''
      return (
        <Cell tooltip={payout}>
          <TruncatedFormat>
            {payout}
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

    const renderSymbolSelector = (
      <Fragment>
        &nbsp;
        <MultiSymbolSelector
          currentFilters={targetSymbols}
          existingCoins={existingCoins}
          onSymbolSelect={this.handleClick}
          handleTagRemove={this.handleTagRemove}
          type={TYPE}
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
        prevClick={fetchPrev}
        nextClick={fetchNext}
        pageOffset={pageOffset}
        nextPage={nextPage}
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
        name: 'floan.column.symbol',
        renderer: symbolCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].symbol,
      },
      {
        id: 'side',
        name: 'floan.column.side',
        renderer: sideCellRenderer,
        tooltip: rowIndex => intl.formatMessage({ id: `floan.side.${getSideMsg(filteredData[rowIndex].side)}` }),
      },
      {
        id: 'amount',
        name: 'floan.column.amount',
        renderer: amountCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].amount,
      },
      {
        id: 'status',
        name: 'floan.column.status',
        renderer: statusCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].status,
      },
      {
        id: 'rate',
        name: 'floan.column.rate',
        renderer: rateCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].rate,
      },
      {
        id: 'period',
        name: 'floan.column.period',
        renderer: periodCellRenderer,
        tooltip: (rowIndex) => {
          const days = intl.formatMessage({ id: 'floan.column.period.days' })
          return `${filteredData[rowIndex].period} ${days}`
        },
      },
      {
        id: 'mtsOpening',
        name: 'floan.column.opening',
        renderer: mtsOpeningCellRenderer,
        tooltip: (rowIndex) => {
          const { mtsOpening } = filteredData[rowIndex]
          return mtsOpening ? formatTime(mtsOpening, timezone) : ''
        },
      },
      {
        id: 'mtsLastPayout',
        name: 'floan.column.lastpayout',
        renderer: mtsLastPayoutCellRenderer,
        tooltip: (rowIndex) => {
          const { mtsLastPayout } = filteredData[rowIndex]
          return mtsLastPayout ? formatTime(mtsLastPayout, timezone) : ''
        },
      },
      {
        id: 'mtsUpdate',
        name: 'floan.column.updated',
        renderer: mtsUpdateCellRenderer,
        tooltip: rowIndex => formatTime(filteredData[rowIndex].mtsUpdate, timezone),
      },
    ]

    let showContent
    if (loading) {
      showContent = (
        <Loading title='floan.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'floan.title' })}
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
            {intl.formatMessage({ id: 'floan.title' })}
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

FundingLoanHistory.propTypes = propTypes
FundingLoanHistory.defaultProps = defaultProps

export default injectIntl(FundingLoanHistory)
