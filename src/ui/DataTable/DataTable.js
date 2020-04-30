import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Menu } from '@blueprintjs/core'
import {
  Column,
  CopyCellsMenuItem,
  Table,
} from '@blueprintjs/table'
import _keys from 'lodash/keys'

import CollapsedTable from 'ui/CollapsedTable/CollapsedTable'
import DEVICES from 'var/devices'

class DataTable extends PureComponent {
  selectedColumns = {}

  getCellData = (rowIndex, columnIndex) => {
    const { tableColumns } = this.props

    return tableColumns[columnIndex].copyText(rowIndex)
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
    const { tableColumns, t } = this.props

    navigator.clipboard.readText().then((text) => {
      const columnHeaders = []
      const selectedColumns = _keys(this.selectedColumns).sort()
      const start = +selectedColumns[0]
      const end = +selectedColumns[selectedColumns.length - 1]
      let cur = start

      while (cur <= end) {
        if (this.selectedColumns[cur]) {
          const columnName = t(tableColumns[cur].name)
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
    const { tableColumns } = this.props

    return tableColumns[col].copyText(row)
  }

  render() {
    const {
      className, numRows, t, tableColumns, device,
    } = this.props
    const columnWidths = tableColumns.map(column => column.width)

    if (device === DEVICES.PHONE && tableColumns.length > 2) {
      return <CollapsedTable numRows={numRows} tableColumns={tableColumns} />
    }

    return (
      <Table
        className={classNames('bitfinex-table', className)}
        numRows={numRows}
        enableRowHeader={false}
        columnWidths={columnWidths}
        onSelection={this.onSelection}
        getCellClipboardData={this.getCellClipboardData}
        onCopy={this.onCopy}
        bodyContextMenuRenderer={this.renderBodyContextMenu}
      >
        {tableColumns.map(column => (
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
  className: PropTypes.string,
  numRows: PropTypes.number.isRequired,
  tableColumns: PropTypes.arrayOf(TABLE_COLUMNS_PROPS).isRequired,
  device: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

DataTable.defaultProps = {
  className: '',
}

export default DataTable
