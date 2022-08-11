import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Menu } from '@blueprintjs/core'
import {
  Column,
  CopyCellsMenuItem,
  Table,
} from '@blueprintjs/table'
import _get from 'lodash/get'
import _keys from 'lodash/keys'
import _isEqual from 'lodash/isEqual'

import CollapsedTable from 'ui/CollapsedTable/CollapsedTable'
import DEVICES from 'var/devices'

const singleColumnSelectedCheck = context => _isEqual(
  _get(context, 'selectedRegions[0].cols[0]'),
  _get(context, 'selectedRegions[0].cols[1]'),
)

const columnHasNumericValueCheck = (context, columns) => {
  const columnIndex = _get(context, 'selectedRegions[0].cols[0]')
  return columns[columnIndex]?.isNumericValue ?? false
}

class DataTable extends PureComponent {
  state = {
    sumValue: null,
  }

  selectedColumns = {}

  getCellData = (rowIndex, columnIndex) => {
    const { tableColumns } = this.props

    // console.log('+++rowIndex', rowIndex)
    // console.log('+++columnIndex', columnIndex)

    return tableColumns[columnIndex].copyText(rowIndex)
  }

  getCellSum = (rowIndex, columnIndex) => {
    const { tableColumns } = this.props
    // const { sumValue } = this.state

    const { isNumericValue } = tableColumns[columnIndex]

    if (isNumericValue) {
      // console.log('+++isNumericValue', isNumericValue)
      // console.log('+++getCellSum', tableColumns[columnIndex]?.getSumValue(rowIndex))
      // console.log('+++getCellSum value', typeof tableColumns[columnIndex]?.getSumValue(rowIndex))

      const colValue = tableColumns[columnIndex]?.getSumValue(rowIndex) ?? null

      this.setState(state => ({
        sumValue: state.sumValue + colValue,
      }))

      return tableColumns[columnIndex]?.getSumValue(rowIndex) ?? null
    }

    return isNumericValue
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
        { shouldShowSum && (
          <CopyCellsMenuItem
            text={t('sum')}
            context={context}
            getCellData={this.getCellSum}
          />
        )
        }
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
    const { sumValue } = this.state
    console.log('++sumValue', sumValue)
    const {
      className, numRows, t, tableColumns, device, tableScroll,
    } = this.props
    const columnWidths = tableColumns.map(column => column.width)

    console.log('++Table props', this.props)

    console.log('++selectedColumns', this.selectedColumns)

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
  getSumValue: PropTypes.func,
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
  tableScroll: PropTypes.bool.isRequired,
}

DataTable.defaultProps = {
  className: '',
  section: undefined,
}

export default DataTable
