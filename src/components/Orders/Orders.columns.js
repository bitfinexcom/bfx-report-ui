import React from 'react'
import { Cell } from '@blueprintjs/table'

import {
  getCell,
  getCellState,
  getColumnWidth,
  getTooltipContent,
  getJsonFormattedCell,
} from 'utils/columns'
import { formatAmount, fixedFloat } from 'ui/utils'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  onIdClick,
  timeOffset,
  getFullTime,
  columnsWidth,
  filteredData,
}) => [
  {
    id: 'id',
    name: 'column.id',
    className: 'align-left',
    width: getColumnWidth('id', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { id, pair, amountExecuted } = filteredData[rowIndex]
      /* eslint-disable jsx-a11y/anchor-is-valid */
      return (
        <Cell tooltip={getTooltipContent(id, t)}>
          <>
            {amountExecuted
              ? <a href='#' onClick={e => onIdClick(e, { id, pair })}>{id}</a>
              : id}
          </>
        </Cell>
      )
      /* eslint-enable jsx-a11y/anchor-is-valid */
    },
    copyText: rowIndex => filteredData[rowIndex].id,
  },
  {
    id: 'pair',
    name: 'column.pair',
    className: 'align-left',
    width: getColumnWidth('pair', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { pair } = filteredData[rowIndex]
      return getCell(pair, t)
    },
    copyText: rowIndex => filteredData[rowIndex].pair,
  },
  {
    id: 'type',
    name: 'column.type',
    className: 'align-left',
    width: getColumnWidth('type', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { type } = filteredData[rowIndex]
      return getCell(type, t)
    },
    copyText: rowIndex => filteredData[rowIndex].type,
  },
  {
    id: 'amountOrig',
    name: 'column.amount',
    width: getColumnWidth('amountOrig', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { amountOrig } = filteredData[rowIndex]
      return getCell(fixedFloat(amountOrig), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountOrig),
  },
  {
    id: 'amountExecuted',
    name: 'column.amount-exe',
    width: getColumnWidth('amountExecuted', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { amountExecuted } = filteredData[rowIndex]
      return getCell(formatAmount(amountExecuted), t, fixedFloat(amountExecuted))
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountExecuted),
  },
  {
    id: 'price',
    name: 'column.price',
    width: getColumnWidth('price', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { price } = filteredData[rowIndex]
      return getCell(fixedFloat(price), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].price),
  },
  {
    id: 'priceAvg',
    name: 'column.avgprice',
    width: getColumnWidth('priceAvg', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { priceAvg } = filteredData[rowIndex]
      return getCell(fixedFloat(priceAvg), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].priceAvg),
  },
  {
    id: 'mtsCreate',
    className: 'align-left',
    nameStr: `${t('column.created')} (${timeOffset})`,
    width: getColumnWidth('mtsCreate', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].mtsCreate)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsCreate),
  },
  {
    id: 'mtsUpdate',
    className: 'align-left',
    nameStr: `${t('column.updated')} (${timeOffset})`,
    width: getColumnWidth('mtsUpdate', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
  },
  {
    id: 'status',
    name: 'column.status',
    className: 'align-left',
    width: getColumnWidth('status', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { status } = filteredData[rowIndex]
      return getCell(status, t)
    },
    copyText: rowIndex => filteredData[rowIndex].status,
  },
  {
    id: 'priceTrailing',
    name: 'column.pricetrail',
    width: getColumnWidth('priceTrailing', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { priceTrailing } = filteredData[rowIndex]
      return getCell(fixedFloat(priceTrailing), t)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].priceTrailing),
  },
  {
    id: 'typePrev',
    name: 'column.typeprev',
    className: 'align-left',
    width: getColumnWidth('typePrev', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { typePrev } = filteredData[rowIndex]
      return getCell(typePrev, t)
    },
    copyText: rowIndex => filteredData[rowIndex].typePrev,
  },
  {
    id: 'meta',
    name: 'column.meta',
    className: 'align-left',
    width: getColumnWidth('meta', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { meta } = filteredData[rowIndex]
      return getJsonFormattedCell(meta)
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].meta) || '',
  },
]
