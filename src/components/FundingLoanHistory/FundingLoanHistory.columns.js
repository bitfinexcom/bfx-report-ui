import React from 'react'
import { Cell } from '@blueprintjs/table'

import { getSideMsg, getSideColor } from 'state/utils'
import { formatAmount, formatColor, fixedFloat } from 'ui/utils'
import { getCellState, getColumnWidth, getTooltipContent } from 'utils/columns'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  timeOffset,
  getFullTime,
  filteredData,
  columnsWidth,
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
      const { id } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(id, t)}>
          {id}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].id,
  },
  {
    id: 'symbol',
    name: 'column.currency',
    className: 'align-left',
    width: getColumnWidth('symbol', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { symbol } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(symbol, t)}>
          {symbol}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].symbol,
  },
  {
    id: 'side',
    name: 'column.side',
    className: 'align-left',
    width: getColumnWidth('side', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { side } = filteredData[rowIndex]
      const formattedSide = t(`floan.side.${getSideMsg(side)}`)
      return (
        <Cell tooltip={getTooltipContent(formattedSide, t)}>
          {formatColor(formattedSide, getSideColor(side))}
        </Cell>
      )
    },
    copyText: rowIndex => t(`floan.side.${getSideMsg(filteredData[rowIndex].side)}`),
  },
  {
    id: 'amount',
    name: 'column.amount',
    width: getColumnWidth('amount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { amount } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedFloat(amount), t)}
        >
          {formatAmount(amount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
  },
  {
    id: 'status',
    name: 'column.status',
    className: 'align-left',
    width: getColumnWidth('status', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { status } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(status, t)}>
          {status}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].status,
  },
  {
    id: 'type',
    name: 'column.type',
    className: 'align-left',
    width: getColumnWidth('type', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { type } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(type, t)}>
          {type}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].type,
  },
  {
    id: 'rate',
    name: 'column.rateperc',
    width: getColumnWidth('rate', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { rate } = filteredData[rowIndex]
      const fixedRate = fixedFloat(rate)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedRate, t)}
        >
          {fixedRate}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].rate),
  },
  {
    id: 'period',
    name: 'column.period',
    className: 'align-left',
    width: getColumnWidth('period', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const period = `${filteredData[rowIndex].period} ${t('column.days')}`
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(period, t)}
        >
          {period}
        </Cell>
      )
    },
    copyText: rowIndex => `${filteredData[rowIndex].period} ${t('column.days')}`,
  },
  {
    id: 'mtsOpening',
    className: 'align-left',
    nameStr: `${t('column.opened')} (${timeOffset})`,
    width: getColumnWidth('mtsOpening', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const timestamp = getFullTime(filteredData[rowIndex].mtsOpening)
      return (
        <Cell tooltip={getTooltipContent(timestamp, t)}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsOpening),
  },
  {
    id: 'mtsLastPayout',
    className: 'align-left',
    nameStr: `${t('column.closed')} (${timeOffset})`,
    width: getColumnWidth('mtsLastPayout', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const timestamp = getFullTime(filteredData[rowIndex].mtsLastPayout)
      return (
        <Cell tooltip={getTooltipContent(timestamp, t)}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsLastPayout),
  },
  {
    id: 'mtsUpdate',
    className: 'align-left',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('mtsUpdate', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
      return (
        <Cell tooltip={getTooltipContent(timestamp, t)}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
  },
]
