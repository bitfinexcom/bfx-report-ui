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
  filteredData,
  columnsWidth,
}) => [
  {
    id: 'id',
    name: 'column.id',
    className: 'align-left',
    width: getColumnWidth('id', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
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
    id: 'time',
    className: 'align-left',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('time', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].time)
      return (
        <Cell tooltip={getTooltipContent(timestamp, t)}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].time),
  },
  {
    id: 'ip',
    name: 'column.ip',
    className: 'align-left',
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
    id: 'browser',
    name: 'column.browser',
    className: 'align-left',
    width: getColumnWidth('browser', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { browser } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(browser, t)}>
          {browser}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].browser,
  },
  {
    id: 'version',
    name: 'column.version',
    className: 'align-left',
    width: getColumnWidth('version', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { version } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(version, t)}>
          {version}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].version,
  },
  {
    id: 'mobile',
    name: 'column.mobile',
    className: 'align-left',
    width: getColumnWidth('mobile', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { mobile } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(mobile, t)}>
          {mobile}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].mobile,
  },
  {
    id: 'extra',
    name: 'column.meta',
    className: 'align-left',
    width: getColumnWidth('extra', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { extra } = filteredData[rowIndex]
      const formattedExtra = JSON.stringify(extra, undefined, 2)
      return (
        <Cell>
          <JSONFormat content={formattedExtra}>
            {formattedExtra}
          </JSONFormat>
        </Cell>
      )
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].extra, undefined, 2),
  },
]
