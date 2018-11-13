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
import RefreshButton from 'ui/RefreshButton'
import SymbolSelector from 'ui/SymbolSelector'
import queryConstants from 'state/query/constants'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
  getSideMsg,
} from 'state/utils'

import { propTypes, defaultProps } from './FundingCreditHistory.props'

const COLUMN_WIDTHS = [80, 100, 100, 100, 150, 150, 100, 150, 150, 130, 150]
const LIMIT = queryConstants.DEFAULT_FCREDIT_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_FCREDIT_PAGE_SIZE
const TYPE = queryConstants.MENU_FCREDIT
const ALL = 'ALL'
const WILD_CARD = ['', ALL]

class FundingCreditHistory extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  componentDidMount() {
    const { loading, fetchFcredit } = this.props
    if (loading) {
      fetchFcredit()
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
    this.props.fetchPrevFCredit()
  }

  fetchNext() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNextFCredit()
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
      loading,
      refresh,
      timezone,
      nextPage,
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

    const sideCellRenderer = (rowIndex) => {
      const side = intl.formatMessage({ id: `fcredit.side.${getSideMsg(filteredData[rowIndex].side)}` })
      return (
        <Cell tooltip={side}>
          {side}
        </Cell>
      )
    }

    const amountCellRenderer = (rowIndex) => {
      const { amount } = filteredData[rowIndex]
      const classes = parseFloat(amount) > 0
        ? classNames('bitfinex-green-text', 'bitfinex-text-align-right')
        : classNames('bitfinex-red-text', 'bitfinex-text-align-right')
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
      const period = `${filteredData[rowIndex].period} ${intl.formatMessage({ id: 'fcredit.column.period.days' })}`
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

    const positionPairCellRenderer = (rowIndex) => {
      const { positionPair } = filteredData[rowIndex]
      return (
        <Cell tooltip={positionPair}>
          {positionPair}
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

    const tableColums = [
      {
        id: 'id',
        name: 'column.id',
        renderer: idCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].id,
      },
      {
        id: 'symbol',
        name: 'fcredit.column.symbol',
        renderer: symbolCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].symbol,
      },
      {
        id: 'side',
        name: 'fcredit.column.side',
        renderer: sideCellRenderer,
        tooltip: rowIndex => intl.formatMessage({ id: `fcredit.side.${getSideMsg(filteredData[rowIndex].side)}` }),
      },
      {
        id: 'amount',
        name: 'fcredit.column.amount',
        renderer: amountCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].amount,
      },
      {
        id: 'status',
        name: 'fcredit.column.status',
        renderer: statusCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].status,
      },
      {
        id: 'rate',
        name: 'fcredit.column.rate',
        renderer: rateCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].rate,
      },
      {
        id: 'period',
        name: 'fcredit.column.period',
        renderer: periodCellRenderer,
        tooltip: (rowIndex) => {
          const days = intl.formatMessage({ id: 'fcredit.column.period.days' })
          return `${filteredData[rowIndex].period} ${days}`
        },
      },
      {
        id: 'mtsOpening',
        name: 'fcredit.column.opening',
        renderer: mtsOpeningCellRenderer,
        tooltip: (rowIndex) => {
          const { mtsOpening } = filteredData[rowIndex]
          return mtsOpening ? formatTime(mtsOpening, timezone) : ''
        },
      },
      {
        id: 'mtsLastPayout',
        name: 'fcredit.column.lastpayout',
        renderer: mtsLastPayoutCellRenderer,
        tooltip: (rowIndex) => {
          const { mtsLastPayout } = filteredData[rowIndex]
          return mtsLastPayout ? formatTime(mtsLastPayout, timezone) : ''
        },
      },
      {
        id: 'positionPair',
        name: 'fcredit.column.positionpair',
        renderer: positionPairCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].positionPair,
      },
      {
        id: 'mtsUpdate',
        name: 'fcredit.column.updated',
        renderer: mtsUpdateCellRenderer,
        tooltip: rowIndex => formatTime(filteredData[rowIndex].mtsUpdate, timezone),
      },
    ]

    let showContent
    if (loading) {
      showContent = (
        <Loading title='fcredit.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'fcredit.title' })}
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
            {intl.formatMessage({ id: 'fcredit.title' })}
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

FundingCreditHistory.propTypes = propTypes
FundingCreditHistory.defaultProps = defaultProps

export default injectIntl(FundingCreditHistory)
