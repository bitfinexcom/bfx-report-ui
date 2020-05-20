import React, { Fragment } from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatAmount, fixedFloat, insertIf } from 'ui/utils'
import Explorer from 'ui/Explorer'
import { platform } from 'var/config'
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
      id: 'mtsUpdated',
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: COLUMN_WIDTHS.DATE,
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
      name: 'column.currency',
      width: COLUMN_WIDTHS.SYMBOL,
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
      name: 'column.status',
      width: COLUMN_WIDTHS.MOVEMENT_STATUS,
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
      name: 'column.amount',
      width: COLUMN_WIDTHS.AMOUNT,
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
      copyText: (rowIndex) => {
        const { amount, currency } = filteredData[rowIndex]
        return `${amount} ${currency}`
      },
    },
    ...insertIf(platform.showFrameworkMode, (
      {
        id: 'amountUsd',
        name: 'column.amountUsd',
        width: COLUMN_WIDTHS.AMOUNT,
        renderer: (rowIndex) => {
          const { amountUsd } = filteredData[rowIndex]
          const tooltip = `${fixedFloat(amountUsd)} ${t('column.usd')}`
          return (
            <Cell
              className='bitfinex-text-align-right'
              tooltip={tooltip}
            >
              {formatAmount(amountUsd)}
            </Cell>
          )
        },
        copyText: (rowIndex) => {
          const { amountUsd } = filteredData[rowIndex]
          return `${fixedFloat(amountUsd)} ${t('column.usd')}`
        },
      }
    )),
    {
      id: 'fees',
      name: 'column.fees',
      width: COLUMN_WIDTHS.FEE,
      renderer: (rowIndex) => {
        const { fees, currency } = filteredData[rowIndex]
        const tooltip = `${fixedFloat(fees)} ${currency}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={tooltip}
          >
            <Fragment>
              {formatAmount(fees)}
              {' '}
              <span className='bitfinex-show-soft'>
                {currency}
              </span>
            </Fragment>
          </Cell>
        )
      },
      copyText: (rowIndex) => {
        const { fees, currency } = filteredData[rowIndex]
        return `${fees} ${currency}`
      },
    },
    {
      id: 'destinationAddress',
      name: 'column.destination',
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
      id: 'transactionId',
      name: 'column.transactionId',
      width: 135,
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
