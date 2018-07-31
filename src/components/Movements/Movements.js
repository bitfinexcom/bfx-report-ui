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
import { propTypes, defaultProps } from './Movements.props'
import Inspector from './Inspector'

// const TYPE_DEPOSITS = 'deposits'
const TYPE_WITHDRAWALS = 'withdrawals'
const COLUMN_WIDTHS = [80, 150, 125, 120, 400]
const LIMIT = queryConstants.DEFAULT_MOVEMENTS_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_MOVEMENTS_PAGE_SIZE

class Movements extends PureComponent {
  constructor(props) {
    super(props)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchMovements()
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, 'movements')
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
      offset,
      pageOffset,
      entries,
      intl,
      jumpPage,
      type,
      loading,
    } = this.props
    const currentEntries = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const filteredData = currentEntries.filter(entry => (type === TYPE_WITHDRAWALS
      ? parseFloat(entry.amount) < 0 : parseFloat(entry.amount) > 0))
    const numRows = filteredData.length

    const idCellRenderer = rowIndex => (
      <Cell>
        {filteredData[rowIndex].id}
      </Cell>
    )

    const mtsUpdatedCellRenderer = rowIndex => (
      <Cell>
        <TruncatedFormat>
          {formatTime(filteredData[rowIndex].mtsUpdated)}
        </TruncatedFormat>
      </Cell>
    )

    const amountCellRenderer = rowIndex => (
      <Cell className='bitfinex-text-align-right'>
        {filteredData[rowIndex].amount}
        &nbsp;
        <span className='bitfinex-show-soft'>
          {filteredData[rowIndex].currency}
        </span>
      </Cell>
    )

    const statusCellRenderer = rowIndex => (
      <Cell>
        {filteredData[rowIndex].status}
      </Cell>
    )

    const destinationCellRenderer = (rowIndex) => {
      const entry = filteredData[rowIndex]
      return (
        <Cell>
          {entry.destinationAddress}
          &nbsp;
          <Inspector currency={entry.currency} destinationAddress={entry.destinationAddress} />
        </Cell>
      )
    }

    const titleMsgId = type === TYPE_WITHDRAWALS
      ? 'movements.withdrawals.title' : 'movements.deposits.title'
    let showContent
    if (loading) {
      showContent = (
        <Loading title={titleMsgId} />
      )
    } else if (numRows === 0) {
      showContent = (
        <NoData title={titleMsgId} />
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: titleMsgId })}
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
              id='mtsupdated'
              name={intl.formatMessage({ id: 'movements.column.updated' })}
              cellRenderer={mtsUpdatedCellRenderer}
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
          <Pagination
            type='movements'
            dataLen={entries.length}
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

Movements.propTypes = propTypes
Movements.defaultProps = defaultProps

export default injectIntl(Movements)
