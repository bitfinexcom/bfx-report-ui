import React from 'react';
import PropTypes from 'prop-types'
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

export const Orders = props => {
  const numRows = props.entries.length
  const idCellRenderer = (rowIndex) => {
    return <Cell>{props.entries[rowIndex].id}</Cell>
  }

  const symbolCellRenderer = (rowIndex) => {
    return <Cell>{props.entries[rowIndex].symbol}</Cell>
  }

  const typeCellRenderer = (rowIndex) => {
    return <Cell>{props.entries[rowIndex].type}</Cell>
  }

  const priceCellRenderer = (rowIndex) => {
    return <Cell>{props.entries[rowIndex].price}</Cell>
  }

  const priceAvgCellRenderer = (rowIndex) => {
    return <Cell>{props.entries[rowIndex].priceAvg}</Cell>
  }

  const mtsUpdateCellRenderer = (rowIndex) => {
    return <Cell><TruncatedFormat>{new Date(props.entries[rowIndex].mtsUpdate).toLocaleString()}</TruncatedFormat></Cell>
  };

  const statusCellRenderer = (rowIndex) => {
    return <Cell>{props.entries[rowIndex].status}</Cell>
  }

  return(
    <Card interactive={true} elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      <h5>Orders</h5>
      <Table numRows={numRows}>
        <Column id="id" name="#" cellRenderer={idCellRenderer}/>
        <Column id="symbol" name="Symbol" cellRenderer={symbolCellRenderer}/>
        <Column id="type" name="Type" cellRenderer={typeCellRenderer}/>
        <Column id="price" name="Price" cellRenderer={priceCellRenderer}/>
        <Column id="priceAvg" name="Avg price" cellRenderer={priceAvgCellRenderer} />
        <Column id="mtsUpdate" name="Update" cellRenderer={mtsUpdateCellRenderer}/>
        <Column id="status" name="Status" cellRenderer={statusCellRenderer}/>
      </Table>
    </Card>
  )
}

Orders.propTypes = {
  entries: PropTypes.array.isRequired,
}

export default Orders;
