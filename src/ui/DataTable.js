import React, { PureComponent } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
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

const TABLE_COLUMNS_PROPS = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  renderer: PropTypes.func.isRequired,
  tooltip: PropTypes.func.isRequired,
})

DataTable.propTypes = {
  intl: intlShape.isRequired,
  numRows: PropTypes.number.isRequired,
  columnWidths: PropTypes.arrayOf(PropTypes.number).isRequired,
  tableColums: PropTypes.arrayOf(TABLE_COLUMNS_PROPS).isRequired,
}

DataTable.defaultProps = {}


export default injectIntl(DataTable)
