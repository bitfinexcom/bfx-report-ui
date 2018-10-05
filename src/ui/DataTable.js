import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Column,
  Table,
} from '@blueprintjs/table'

class DataTable extends PureComponent {
  render() {
    const {
      intl,
      numRows,
      columnWidths,
      tableColums,
    } = this.props
    return (
      <Table
        className='bitfinex-table'
        numRows={numRows}
        enableRowHeader={false}
        columnWidths={columnWidths}
        enableFocusedCell
        getCellClipboardData={(row, col) => navigator.clipboard.writeText(tableColums[col].tooltip(row))}
      >
        {tableColums.map(column => (
          <Column
            key={column.id}
            id={column.id}
            name={intl.formatMessage({ id: column.name })}
            cellRenderer={column.renderer}
          />
        ))}
      </Table>
    )
  }
}

export default injectIntl(DataTable)
