import React from 'react'
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
import { propTypes, defaultProps } from './Trades.props'

export const Trades = ({ entries, intl }) => {
  const numRows = entries.length
  const idCellRenderer = rowIndex => <Cell>{entries[rowIndex].id}</Cell>

  const mtsCellRenderer = rowIndex => (
    <Cell>
      <TruncatedFormat>{new Date(entries[rowIndex].mts).toLocaleString()}</TruncatedFormat>
    </Cell>
  )

  const amountCellRenderer = rowIndex => <Cell>{entries[rowIndex].amount}</Cell>

  const priceCellRenderer = rowIndex => <Cell>{entries[rowIndex].price}</Cell>

  return (
    <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      <h5>Trades</h5>
      <Table className='bitfinex-table' numRows={numRows} enableRowHeader={false}>
        <Column id='id' name='#' cellRenderer={idCellRenderer} />
        <Column id='mts' name={intl.formatMessage({ id: 'trades.column.time' })} cellRenderer={mtsCellRenderer} />
        <Column id='amount' name={intl.formatMessage({ id: 'trades.column.amount' })} cellRenderer={amountCellRenderer} />
        <Column id='price' name={intl.formatMessage({ id: 'trades.column.price' })} cellRenderer={priceCellRenderer} />
      </Table>
    </Card>
  )
}

Trades.propTypes = propTypes
Trades.defaultProps = defaultProps

export default injectIntl(Trades)
