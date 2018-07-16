import React, { Fragment } from 'react'
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
import { formatTime } from 'state/utils'
import { propTypes, defaultProps } from './Trades.props'

export const Trades = ({ entries, intl, loading }) => {
  const numRows = entries.length

  const idCellRenderer = rowIndex => (
    <Cell wrapText={false}>
      {entries[rowIndex].id}
    </Cell>
  )

  const pairCellRenderer = rowIndex => (
    <Cell>
      {entries[rowIndex].pair}
    </Cell>
  )

  const amountCellRenderer = rowIndex => (
    <Cell>
      {entries[rowIndex].amount}
    </Cell>
  )

  const priceCellRenderer = rowIndex => (
    <Cell>
      {entries[rowIndex].price}
    </Cell>
  )

  const feeCellRenderer = rowIndex => (
    <Cell>
      {entries[rowIndex].fee}
      &nbsp;
      <span className='bitfinex-show-soft'>
        {entries[rowIndex].feeCurrency}
      </span>
    </Cell>
  )

  const mtsCellRenderer = rowIndex => (
    <Cell>
      <TruncatedFormat>
        {formatTime(entries[rowIndex].mts)}
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
        <Table className='bitfinex-table' numRows={numRows} enableRowHeader={false}>
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
      </Fragment>
    )
  }

  return (
    <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      {showContent}
    </Card>
  )
}

Trades.propTypes = propTypes
Trades.defaultProps = defaultProps

export default injectIntl(Trades)
