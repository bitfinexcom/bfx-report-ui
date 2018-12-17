import React, { Fragment } from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatTime } from 'state/utils'
import { amountStyle } from 'ui/utils'
import Explorer from 'ui/Explorer'

export default function getColumns(props) {
  const { filteredData, timezone } = props

  return [
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
      tooltip: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'mtsupdated',
      name: 'movements.column.updated',
      renderer: (rowIndex) => {
        const mtsUpdated = formatTime(filteredData[rowIndex].mtsUpdated, timezone)
        return (
          <Cell tooltip={mtsUpdated}>
            <TruncatedFormat>
              {mtsUpdated}
            </TruncatedFormat>
          </Cell>
        )
      },
      tooltip: rowIndex => formatTime(filteredData[rowIndex].mtsUpdated, timezone),
    },
    {
      id: 'currency',
      name: 'movements.column.currency',
      renderer: (rowIndex) => {
        const { currency } = filteredData[rowIndex]
        return (
          <Cell tooltip={currency}>
            {currency}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].currency,
    },
    {
      id: 'status',
      name: 'movements.column.status',
      renderer: (rowIndex) => {
        const { status } = filteredData[rowIndex]
        return (
          <Cell tooltip={status}>
            {status}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].status,
    },
    {
      id: 'amount',
      name: 'movements.column.amount',
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
      tooltip: (rowIndex) => {
        const { amount, currency } = filteredData[rowIndex]
        return `${amount} ${currency}`
      },
    },
    {
      id: 'destination',
      name: 'movements.column.destination',
      renderer: (rowIndex) => {
        const { currency, destinationAddress } = filteredData[rowIndex]
        return (
          <Cell tooltip={destinationAddress}>
            <Fragment>
              {destinationAddress}
              &nbsp;
              <Explorer currency={currency} destinationAddress={destinationAddress} />
            </Fragment>
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].destinationAddress,
    },
  ]
}
