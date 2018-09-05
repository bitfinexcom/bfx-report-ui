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
import TimeRange from 'components/TimeRange'
import queryConstants from 'state/query/constants'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
} from 'state/utils'

import { propTypes, defaultProps } from './FundingCreditHistory.props'

const COLUMN_WIDTHS = [80, 100, 200, 100, 100, 150]
const LIMIT = queryConstants.DEFAULT_FCREDIT_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_FCREDIT_PAGE_SIZE
const TYPE = queryConstants.MENU_FCREDIT

class FundingCreditHistory extends PureComponent {
  constructor(props) {
    super(props)
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
      offset,
      pageOffset,
      pageLoading,
      entries,
      handleClickExport,
      intl,
      jumpPage,
      loading,
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

    const statusCellRenderer = (rowIndex) => {
      const { status } = filteredData[rowIndex]
      return (
        <Cell tooltip={status}>
          {status}
        </Cell>
      )
    }

    const creditCellRenderer = (rowIndex) => {
      const { amount } = filteredData[rowIndex]
      const show = parseFloat(amount) > 0
      const showAmount = show ? amount : ''
      const tooltip = show ? amount : undefined
      return (
        <Cell
          className='bitfinex-green-text bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {showAmount}
        </Cell>
      )
    }

    const debitCellRenderer = (rowIndex) => {
      const { amount } = filteredData[rowIndex]
      const show = parseFloat(amount) < 0
      const showAmount = show ? Math.abs(amount) : ''
      const tooltip = show ? `${Math.abs(amount)}` : undefined
      return (
        <Cell
          className='bitfinex-red-text bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {showAmount}
        </Cell>
      )
    }

    const mtsUpdateCellRenderer = (rowIndex) => {
      const mtsUpdate = formatTime(filteredData[rowIndex].mtsUpdate)
      return (
        <Cell tooltip={mtsUpdate}>
          <TruncatedFormat>
            {mtsUpdate}
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

    let showContent
    if (loading) {
      showContent = (
        <Loading title='fcredit.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <NoData title='fcredit.title' />
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'fcredit.title' })}
            &nbsp;
            <TimeRange />
            &nbsp;
            <Button icon='cloud-download' onClick={handleClickExport}>
              {intl.formatMessage({ id: 'timeframe.download' })}
            </Button>
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
              id='symbol'
              name={intl.formatMessage({ id: 'fcredit.column.symbol' })}
              cellRenderer={symbolCellRenderer}
            />
            <Column
              id='status'
              name={intl.formatMessage({ id: 'fcredit.column.description' })}
              cellRenderer={statusCellRenderer}
            />
            <Column
              id='credit'
              name={intl.formatMessage({ id: 'fcredit.column.credit' })}
              cellRenderer={creditCellRenderer}
            />
            <Column
              id='debit'
              name={intl.formatMessage({ id: 'fcredit.column.debit' })}
              cellRenderer={debitCellRenderer}
            />
            <Column
              id='mtsUpdate'
              name={intl.formatMessage({ id: 'fcredit.column.updated' })}
              cellRenderer={mtsUpdateCellRenderer}
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

FundingCreditHistory.propTypes = propTypes
FundingCreditHistory.defaultProps = defaultProps

export default injectIntl(FundingCreditHistory)
