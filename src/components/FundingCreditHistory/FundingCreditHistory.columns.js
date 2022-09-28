import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { getSideMsg, getSideColor } from 'state/utils'
import { formatAmount, formatColor, fixedFloat } from 'ui/utils'
import { getColumnWidth } from 'utils/columns'

export default function getColumns(props) {
  const {
    columnsWidth,
    filteredData,
    getFullTime,
    t,
    timeOffset,
  } = props

  return [
    {
      id: 'id',
      name: 'column.id',
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
      id: 'symbol',
      name: 'column.currency',
      width: getColumnWidth('symbol', columnsWidth),
      renderer: (rowIndex) => {
        const { symbol } = filteredData[rowIndex]
        return (
          <Cell tooltip={symbol}>
            {symbol}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].symbol,
    },
    {
      id: 'side',
      name: 'column.side',
      width: getColumnWidth('side', columnsWidth),
      renderer: (rowIndex) => {
        const { side } = filteredData[rowIndex]
        const formattedSide = t(`fcredit.side.${getSideMsg(side)}`)
        return (
          <Cell tooltip={formattedSide}>
            {formatColor(formattedSide, getSideColor(side))}
          </Cell>
        )
      },
      copyText: rowIndex => t(`fcredit.side.${getSideMsg(filteredData[rowIndex].side)}`),
    },
    {
      id: 'amount',
      name: 'column.amount',
      width: getColumnWidth('amount', columnsWidth),
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(amount)}
          >
            {formatAmount(amount)}
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
    },
    {
      id: 'status',
      name: 'column.status',
      width: getColumnWidth('status', columnsWidth),
      renderer: (rowIndex) => {
        const { status } = filteredData[rowIndex]
        return (
          <Cell tooltip={status}>
            {status}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].status,
    },
    {
      id: 'type',
      name: 'column.type',
      width: getColumnWidth('type', columnsWidth),
      renderer: (rowIndex) => {
        const { type } = filteredData[rowIndex]
        return (
          <Cell tooltip={type}>
            {type}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].type,
    },
    {
      id: 'rate',
      name: 'column.rateperc',
      width: getColumnWidth('rate', columnsWidth),
      renderer: (rowIndex) => {
        const { rate } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={rate}
          >
            {fixedFloat(rate)}
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].rate),
    },
    {
      id: 'period',
      name: 'column.period',
      width: getColumnWidth('period', columnsWidth),
      renderer: (rowIndex) => {
        const period = `${filteredData[rowIndex].period} ${t('column.days')}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={period}
          >
            {period}
          </Cell>
        )
      },
      copyText: (rowIndex) => {
        const days = t('column.days')
        return `${filteredData[rowIndex].period} ${days}`
      },
    },
    {
      id: 'mtsOpening',
      nameStr: `${t('column.opened')} (${timeOffset})`,
      width: getColumnWidth('mtsOpening', columnsWidth),
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsOpening)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsOpening),
    },
    {
      id: 'mtsLastPayout',
      nameStr: `${t('column.lastpayout')} (${timeOffset})`,
      width: getColumnWidth('mtsLastPayout', columnsWidth),
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsLastPayout)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsLastPayout),
    },
    {
      id: 'positionPair',
      name: 'column.positionpair',
      width: getColumnWidth('positionPair', columnsWidth),
      renderer: (rowIndex) => {
        const { positionPair } = filteredData[rowIndex]
        return (
          <Cell tooltip={positionPair}>
            {positionPair}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].positionPair,
    },
    {
      id: 'mtsUpdate',
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: getColumnWidth('mtsUpdate', columnsWidth),
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
