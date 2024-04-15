import React, {
  memo,
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Menu, MenuItem } from '@blueprintjs/core'
import {
  Column,
  ColumnHeaderCell,
  CopyCellsMenuItem,
  Table,
} from '@blueprintjs/table'
import _keys from 'lodash/keys'
import _isNull from 'lodash/isNull'
import { isEqual, isEmpty } from '@bitfinex/lib-js-util-base'

import {
  getRowsConfig,
  getCellNoData,
  DEFAULT_CONTAINER_WIDTH,
  getCalculatedColumnWidths,
  singleColumnSelectedCheck,
  columnHasNumericValueCheck,
} from 'utils/columns'
import DEVICES from 'var/devices'
import { getDevice } from 'state/ui/selectors'
import queryConstants from 'state/query/constants'
import { getTableScroll } from 'state/base/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import { updateErrorStatus } from 'state/status/actions'
import CollapsedTable from 'ui/CollapsedTable/CollapsedTable'
import { showColumnsSum, setColumnsWidth } from 'state/columns/actions'

const DataTable = ({
  numRows,
  section,
  isNoData,
  isLoading,
  className,
  tableColumns,
  defaultRowHeight,
  enableColumnResizing,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const containerRef = useRef(null)
  const device = useSelector(getDevice)
  const tableScroll = useSelector(getTableScroll)
  const [sumValue, setSumValue] = useState(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [selectedColumns, setSelectedColumns] = useState({})
  const [useCustomColsWidth, setUseCustomColsWidth] = useState(false)
  const customColsWidths = useSelector((state) => getColumnsWidth(state, section))

  useEffect(() => {
    if (!isEmpty(customColsWidths)) {
      setUseCustomColsWidth(true)
    }
  }, [dispatch, customColsWidths])

  useEffect(() => {
    if (!_isNull(sumValue)) {
      dispatch(showColumnsSum(sumValue))
      setSumValue(null)
    }
  }, [dispatch, sumValue])

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

  const getCellData = (rowIndex, columnIndex) => tableColumns[columnIndex]?.copyText(rowIndex)

  const columnHeaderCellRenderer = (name) => {
    const columnWidthReset = () => {
      setUseCustomColsWidth(false)
      dispatch(setColumnsWidth({ section }))
    }

    const menuRenderer = () => (
      <Menu>
        <MenuItem
          onClick={columnWidthReset}
          text={t('column.defaultWidth')}
        />
      </Menu>
    )

    return <ColumnHeaderCell name={name} menuRenderer={menuRenderer} />
  }

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

    const columnWidthReset = () => {
      setUseCustomColsWidth(false)
      dispatch(setColumnsWidth({ section }))
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
        {enableColumnResizing && (
          <CopyCellsMenuItem
            context={context}
            getCellData={columnWidthReset}
            text={t('column.defaultWidth')}
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
        dispatch(updateErrorStatus(err))
      })
    }).catch((err) => {
      dispatch(updateErrorStatus(err))
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

  const calculatedColsWidths = useMemo(
    () => getCalculatedColumnWidths(columns, containerWidth),
    [columns, containerWidth],
  )

  const onColumnWidthChanged = (colIndex, width) => {
    calculatedColsWidths[colIndex] = width
    if (!section) return
    if (useCustomColsWidth) {
      const updatedColumn = {
        ...columns[colIndex],
        width,
      }
      columns[colIndex] = updatedColumn
      dispatch(setColumnsWidth({ section, columns }))
    } else {
      const updatedColumns = calculatedColsWidths.map((value, index) => ({
        ...columns[index],
        width: value,
      }))
      dispatch(setColumnsWidth({ section, columns: updatedColumns }))
    }
  }

  if (device === DEVICES.PHONE && columns.length >= 2) {
    return <CollapsedTable numRows={numRows} tableColumns={columns} />
  }

  const columnWidths = useCustomColsWidth
    ? columns.map(column => column.width)
    : calculatedColsWidths

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
        enableColumnResizing={enableColumnResizing}
        getCellClipboardData={getCellClipboardData}
        onColumnWidthChanged={onColumnWidthChanged}
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
            columnHeaderCellRenderer={() => columnHeaderCellRenderer(column.name)}
          />
        ))}
      </Table>
    </div>
  )
}

DataTable.propTypes = {
  className: PropTypes.string,
  section: PropTypes.string,
  numRows: PropTypes.number.isRequired,
  tableColumns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    nameStr: PropTypes.string,
    renderer: PropTypes.func.isRequired,
    copyText: PropTypes.func.isRequired,
    isNumericValue: PropTypes.bool,
  })).isRequired,
  defaultRowHeight: PropTypes.number,
  isNoData: PropTypes.bool,
  isLoading: PropTypes.bool,
  enableColumnResizing: PropTypes.bool,
}

DataTable.defaultProps = {
  className: '',
  isNoData: false,
  isLoading: false,
  section: undefined,
  defaultRowHeight: 26,
  enableColumnResizing: true,
}

export default memo(DataTable)
