import React from 'react'
import PropTypes from 'prop-types'
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

export const Orders = ({ entries, intl }) => {
  const numRows = entries.length
  const idCellRenderer = rowIndex => <Cell>{entries[rowIndex].id}</Cell>

  const symbolCellRenderer = rowIndex => <Cell>{entries[rowIndex].symbol}</Cell>

  const typeCellRenderer = rowIndex => <Cell>{entries[rowIndex].type}</Cell>

  const priceCellRenderer = rowIndex => <Cell>{entries[rowIndex].price}</Cell>

  const priceAvgCellRenderer = rowIndex => <Cell>{entries[rowIndex].priceAvg}</Cell>

  const mtsUpdateCellRenderer = rowIndex => (
    <Cell>
      <TruncatedFormat>{new Date(entries[rowIndex].mtsUpdate).toLocaleString()}</TruncatedFormat>
    </Cell>
  )

  const statusCellRenderer = rowIndex => <Cell>{entries[rowIndex].status}</Cell>

  return (
    <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      <h5>Orders</h5>
      <Table className='bitfinex-table' numRows={numRows} enableRowHeader={false}>
        <Column id='id' name='#' cellRenderer={idCellRenderer} />
        <Column id='symbol' name={intl.formatMessage({ id: 'orders.column.symbol' })} cellRenderer={symbolCellRenderer} />
        <Column id='type' name={intl.formatMessage({ id: 'orders.column.type' })} cellRenderer={typeCellRenderer} />
        <Column id='price' name={intl.formatMessage({ id: 'orders.column.price' })} cellRenderer={priceCellRenderer} />
        <Column id='priceAvg' name={intl.formatMessage({ id: 'orders.column.avgprice' })} cellRenderer={priceAvgCellRenderer} />
        <Column id='mtsUpdate' name={intl.formatMessage({ id: 'orders.column.update' })} cellRenderer={mtsUpdateCellRenderer} />
        <Column id='status' name={intl.formatMessage({ id: 'orders.column.status' })} cellRenderer={statusCellRenderer} />
      </Table>
    </Card>
  )
}

Orders.propTypes = {
  entries: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
}

export default injectIntl(Orders)
