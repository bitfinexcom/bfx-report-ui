import React from 'react'
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
import { formatTime } from 'state/utils'
import { propTypes, defaultProps } from './Ledgers.props'

export const Ledgers = ({ entries, intl }) => {
  const numRows = entries.length
  const idCellRenderer = rowIndex => <Cell>{entries[rowIndex].id}</Cell>

  const mtsCellRenderer = rowIndex => (
    <Cell>
      <TruncatedFormat>{formatTime(entries[rowIndex].mts)}</TruncatedFormat>
    </Cell>
  )

  const currencyCellRenderer = rowIndex => <Cell>{entries[rowIndex].currency}</Cell>

  const amountCellRenderer = rowIndex => <Cell>{entries[rowIndex].amount}</Cell>

  const balanceCellRenderer = rowIndex => <Cell>{entries[rowIndex].balance}</Cell>

  // TODO: show description message

  return (
    <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      <h5>{intl.formatMessage({ id: 'ledgers.title' })} <Button icon='cloud-download' disabled>{intl.formatMessage({ id: 'timeframe.download' })}</Button></h5>
      <Table className='bitfinex-table' numRows={numRows} enableRowHeader={false}>
        <Column id='id' name='#' cellRenderer={idCellRenderer} />
        <Column id='mts' name={intl.formatMessage({ id: 'ledgers.column.time' })} cellRenderer={mtsCellRenderer} />
        <Column id='currency' name={intl.formatMessage({ id: 'ledgers.column.currency' })} cellRenderer={currencyCellRenderer} />
        <Column id='amount' name={intl.formatMessage({ id: 'ledgers.column.amount' })} cellRenderer={amountCellRenderer} />
        <Column id='balance' name={intl.formatMessage({ id: 'ledgers.column.balance' })} cellRenderer={balanceCellRenderer} />
      </Table>
    </Card>
  )
}

Ledgers.propTypes = propTypes
Ledgers.defaultProps = defaultProps

export default injectIntl(Ledgers)
