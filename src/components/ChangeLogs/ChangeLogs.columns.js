import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import JSONFormat from 'ui/JSONFormat'
import { getColumnWidth } from 'utils/columns'

export const getColumns = ({
  t,
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
      const timestamp = getFullTime(filteredData[rowIndex].mtsCreate)
      return (
        <Cell tooltip={timestamp}>
          <TruncatedFormat>
            {timestamp}
          </TruncatedFormat>
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
      const { log } = filteredData[rowIndex]
      return (
        <Cell tooltip={log}>
          <TruncatedFormat>
            {log}
          </TruncatedFormat>
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
    id: 'userAgent',
    name: 'column.meta',
    width: getColumnWidth('userAgent', columnsWidth),
    renderer: (rowIndex) => {
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
