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
      id: 'id',
      name: 'column.id',
      width: COLUMN_WIDTHS.ID,
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
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: COLUMN_WIDTHS.DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].time)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].time),
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
      id: 'browser',
      name: 'column.browser',
      width: 120,
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
      width: 120,
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
      width: 90,
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
      width: COLUMN_WIDTHS.META,
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
}
