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
import { propTypes, defaultProps } from './Movements.props'

export const Movements = ({ entries, intl, type }) => {
  const filteredData = entries.filter(entry => (type === 'withdrawals' ? parseFloat(entry.amount) < 0 : parseFloat(entry.amount) > 0))
  const titleMsgId = type === 'withdrawals' ? 'movements.withdrawals.title' : 'movements.deposits.title'
  const numRows = filteredData.length
  const idCellRenderer = rowIndex => <Cell>{filteredData[rowIndex].id}</Cell>

  const mtsUpdatedCellRenderer = rowIndex => (
    <Cell>
      <TruncatedFormat>{formatTime(filteredData[rowIndex].mtsUpdated)}</TruncatedFormat>
    </Cell>
  )

  const amountCellRenderer = rowIndex => <Cell>{`${parseFloat(filteredData[rowIndex].amount) < 0 ? parseFloat(filteredData[rowIndex].amount) * -1 : filteredData[rowIndex].amount} ${filteredData[rowIndex].currency}`}</Cell>

  const statusCellRenderer = rowIndex => <Cell>{filteredData[rowIndex].status}</Cell>

  const destinationCellRenderer = rowIndex => <Cell>{filteredData[rowIndex].destinationAddress}</Cell>

  return (
    <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      <h2>{intl.formatMessage({ id: titleMsgId })} <Button icon='cloud-download' disabled>{intl.formatMessage({ id: 'timeframe.download' })}</Button></h2>
      <Table className='bitfinex-table' numRows={numRows} enableRowHeader={false} columnWidths={[90, 150, 125, 120, 400]}>
        <Column id='id' name='#' cellRenderer={idCellRenderer} />
        <Column id='mtsupdated' name={intl.formatMessage({ id: 'movements.column.updated' })} cellRenderer={mtsUpdatedCellRenderer} />
        <Column id='status' name={intl.formatMessage({ id: 'movements.column.status' })} cellRenderer={statusCellRenderer} />
        <Column id='amount' name={intl.formatMessage({ id: 'movements.column.amount' })} cellRenderer={amountCellRenderer} />
        <Column id='destination' name={intl.formatMessage({ id: 'movements.column.destination' })} cellRenderer={destinationCellRenderer} />
      </Table>
    </Card>
  )
}

Movements.propTypes = propTypes
Movements.defaultProps = defaultProps

export default injectIntl(Movements)
