import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Menu } from '@blueprintjs/core'
import {
  Column,
  Table,
  CopyCellsMenuItem,
} from '@blueprintjs/table'

class DataTable extends PureComponent {
  getCellData = (rowIndex, columnIndex) => {
    const { tableColums } = this.props

    return tableColums[columnIndex].copyText(rowIndex)
  }

  renderBodyContextMenu = (context) => {
    const { t } = this.props

    return (
      <Menu>
        <CopyCellsMenuItem context={context} getCellData={this.getCellData} text={t('copy')} />
      </Menu>
    )
  }

  render() {
    const {
      numRows,
      t,
      tableColums,
    } = this.props
    const columnWidths = tableColums.map(column => column.width)

    return (
      <Table
        className='bitfinex-table'
        numRows={numRows}
        enableRowHeader={false}
        columnWidths={columnWidths}
        enableFocusedCell
        getCellClipboardData={(row, col) => navigator.clipboard.writeText(tableColums[col].copyText(row))}
        bodyContextMenuRenderer={this.renderBodyContextMenu}
      >
        {tableColums.map(column => (
          <Column
            key={column.id}
            id={column.id}
            name={column.nameStr ? column.nameStr : t(column.name)}
            cellRenderer={column.renderer}
          />
        ))}
      </Table>
    )
  }
}

const TABLE_COLUMNS_PROPS = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  nameStr: PropTypes.string,
  renderer: PropTypes.func.isRequired,
  copyText: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
})

DataTable.propTypes = {
  numRows: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  tableColums: PropTypes.arrayOf(TABLE_COLUMNS_PROPS).isRequired,
}

DataTable.defaultProps = {}

export default withTranslation('translations')(DataTable)
