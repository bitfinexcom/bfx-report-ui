import React from 'react'
import { Cell } from '@blueprintjs/table'

import { fixedFloat } from 'ui/utils'
import { getCellState, getColumnWidth, getTooltipContent } from 'utils/columns'

export default function getColumns(props) {
  const {
    t,
    isNoData,
    isLoading,
    timeOffset,
    getFullTime,
    columnsWidth,
    filteredData,
  } = props

  return [
    {
      id: 'symbol',
      name: 'column.pair',
      className: 'align-left',
      width: getColumnWidth('symbol', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) {
          return getCellState(isLoading, isNoData)
        }
        const { pair } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(pair, t)}>
            {pair}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].pair,
    },
    {
      id: 'bid',
      name: 'column.bid',
      width: getColumnWidth('bid', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) {
          return getCellState(isLoading, isNoData)
        }
        const { bid } = filteredData[rowIndex]
        const fixedBid = fixedFloat(bid)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedBid, t)}
          >
            {fixedBid}
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].bid),
    },
    {
      id: 'ask',
      name: 'column.ask',
      width: getColumnWidth('ask', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) {
          return getCellState(isLoading, isNoData)
        }
        const { ask } = filteredData[rowIndex]
        const fixedAsk = fixedFloat(ask)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedAsk, t)}
          >
            {fixedAsk}
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].ask),
    },
    {
      id: 'mtsUpdate',
      className: 'align-left',
      nameStr: `${t('column.time')} (${timeOffset})`,
      width: getColumnWidth('mtsUpdate', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) {
          return getCellState(isLoading, isNoData)
        }
        const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
        return (
          <Cell tooltip={getTooltipContent(timestamp, t)}>
            {timestamp}
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
    },
  ]
}
