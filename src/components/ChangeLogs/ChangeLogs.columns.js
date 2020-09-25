import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import JSONFormat from 'ui/JSONFormat'
import { COLUMN_WIDTHS } from 'utils/columns'

export default function getColumns(props) {
  const {
    filteredData,
    getFullTime,
    t,
    timeOffset,
  } = props

  return [
    {
      id: 'mtsCreate',
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: COLUMN_WIDTHS.DATE,
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
      width: 200,
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
      width: COLUMN_WIDTHS.IP,
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
      width: COLUMN_WIDTHS.META,
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
}
