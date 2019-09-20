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
      width: 80,
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
      name: 'floan.column.symbol',
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
      name: 'floan.column.side',
      width: 80,
      renderer: (rowIndex) => {
        const side = t(`floan.side.${getSideMsg(filteredData[rowIndex].side)}`)
        return (
          <Cell tooltip={side}>
            {side}
          </Cell>
        )
      },
      copyText: rowIndex => t(`floan.side.${getSideMsg(filteredData[rowIndex].side)}`),
    },
    {
      id: 'amount',
      name: 'floan.column.amount',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        return (
          <Cell tooltip={fixedFloat(amount)}>
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
    {
      id: 'status',
      name: 'floan.column.status',
      width: 150,
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
      name: 'floan.column.rate',
      width: COLUMN_WIDTHS.RATE,
      renderer: (rowIndex) => {
        const { rate } = filteredData[rowIndex]
        const fixedRate = fixedFloat(rate)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedRate}
          >
            {fixedRate}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].rate,
    },
    {
      id: 'period',
      name: 'floan.column.period',
      width: COLUMN_WIDTHS.PERIOD,
      renderer: (rowIndex) => {
        const period = `${filteredData[rowIndex].period} ${t('floan.column.days')}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={period}
          >
            {period}
          </Cell>
        )
      },
      copyText: rowIndex => `${filteredData[rowIndex].period} `
        + `${t('floan.column.days')}`,
    },
    {
      id: 'mtsOpening',
      name: 'floan.column.opening',
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
      name: 'floan.column.lastpayout',
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
      id: 'mtsUpdate',
      nameStr: `${t('floan.column.updated')} (${timeOffset})`,
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
