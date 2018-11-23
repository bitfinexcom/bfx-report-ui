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
  getNoAuthTokenUrlString,
} from 'state/utils'
import { formatPair } from 'state/symbols/utils'

import { propTypes, defaultProps } from './PublicTrades.props'

const COLUMN_WIDTHS = [85, 150, 80, 125, 125, 100]
const LIMIT = queryConstants.DEFAULT_PUBLICTRADES_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_PUBLICTRADES_PAGE_SIZE
const TYPE = queryConstants.MENU_PUBLIC_TRADES
const WILD_CARD = ['']

class PublicTrades extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  componentDidMount() {
    const { loading, fetchPublictrades, match } = this.props
    if (loading) {
      const pair = (match.params && match.params.pair) || ''
      fetchPublictrades(pair)
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
        history.push(`${getPath(TYPE)}/${pair.toUpperCase()}${getNoAuthTokenUrlString(history.location.search)}`)
        setTargetPair(pair)
      }
    }
    return this.handlers[pair]
  }

  fetchPrev() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchPrev()
  }

  fetchNext() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNext()
  }

  render() {
    const {
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
    const pairList = pairs
    const currentPair = targetPair || 'btcusd'
    const formatedCurrentPair = formatPair(targetPair)
    const numRows = filteredData.length

    const idCellRenderer = (rowIndex) => {
      const { id } = filteredData[rowIndex]
      return (
        <Cell tooltip={id}>
          {id}
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

    const typeCellRenderer = (rowIndex) => {
      const { type, amount } = filteredData[rowIndex]
      const classes = parseFloat(amount) > 0
        ? 'bitfinex-green-text'
        : 'bitfinex-red-text'
      return (
        <Cell
          className={classes}
          tooltip={type}
        >
          {type}
        </Cell>
      )
    }

    const priceCellRenderer = (rowIndex) => {
      const { price, amount } = filteredData[rowIndex]
      const classes = parseFloat(amount) > 0
        ? 'bitfinex-green-text bitfinex-text-align-right'
        : 'bitfinex-red-text bitfinex-text-align-right'
      return (
        <Cell
          className={classes}
          tooltip={price}
        >
          {price}
        </Cell>
      )
    }

    const amountCellRenderer = (rowIndex) => {
      const amount = Math.abs(filteredData[rowIndex].amount)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={amount}
        >
          {amount}
        </Cell>
      )
    }

    const pairCellRenderer = () => (
      <Cell tooltip={formatedCurrentPair}>
        {formatedCurrentPair}
      </Cell>
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

    const renderPairSelector = (
      <Fragment>
        &nbsp;
        <PairSelector
          currentPair={currentPair}
          existingPairs={[]}
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
        id: 'mts',
        name: 'publictrades.column.time',
        renderer: mtsCellRenderer,
        tooltip: rowIndex => formatTime(filteredData[rowIndex].mts, timezone),
      },
      {
        id: 'type',
        name: 'publictrades.column.type',
        renderer: typeCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].type,
      },
      {
        id: 'price',
        name: 'publictrades.column.price',
        renderer: priceCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].price,
      },
      {
        id: 'amount',
        name: 'publictrades.column.amount',
        renderer: amountCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].amount,
      },
      {
        id: 'pair',
        name: 'publictrades.column.pair',
        renderer: pairCellRenderer,
        tooltip: () => formatedCurrentPair,
      },
    ]

    let showContent
    if (loading) {
      showContent = (
        <Loading title='publictrades.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'publictrades.title' })}
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
            {intl.formatMessage({ id: 'publictrades.title' })}
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

PublicTrades.propTypes = propTypes
PublicTrades.defaultProps = defaultProps

export default injectIntl(PublicTrades)
