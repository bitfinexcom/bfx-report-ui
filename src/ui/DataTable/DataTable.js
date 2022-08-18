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
import _isNull from 'lodash/isNull'

import {
  singleColumnSelectedCheck,
  columnHasNumericValueCheck,
} from 'utils/columns'
import DEVICES from 'var/devices'
import CollapsedTable from 'ui/CollapsedTable/CollapsedTable'

class DataTable extends PureComponent {
  state = {
    sumValue: null,
  }

  selectedColumns = {}

  componentDidUpdate() {
    const { showColumnsSum } = this.props
    const { sumValue } = this.state

    if (!_isNull(sumValue)) {
      showColumnsSum(sumValue)
      this.clearSumValue()
    }
  }

  getCellData = (rowIndex, columnIndex) => {
    const { tableColumns } = this.props

    return tableColumns[columnIndex].copyText(rowIndex)
  }

  getCellSum = (rowIndex, columnIndex) => {
    const { tableColumns } = this.props
    const { isNumericValue } = tableColumns[columnIndex]

    if (isNumericValue) {
      const colValue = +tableColumns[columnIndex].copyText(rowIndex)
      this.setState(state => ({
        sumValue: state.sumValue + colValue,
      }))
    }
  }

  clearSumValue = () => {
    this.setState({ sumValue: null })
  }

  renderBodyContextMenu = (context) => {
    const { t, tableColumns } = this.props
    const isSingleColumnSelected = singleColumnSelectedCheck(context)
    const hasNumericValue = columnHasNumericValueCheck(context, tableColumns)
    const shouldShowSum = isSingleColumnSelected && hasNumericValue

    return (
      <Menu>
        <CopyCellsMenuItem
          text={t('copy')}
          context={context}
          getCellData={this.getCellData}
        />
        {shouldShowSum && (
          <CopyCellsMenuItem
            text={t('sum')}
            context={context}
            getCellData={this.getCellSum}
          />
        )}
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

      const newLineChar = columnHeaders.length > 0
        ? '\n'
        : ''
      const headersText = `${columnHeaders.join('\t')}${newLineChar}`

      navigator.clipboard.writeText(`${headersText}${text}`).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err)
      })
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
  }

  getCellClipboardData = (row, col) => {
    const { tableColumns } = this.props

    return tableColumns[col].copyText(row)
  }

  onColumnWidthChanged = (index, width) => {
    const { section, tableColumns, setColumnsWidth } = this.props

    if (section) {
      const updatedColumn = {
        ...tableColumns[index],
        width,
      }
      tableColumns[index] = updatedColumn
      setColumnsWidth({ section, tableColumns })
    }
  }

  render() {
    const {
      className, numRows, t, tableColumns, device, tableScroll,
    } = this.props
    const columnWidths = tableColumns.map(column => column.width)

    if (device === DEVICES.PHONE && tableColumns.length > 2) {
      return <CollapsedTable numRows={numRows} tableColumns={tableColumns} />
    }

    return (
      <Table
        className={classNames('bitfinex-table', className, { 'bitfinex-table-full-height': !tableScroll })}
        numRows={numRows}
        enableRowHeader={false}
        columnWidths={columnWidths}
        onSelection={this.onSelection}
        onColumnWidthChanged={this.onColumnWidthChanged}
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
  width: PropTypes.number,
  isNumericValue: PropTypes.bool,
})

DataTable.propTypes = {
  className: PropTypes.string,
  section: PropTypes.string,
  numRows: PropTypes.number.isRequired,
  tableColumns: PropTypes.arrayOf(TABLE_COLUMNS_PROPS).isRequired,
  device: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  setColumnsWidth: PropTypes.func.isRequired,
  showColumnsSum: PropTypes.func.isRequired,
  tableScroll: PropTypes.bool.isRequired,
}

DataTable.defaultProps = {
  className: '',
  section: undefined,
}

export default DataTable
