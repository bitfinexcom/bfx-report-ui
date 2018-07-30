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
import { checkFetch, formatTime } from 'state/utils'
import { propTypes, defaultProps } from './Trades.props'

const COLUMN_WIDTHS = [80, 70, 125, 125, 125, 150]
const LIMIT = queryConstants.DEFAULT_TRADES_QUERY_LIMIT

class Trades extends PureComponent {
  constructor(props) {
    super(props)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchTrades()
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, 'trades')
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
      offset,
      entries,
      intl,
      loading,
    } = this.props
    const filteredData = offset < LIMIT ? entries : entries.slice(offset - LIMIT, offset)
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
      <Cell>
        {filteredData[rowIndex].execAmount}
      </Cell>
    )

    const priceCellRenderer = rowIndex => (
      <Cell>
        {filteredData[rowIndex].execPrice}
      </Cell>
    )

    const feeCellRenderer = rowIndex => (
      <Cell>
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
            <Button icon='cloud-download' disabled>
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
            prevClick={this.fetchPrev}
            prevCondition={offset <= LIMIT}
            nextClick={this.fetchNext}
            nextCondition={entries.length % LIMIT !== 0 && entries.length - LIMIT < offset}
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
