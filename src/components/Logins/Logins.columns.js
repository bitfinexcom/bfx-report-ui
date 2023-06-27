import React from 'react'
import { Cell } from '@blueprintjs/table'

import JSONFormat from 'ui/JSONFormat'
import { getColumnWidth } from 'utils/columns'

export const getColumns = ({
  t,
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
      const { id } = filteredData[rowIndex]
      return (
        <Cell tooltip={id}>
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
      const timestamp = getFullTime(filteredData[rowIndex].time)
      return (
        <Cell tooltip={timestamp}>
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
      const { ip } = filteredData[rowIndex]
      return (
        <Cell tooltip={ip}>
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
      const { browser } = filteredData[rowIndex]
      return (
        <Cell tooltip={browser}>
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
      const { version } = filteredData[rowIndex]
      return (
        <Cell tooltip={version}>
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
      const { mobile } = filteredData[rowIndex]
      return (
        <Cell tooltip={mobile}>
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
