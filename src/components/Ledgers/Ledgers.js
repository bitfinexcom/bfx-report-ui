import React, { PureComponent, Fragment } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Card,
  Elevation,
  Intent,
} from '@blueprintjs/core'
import {
  Cell,
  Column,
  Table,
  TruncatedFormat,
} from '@blueprintjs/table'

import Loading from 'components/Loading'
import NoData from 'components/NoData'
import Pagination from 'components/Pagination'
import queryConstants from 'state/query/constants'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
  getPageLoadingState,
} from 'state/utils'

import { propTypes, defaultProps } from './Ledgers.props'

const COLUMN_WIDTHS = [500, 120, 120, 120, 150]
const LIMIT = queryConstants.DEFAULT_LEDGERS_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_LEDGERS_PAGE_SIZE
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

  state = {
    offset: 0,
    pageLoading: false,
  }

  componentDidMount() {
    const { loading, fetchLedgers } = this.props
    if (loading) {
      fetchLedgers()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, 'ledgers')
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getPageLoadingState(nextProps.offset, prevState.offset)
  }

  handleClick(symbol) {
    if (!this.handlers[symbol]) {
      this.handlers[symbol] = () => {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setCurrentSymbol(symbol === ALL ? '' : symbol)
      }
    }
    return this.handlers[symbol]
  }

  fetchPrev() {
    this.setState({ pageLoading: true })
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchPrevLedgers()
  }

  fetchNext() {
    this.setState({ pageLoading: true })
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNextLedgers()
  }

  render() {
    const {
      offset,
      pageOffset,
      currencies,
      currentSymbol,
      entries,
      handleClickExport,
      intl,
      jumpPage,
      loading,
    } = this.props
    const {
      pageLoading,
    } = this.state
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const currencyList = [ALL, ...currencies]
    // eslint-disable-next-line react/destructuring-assignment
    const currentCurrency = currentSymbol || currencyList[0]
    const numRows = filteredData.length

    const descriptionCellRenderer = rowIndex => (
      <Cell>
        {filteredData[rowIndex].description}
      </Cell>
    )

    const mtsCellRenderer = rowIndex => (
      <Cell>
        <TruncatedFormat>
          {formatTime(filteredData[rowIndex].mts)}
        </TruncatedFormat>
      </Cell>
    )

    const creditCellRenderer = (rowIndex) => {
      const show = parseFloat(filteredData[rowIndex].amount) > 0
      const showAmount = show ? filteredData[rowIndex].amount : ''
      // eslint-disable-next-line react/destructuring-assignment
      const showCurrency = show && WILD_CARD.includes(currentSymbol) ? (
        <Fragment>
          &nbsp;
          <span className='bitfinex-show-soft'>
            {filteredData[rowIndex].currency}
          </span>
        </Fragment>
      ) : ''
      return (
        <Cell className='bitfinex-green-text bitfinex-text-align-right'>
          {showAmount}
          {showCurrency}
        </Cell>
      )
    }

    const debitCellRenderer = (rowIndex) => {
      const show = parseFloat(filteredData[rowIndex].amount) < 0
      const showAmount = show ? Math.abs(filteredData[rowIndex].amount) : ''
      // eslint-disable-next-line react/destructuring-assignment
      const showCurrency = show && WILD_CARD.includes(currentSymbol) ? (
        <Fragment>
          &nbsp;
          <span className='bitfinex-show-soft'>
            {filteredData[rowIndex].currency}
          </span>
        </Fragment>
      ) : ''
      return (
        <Cell className='bitfinex-red-text bitfinex-text-align-right'>
          {showAmount}
          {showCurrency}
        </Cell>
      )
    }

    const balanceCellRenderer = rowIndex => (
      <Cell className='bitfinex-text-align-right'>
        {filteredData[rowIndex].balance}
      </Cell>
    )

    const currencyButtons = currencyList.map(symbol => (
      <Button
        key={symbol}
        intent={currentCurrency === symbol ? Intent.PRIMARY : Intent.NONE}
        onClick={this.handleClick(symbol)}
      >
        {symbol}
      </Button>))

    let showContent
    if (loading) {
      showContent = (
        <Loading title='ledgers.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <NoData title='ledgers.title' />
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'ledgers.title' })}
            &nbsp;
            <Button icon='cloud-download' onClick={handleClickExport}>
              {intl.formatMessage({ id: 'timeframe.download' })}
            </Button>
          </h4>
          <div className='bitfinex-symbol-group'>
            {currencyButtons}
          </div>
          <Table
            className='bitfinex-table'
            numRows={numRows}
            enableRowHeader={false}
            columnWidths={COLUMN_WIDTHS}
          >
            <Column
              id='description'
              name={intl.formatMessage({ id: 'ledgers.column.description' })}
              cellRenderer={descriptionCellRenderer}
            />
            <Column
              id='credit'
              name={intl.formatMessage({ id: 'ledgers.column.credit' })}
              cellRenderer={creditCellRenderer}
            />
            <Column
              id='debit'
              name={intl.formatMessage({ id: 'ledgers.column.debit' })}
              cellRenderer={debitCellRenderer}
            />
            <Column
              id='balance'
              name={intl.formatMessage({ id: 'ledgers.column.balance' })}
              cellRenderer={balanceCellRenderer}
            />
            <Column
              id='mts'
              name={intl.formatMessage({ id: 'ledgers.column.time' })}
              cellRenderer={mtsCellRenderer}
            />
          </Table>
          <Pagination
            type='ledgers'
            dataLen={entries.length}
            loading={pageLoading}
            offset={offset}
            jumpPage={jumpPage}
            nextClick={this.fetchNext}
            prevClick={this.fetchPrev}
            pageOffset={pageOffset}
          />
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
