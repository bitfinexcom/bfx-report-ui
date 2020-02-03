import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

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
      id: 'mts',
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: COLUMN_WIDTHS.DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mts)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mts),
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
      width: 500,
      renderer: (rowIndex) => {
        const { extra } = filteredData[rowIndex]
        const formattedExtra = JSON.stringify(extra)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={formattedExtra}
          >
            {formattedExtra}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].extra,
    },
  ]
}
