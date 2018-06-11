import React from 'react'
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

export const Ledgers = props => {
  const numRows = props.entries.length
  const idCellRenderer = (rowIndex) => {
    return <Cell>{props.entries[rowIndex].id}</Cell>
  }

  const mtsCellRenderer = (rowIndex) => {
    return <Cell><TruncatedFormat>{new Date(props.entries[rowIndex].timestampMilli).toLocaleString()}</TruncatedFormat></Cell>
  };

  const currencyCellRenderer = (rowIndex) => {
    return <Cell>{props.entries[rowIndex].currency}</Cell>
  }

  const amountCellRenderer = (rowIndex) => {
    return <Cell>{props.entries[rowIndex].amount}</Cell>
  };

  const balanceCellRenderer = (rowIndex) => {
    return <Cell>{props.entries[rowIndex].balance}</Cell>
  };

  // TODO: show description message

return (
  <Card interactive={true} elevation={Elevation.ZERO} className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
      <h5>Ledgers</h5>
      <Table numRows={numRows}>
        <Column id="id" name="#" cellRenderer={idCellRenderer}/>
        <Column id="mts" name="Time" cellRenderer={mtsCellRenderer}/>
        <Column id="currency" name="Currency" cellRenderer={currencyCellRenderer}/>
        <Column id="amount" name="Amount" cellRenderer={amountCellRenderer} />
        <Column id="balance" name="Balance" cellRenderer={balanceCellRenderer}/>
      </Table>
  </Card>
  )
}

Ledgers.propTypes = {
  entries: PropTypes.array.isRequired,
}

export default Ledgers
