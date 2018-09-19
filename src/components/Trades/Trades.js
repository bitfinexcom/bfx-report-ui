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

import { propTypes, defaultProps } from './Trades.props'

const COLUMN_WIDTHS = [85, 80, 125, 125, 125, 150]
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
    const { loading, fetchTrades } = this.props
    if (loading) {
      fetchTrades()
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

    const amountCellRenderer = (rowIndex) => {
      const { execAmount } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
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
      const mtsCreate = formatTime(filteredData[rowIndex].mtsCreate)
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
              id='pair'
              name={intl.formatMessage({ id: 'trades.column.pair' })}
              cellRenderer={pairCellRenderer}
            />
            <Column
              id='amount'
              name={intl.formatMessage({ id: 'trades.column.amount' })}
              cellRenderer={amountCellRenderer}
            />
            <Column
              id='price'
              name={intl.formatMessage({ id: 'trades.column.price' })}
              cellRenderer={priceCellRenderer}
            />
            <Column
              id='fee'
              name={intl.formatMessage({ id: 'trades.column.fee' })}
              cellRenderer={feeCellRenderer}
            />
            <Column
              id='mts'
              name={intl.formatMessage({ id: 'trades.column.time' })}
              cellRenderer={mtsCellRenderer}
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

Trades.propTypes = propTypes
Trades.defaultProps = defaultProps

export default injectIntl(Trades)
