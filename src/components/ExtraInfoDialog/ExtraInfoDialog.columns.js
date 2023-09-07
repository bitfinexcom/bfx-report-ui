import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import Explorer from 'ui/Explorer'

const getColumns = ({
  t,
  timeOffset,
  getFullTime,
  filteredData,
}) => [
  {
    id: 'id',
    name: 'column.id',
    renderer: (rowIndex) => {
      const { id } = filteredData[rowIndex]
      return (
        <Cell tooltip={id}>
          {id}
        </Cell>
      )
    },
  },
  {
    id: 'mtsUpdated',
    nameStr: `${t('column.date')} (${timeOffset})`,
    renderer: (rowIndex) => {
      const timestamp = getFullTime(filteredData[rowIndex].mtsUpdated)
      return (
        <Cell tooltip={timestamp}>
          {timestamp}
        </Cell>
      )
    },
  },
  {
    id: 'currency',
    name: 'column.currency',
    renderer: (rowIndex) => {
      const { currency } = filteredData[rowIndex]
      return (
        <Cell tooltip={currency}>
          {currency}
        </Cell>
      )
    },
  },
  {
    id: 'status',
    name: 'column.status',
    renderer: (rowIndex) => {
      const { status } = filteredData[rowIndex]
      return (
        <Cell tooltip={status}>
          {status}
        </Cell>
      )
    },
  },
  {
    id: 'amount',
    name: 'column.amount',
    renderer: (rowIndex) => {
      const { amount, currency } = filteredData[rowIndex]
      const tooltip = `${fixedFloat(amount)} ${currency}`
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {formatAmount(amount)}
        </Cell>
      )
    },
  },
  {
    id: 'fees',
    name: 'column.fees',
    renderer: (rowIndex) => {
      const { fees, currency } = filteredData[rowIndex]
      const tooltip = `${fixedFloat(fees)} ${currency}`
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={tooltip}
        >
          <>
            {formatAmount(fees)}
            {' '}
            <span className='bitfinex-show-soft'>
              {currency}
            </span>
          </>
        </Cell>
      )
    },
  },
  {
    id: 'destinationAddress',
    name: 'column.destination',
    renderer: (rowIndex) => {
      const { currency, destinationAddress } = filteredData[rowIndex]
      return (
        <Cell tooltip={destinationAddress}>
          <>
            {destinationAddress}
            {' '}
            <Explorer currency={currency} destinationAddress={destinationAddress} />
          </>
        </Cell>
      )
    },
  },
  {
    id: 'transactionId',
    name: 'column.transactionId',
    className: 'align-left',
    renderer: (rowIndex) => {
      const { transactionId } = filteredData[rowIndex]
      return (
        <Cell tooltip={transactionId}>
          {transactionId}
        </Cell>
      )
    },
  },
  {
    id: 'note',
    name: 'column.note',
    renderer: (rowIndex) => {
      const { note } = filteredData[rowIndex]
      return (
        <Cell tooltip={note}>
          {note}
        </Cell>
      )
    },
  },
]

export default getColumns
