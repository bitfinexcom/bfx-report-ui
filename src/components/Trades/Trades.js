import React, { Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Card,
  Elevation,
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
import { checkFetch, formatTime, getCurrentEntries } from 'state/utils'

import { propTypes, defaultProps } from './Trades.props'

const COLUMN_WIDTHS = [85, 70, 125, 125, 125, 150]
const LIMIT = queryConstants.DEFAULT_TRADES_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_TRADES_PAGE_SIZE

class Trades extends PureComponent {
  constructor(props) {
    super(props)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  state = {
    offset: 0,
    pageLoading: false,
  }

  componentDidMount() {
    const { loading, fetchTrades } = this.props
    if (loading) {
      fetchTrades()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, 'trades')
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.offset !== prevState.offset) {
      return {
        offset: nextProps.offset,
        pageLoading: false,
      }
    }

    return {
      offset: nextProps.offset,
    }
  }

  fetchPrev() {
    this.setState({ pageLoading: true })
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchPrevTrades()
  }

  fetchNext() {
    this.setState({ pageLoading: true })
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNextTrades()
  }

  render() {
    const {
      offset,
      pageOffset,
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
    const numRows = filteredData.length

    const idCellRenderer = rowIndex => (
      <Cell wrapText={false}>
        {filteredData[rowIndex].id}
      </Cell>
    )

    const pairCellRenderer = rowIndex => (
      <Cell>
        {filteredData[rowIndex].pair}
      </Cell>
    )

    const amountCellRenderer = rowIndex => (
      <Cell className='bitfinex-text-align-right'>
        {filteredData[rowIndex].execAmount}
      </Cell>
    )

    const priceCellRenderer = rowIndex => (
      <Cell className='bitfinex-text-align-right'>
        {filteredData[rowIndex].execPrice}
      </Cell>
    )

    const feeCellRenderer = rowIndex => (
      <Cell className='bitfinex-text-align-right'>
        {filteredData[rowIndex].fee}
        &nbsp;
        <span className='bitfinex-show-soft'>
          {filteredData[rowIndex].feeCurrency}
        </span>
      </Cell>
    )

    const mtsCellRenderer = rowIndex => (
      <Cell>
        <TruncatedFormat>
          {formatTime(filteredData[rowIndex].mtsCreate)}
        </TruncatedFormat>
      </Cell>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='trades.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <NoData title='trades.title' />
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'trades.title' })}
            &nbsp;
            <Button icon='cloud-download' onClick={handleClickExport}>
              {intl.formatMessage({ id: 'timeframe.download' })}
            </Button>
          </h4>
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
          <Pagination
            type='trades'
            dataLen={entries.length}
            loading={pageLoading}
            offset={offset}
            jumpPage={jumpPage}
            prevClick={this.fetchPrev}
            nextClick={this.fetchNext}
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

Trades.propTypes = propTypes
Trades.defaultProps = defaultProps

export default injectIntl(Trades)
