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
import queryConstants from 'state/query/constants'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
  getSideMsg,
} from 'state/utils'

import { propTypes, defaultProps } from './FundingLoanHistory.props'

const COLUMN_WIDTHS = [80, 100, 80, 100, 150, 130, 80, 150, 150, 150]
const LIMIT = queryConstants.DEFAULT_FLOAN_QUERY_LIMIT
const PAGE_SIZE = queryConstants.DEFAULT_FLOAN_PAGE_SIZE
const TYPE = queryConstants.MENU_FLOAN

class FundingLoanHistory extends PureComponent {
  constructor(props) {
    super(props)
    this.fetchPrev = this.fetchPrev.bind(this)
    this.fetchNext = this.fetchNext.bind(this)
  }

  componentDidMount() {
    const { loading, fetchFloan } = this.props
    if (loading) {
      fetchFloan()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  fetchPrev() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchPrevFLoan()
  }

  fetchNext() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchNextFLoan()
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
      return (
        <Cell
          className='bitfinex-text-align-right'
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
      const mtsOpening = formatTime(filteredData[rowIndex].mtsOpening)
      return (
        <Cell tooltip={mtsOpening}>
          <TruncatedFormat>
            {mtsOpening}
          </TruncatedFormat>
        </Cell>
      )
    }

    const mtsLastPayoutCellRenderer = (rowIndex) => {
      const mtsLastPayout = formatTime(filteredData[rowIndex].mtsLastPayout)
      return (
        <Cell tooltip={mtsLastPayout}>
          <TruncatedFormat>
            {mtsLastPayout}
          </TruncatedFormat>
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
        <Loading title='floan.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <NoData title='floan.title' />
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'floan.title' })}
            &nbsp;
            <TimeRange />
            &nbsp;
            <ExportButton handleClickExport={handleClickExport} />
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
              name={intl.formatMessage({ id: 'floan.column.symbol' })}
              cellRenderer={symbolCellRenderer}
            />
            <Column
              id='side'
              name={intl.formatMessage({ id: 'floan.column.side' })}
              cellRenderer={sideCellRenderer}
            />
            <Column
              id='amount'
              name={intl.formatMessage({ id: 'floan.column.amount' })}
              cellRenderer={amountCellRenderer}
            />
            <Column
              id='status'
              name={intl.formatMessage({ id: 'floan.column.status' })}
              cellRenderer={statusCellRenderer}
            />
            <Column
              id='rate'
              name={intl.formatMessage({ id: 'floan.column.rate' })}
              cellRenderer={rateCellRenderer}
            />
            <Column
              id='period'
              name={intl.formatMessage({ id: 'floan.column.period' })}
              cellRenderer={periodCellRenderer}
            />
            <Column
              id='mtsOpening'
              name={intl.formatMessage({ id: 'floan.column.opening' })}
              cellRenderer={mtsOpeningCellRenderer}
            />
            <Column
              id='mtsLastPayout'
              name={intl.formatMessage({ id: 'floan.column.lastpayout' })}
              cellRenderer={mtsLastPayoutCellRenderer}
            />
            <Column
              id='mtsUpdate'
              name={intl.formatMessage({ id: 'floan.column.updated' })}
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

FundingLoanHistory.propTypes = propTypes
FundingLoanHistory.defaultProps = defaultProps

export default injectIntl(FundingLoanHistory)
