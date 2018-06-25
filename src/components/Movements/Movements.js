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
import { propTypes, defaultProps } from './Movements.props'

export const Movements = ({ entries, intl }) => {
  const numRows = entries.length
  const idCellRenderer = rowIndex => <Cell>{entries[rowIndex].id}</Cell>

  const mtsStartedCellRenderer = rowIndex => (
    <Cell>
      <TruncatedFormat>{new Date(entries[rowIndex].mtsStarted).toLocaleString()}</TruncatedFormat>
    </Cell>
  )

  const mtsUpdatedCellRenderer = rowIndex => (
    <Cell>
      <TruncatedFormat>{new Date(entries[rowIndex].mtsUpdated).toLocaleString()}</TruncatedFormat>
    </Cell>
  )

  const currencyCellRenderer = rowIndex => <Cell>{entries[rowIndex].currency}</Cell>

  const amountCellRenderer = rowIndex => <Cell>{entries[rowIndex].amount}</Cell>

  const statusCellRenderer = rowIndex => <Cell>{entries[rowIndex].status}</Cell>

  const destinationCellRenderer = rowIndex => <Cell>{entries[rowIndex].destinationAddress}</Cell>

  return (
    <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      <h5>Movements</h5>
      <Table className='bitfinex-table' numRows={numRows} enableRowHeader={false}>
        <Column id='id' name='#' cellRenderer={idCellRenderer} />
        <Column id='mtsstarted' name={intl.formatMessage({ id: 'movements.column.started' })} cellRenderer={mtsStartedCellRenderer} />
        <Column id='mtsstarted' name={intl.formatMessage({ id: 'movements.column.updated' })} cellRenderer={mtsUpdatedCellRenderer} />
        <Column id='currency' name={intl.formatMessage({ id: 'movements.column.currency' })} cellRenderer={currencyCellRenderer} />
        <Column id='amount' name={intl.formatMessage({ id: 'movements.column.amount' })} cellRenderer={amountCellRenderer} />
        <Column id='status' name={intl.formatMessage({ id: 'movements.column.status' })} cellRenderer={statusCellRenderer} />
        <Column id='destination' name={intl.formatMessage({ id: 'movements.column.destination' })} cellRenderer={destinationCellRenderer} />
      </Table>
    </Card>
  )
}

Movements.propTypes = propTypes
Movements.defaultProps = defaultProps

export default injectIntl(Movements)
