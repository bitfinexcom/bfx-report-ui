import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

export default function getColumns(props) {
  const {
    filteredData,
    getFullTime,
    intl,
    timeOffset,
  } = props

  return [
    {
      id: 'symbol',
      name: 'tickers.column.pair',
      width: 80,
      renderer: (rowIndex) => {
        const { pair } = filteredData[rowIndex]
        return (
          <Cell tooltip={pair}>
            {pair}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].pair,
    },
    {
      id: 'bid',
      name: 'tickers.column.bid',
      width: 100,
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
      copyText: rowIndex => filteredData[rowIndex].bid,
    },
    {
      id: 'ask',
      name: 'tickers.column.ask',
      width: 100,
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
      copyText: rowIndex => filteredData[rowIndex].ask,
    },
    {
      id: 'mtsUpdate',
      nameStr: `${intl.formatMessage({ id: 'tickers.column.time' })} (${timeOffset})`,
      width: 200,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
    },
  ]
}
