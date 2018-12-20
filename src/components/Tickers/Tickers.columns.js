import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatTime } from 'state/utils'

export default function getColumns(props) {
  const { filteredData, timezone } = props

  return [
    {
      id: 'symbol',
      name: 'tickers.column.pair',
      renderer: (rowIndex) => {
        const { pair } = filteredData[rowIndex]
        return (
          <Cell tooltip={pair}>
            {pair}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].pair,
    },
    {
      id: 'bid',
      name: 'tickers.column.bid',
      renderer: (rowIndex) => {
        const { bid } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={bid}
          >
            {bid}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].bid,
    },
    {
      id: 'ask',
      name: 'tickers.column.ask',
      renderer: (rowIndex) => {
        const { ask } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={ask}
          >
            {ask}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].ask,
    },
    {
      id: 'mtsUpdate',
      name: 'tickers.column.time',
      renderer: (rowIndex) => {
        const mtsUpdate = formatTime(filteredData[rowIndex].mtsUpdate, timezone)
        return (
          <Cell tooltip={mtsUpdate}>
            <TruncatedFormat>
              {mtsUpdate}
            </TruncatedFormat>
          </Cell>
        )
      },
      tooltip: rowIndex => formatTime(filteredData[rowIndex].mtsUpdate, timezone),
    },
  ]
}
