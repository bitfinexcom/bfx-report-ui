import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Menu } from '@blueprintjs/core'
import {
  Column,
  Table,
  CopyCellsMenuItem,
} from '@blueprintjs/table'
import _keys from 'lodash/keys'

class DataTable extends PureComponent {
  selectedColumns = {}

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

  onSelection = (selection) => {
    const isWholeColumnSelected = selection.find(({ rows }) => !rows)

    if (!isWholeColumnSelected) {
      this.selectedColumns = {}
      return
    }

    this.selectedColumns = selection.reduce((acc, sel) => {
      const { cols } = sel
      const [start, end] = cols

      let cur = start

      while (cur <= end) {
        acc[cur] = true
        cur += 1
      }

      return acc
    }, {})
  }

  onCopy = () => {
    const { tableColums, t } = this.props

    navigator.clipboard.readText().then((text) => {
      const columnHeaders = []
      const selectedColumns = _keys(this.selectedColumns).sort()
      const start = +selectedColumns[0]
      const end = +selectedColumns[selectedColumns.length - 1]
      let cur = start

      while (cur <= end) {
        if (this.selectedColumns[cur]) {
          const columnName = t(tableColums[cur].name)
          columnHeaders.push(columnName)
        } else {
          columnHeaders.push('')
        }

        cur += 1
      }

      navigator.clipboard.writeText(`${columnHeaders.join('\t')}\n${text}`)
    })
  }

  getCellClipboardData = (row, col) => {
    const { tableColums } = this.props

    return tableColums[col].copyText(row)
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
        onSelection={this.onSelection}
        getCellClipboardData={this.getCellClipboardData}
        onCopy={this.onCopy}
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
