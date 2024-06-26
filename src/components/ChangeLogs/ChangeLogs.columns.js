import React from 'react'
import { Cell } from '@blueprintjs/table'

import JSONFormat from 'ui/JSONFormat'
import { getCellState, getColumnWidth, getTooltipContent } from 'utils/columns'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  timeOffset,
  getFullTime,
  columnsWidth,
  filteredData,
}) => [
  {
    id: 'mtsCreate',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('mtsCreate', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].mtsCreate)
      return (
        <Cell tooltip={getTooltipContent(timestamp, t)}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsCreate),
  },
  {
    id: 'log',
    name: 'column.description',
    width: getColumnWidth('log', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { log } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(log, t)}>
          {log}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].log,
  },
  {
    id: 'ip',
    name: 'column.ip',
    width: getColumnWidth('ip', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { ip } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(ip, t)}>
          {ip}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].ip,
  },
  {
    id: 'userAgent',
    name: 'column.meta',
    width: getColumnWidth('userAgent', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { userAgent } = filteredData[rowIndex]

      return (
        <Cell>
          <JSONFormat content={userAgent}>
            {userAgent}
          </JSONFormat>
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].userAgent,
  },
]
