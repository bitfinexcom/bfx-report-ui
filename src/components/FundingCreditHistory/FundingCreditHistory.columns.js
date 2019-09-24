import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { getSideMsg } from 'state/utils'
import { formatAmount, fixedFloat } from 'ui/utils'
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
      id: 'symbol',
      name: 'fcredit.column.symbol',
      width: COLUMN_WIDTHS.SYMBOL,
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
      name: 'fcredit.column.side',
      width: 100,
      renderer: (rowIndex) => {
        const side = t(`fcredit.side.${getSideMsg(filteredData[rowIndex].side)}`)
        return (
          <Cell tooltip={side}>
            {side}
          </Cell>
        )
      },
      copyText: rowIndex => t(`fcredit.side.${getSideMsg(filteredData[rowIndex].side)}`),
    },
    {
      id: 'amount',
      name: 'fcredit.column.amount',
      width: COLUMN_WIDTHS.AMOUNT,
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
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
    {
      id: 'status',
      name: 'fcredit.column.status',
      width: 170,
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
      id: 'rate',
      name: 'fcredit.column.rate',
      width: COLUMN_WIDTHS.RATE,
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
      copyText: rowIndex => filteredData[rowIndex].rate,
    },
    {
      id: 'period',
      name: 'fcredit.column.period',
      width: COLUMN_WIDTHS.PERIOD,
      renderer: (rowIndex) => {
        const period = `${filteredData[rowIndex].period} ${t('fcredit.column.days')}`
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
        const days = t('fcredit.column.days')
        return `${filteredData[rowIndex].period} ${days}`
      },
    },
    {
      id: 'mtsOpening',
      name: 'fcredit.column.opening',
      width: COLUMN_WIDTHS.DATE,
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
      name: 'fcredit.column.lastpayout',
      width: COLUMN_WIDTHS.DATE,
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
      name: 'fcredit.column.positionpair',
      width: 120,
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
      nameStr: `${t('fcredit.column.updated')} (${timeOffset})`,
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
