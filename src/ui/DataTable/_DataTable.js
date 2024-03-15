import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react'
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
import { isEqual } from '@bitfinex/lib-js-util-base'

import {
  getRowsConfig,
  getCellNoData,
  DEFAULT_CONTAINER_WIDTH,
  getCalculatedColumnWidths,
  singleColumnSelectedCheck,
  columnHasNumericValueCheck,
} from 'utils/columns'
import DEVICES from 'var/devices'
import queryConstants from 'state/query/constants'
import CollapsedTable from 'ui/CollapsedTable/CollapsedTable'

const DataTable = ({
  t,
  device,
  numRows,
  section,
  isNoData,
  isLoading,
  className,
  tableScroll,
  tableColumns,
  showColumnsSum,
  defaultRowHeight,
}) => {
  const containerRef = useRef(null)
  const [sumValue, setSumValue] = useState(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [selectedColumns, setSelectedColumns] = useState({})

  useEffect(() => {
    if (!_isNull(sumValue)) {
      showColumnsSum(sumValue)
      setSumValue(null)
    }
  }, [sumValue])

  useEffect(() => {
    const onScreenSizeChanged = () => {
      setContainerWidth(containerRef?.current?.offsetWidth ?? DEFAULT_CONTAINER_WIDTH)
    }
    onScreenSizeChanged()
    window.addEventListener('resize', onScreenSizeChanged)

    return () => {
      window.removeEventListener('resize', onScreenSizeChanged)
    }
  }, [])

  const columnWidths = useMemo(
    () => getCalculatedColumnWidths(tableColumns, containerWidth),
    [tableColumns, containerWidth],
  )

  const getCellData = (rowIndex, columnIndex) => tableColumns[columnIndex].copyText(rowIndex)

  const renderBodyContextMenu = (context) => {
    const isSingleColumnSelected = singleColumnSelectedCheck(context)
    const hasNumericValue = columnHasNumericValueCheck(context, tableColumns)
    const shouldShowSum = isSingleColumnSelected && hasNumericValue
    let sum = 0

    const getCellSum = (rowIndex, columnIndex) => {
      const { isNumericValue } = tableColumns[columnIndex]

      if (isNumericValue) {
        const colValue = +tableColumns[columnIndex].copyText(rowIndex)
        sum += colValue
        setSumValue(sum)
      }
    }

    return (
      <Menu>
        <CopyCellsMenuItem
          text={t('copy')}
          context={context}
          getCellData={getCellData}
        />
        {shouldShowSum && (
          <CopyCellsMenuItem
            text={t('sum')}
            context={context}
            getCellData={getCellSum}
          />
        )}
      </Menu>
    )
  }

  const onSelection = (selection) => {
    const isWholeColumnSelected = selection.find(({ rows }) => !rows)

    if (!isWholeColumnSelected) {
      setSelectedColumns({})
      return
    }

    const selectedCols = selection.reduce((acc, sel) => {
      const { cols } = sel
      const [start, end] = cols

      let cur = start

      while (cur <= end) {
        acc[cur] = true
        cur += 1
      }

      return acc
    }, {})
    setSelectedColumns(selectedCols)
  }

  const onCopy = () => {
    navigator.clipboard.readText().then((text) => {
      const columnHeaders = []
      const selectedCols = _keys(selectedColumns).sort()
      const start = +selectedCols[0]
      const end = +selectedCols[selectedCols.length - 1]
      let cur = start

      while (cur <= end) {
        if (selectedColumns[cur]) {
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

  const getCellClipboardData = (row, col) => tableColumns[col].copyText(row)

  const columns = tableColumns
  if (isNoData && !isLoading) {
    const noDataTitle = isEqual(section, queryConstants.MENU_TICKERS)
      ? t('column.noHistory')
      : t('column.noResults')
    columns[0].renderer = () => getCellNoData(noDataTitle)
  }

  if (device === DEVICES.PHONE && columns.length >= 2) {
    return <CollapsedTable numRows={numRows} tableColumns={columns} />
  }

  return (
    <div
      ref={containerRef}
      className='data-table-container'
    >
      <Table
        onCopy={onCopy}
        enableRowHeader={false}
        onSelection={onSelection}
        columnWidths={columnWidths}
        defaultRowHeight={defaultRowHeight}
        getCellClipboardData={getCellClipboardData}
        bodyContextMenuRenderer={renderBodyContextMenu}
        numRows={getRowsConfig(isLoading, isNoData, numRows)}
        className={classNames('bitfinex-table', className, { 'bitfinex-table-full-height': !tableScroll })}
      >
        {columns.map(column => (
          <Column
            id={column.id}
            key={column.id}
            cellRenderer={column.renderer}
            className={column?.className ?? 'align-right'}
            name={column.nameStr ? column.nameStr : t(column.name)}
          />
        ))}
      </Table>
    </div>
  )
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
  showColumnsSum: PropTypes.func.isRequired,
  tableScroll: PropTypes.bool.isRequired,
  defaultRowHeight: PropTypes.number,
  isNoData: PropTypes.bool,
  isLoading: PropTypes.bool,
}

DataTable.defaultProps = {
  className: '',
  isNoData: false,
  isLoading: false,
  section: undefined,
  defaultRowHeight: 26,
}

export default DataTable
