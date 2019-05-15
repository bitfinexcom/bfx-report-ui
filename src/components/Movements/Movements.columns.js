import React, { Fragment } from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { amountStyle } from 'ui/utils'
import Explorer from 'ui/Explorer'

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
      id: 'mtsupdated',
      nameStr: `${t('movements.column.updated')} (${timeOffset})`,
      width: 150,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsUpdated)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdated),
    },
    {
      id: 'currency',
      name: 'movements.column.currency',
      width: 100,
      renderer: (rowIndex) => {
        const { currency } = filteredData[rowIndex]
        return (
          <Cell tooltip={currency}>
            {currency}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].currency,
    },
    {
      id: 'status',
      name: 'movements.column.status',
      width: 125,
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
      id: 'amount',
      name: 'movements.column.amount',
      width: 120,
      renderer: (rowIndex) => {
        const { amount, currency } = filteredData[rowIndex]
        const tooltip = `${amount} ${currency}`
        const classes = amountStyle(amount)
        return (
          <Cell
            className={classes}
            tooltip={tooltip}
          >
            {amount}
          </Cell>
        )
      },
      copyText: (rowIndex) => {
        const { amount, currency } = filteredData[rowIndex]
        return `${amount} ${currency}`
      },
    },
    {
      id: 'fees',
      name: 'movements.column.fees',
      width: 80,
      renderer: (rowIndex) => {
        const { fees, currency } = filteredData[rowIndex]
        const tooltip = `${fees} ${currency}`
        const classes = amountStyle(fees)
        return (
          <Cell
            className={classes}
            tooltip={tooltip}
          >
            {fees}
          </Cell>
        )
      },
      copyText: (rowIndex) => {
        const { fees, currency } = filteredData[rowIndex]
        return `${fees} ${currency}`
      },
    },
    {
      id: 'destination',
      name: 'movements.column.destination',
      width: 400,
      renderer: (rowIndex) => {
        const { currency, destinationAddress } = filteredData[rowIndex]
        return (
          <Cell tooltip={destinationAddress}>
            <Fragment>
              {destinationAddress}
              {' '}
              <Explorer currency={currency} destinationAddress={destinationAddress} />
            </Fragment>
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].destinationAddress,
    },
    {
      id: 'transid',
      name: 'movements.column.transactionId',
      width: 80,
      renderer: (rowIndex) => {
        const { transactionId } = filteredData[rowIndex]
        return (
          <Cell tooltip={transactionId}>
            {transactionId}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].transactionId,
    },
  ]
}
