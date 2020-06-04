import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { fixedFloat } from 'ui/utils'
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
      id: 'symbol',
      name: 'column.pair',
      width: COLUMN_WIDTHS.SYMBOL,
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
      name: 'column.bid',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { bid } = filteredData[rowIndex]
        const fixedBid = fixedFloat(bid)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedBid}
          >
            {fixedBid}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].bid),
    },
    {
      id: 'ask',
      name: 'column.ask',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { ask } = filteredData[rowIndex]
        const fixedAsk = fixedFloat(ask)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedAsk}
          >
            {fixedAsk}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].ask),
    },
    {
      id: 'mtsUpdate',
      nameStr: `${t('column.time')} (${timeOffset})`,
      width: COLUMN_WIDTHS.DATE,
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
