import React, { Fragment } from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatAmount, fixedFloat, insertIf } from 'ui/utils'
import Explorer from 'ui/Explorer'
import config from 'config'
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
      id: 'mtsUpdated',
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: getColumnWidth('mtsUpdated', columnsWidth),
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
      width: getColumnWidth('currency', columnsWidth),
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
      id: 'amount',
      name: 'column.amount',
      width: getColumnWidth('amount', columnsWidth),
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
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
    },
    ...insertIf(config.showFrameworkMode, (
      {
        id: 'amountUsd',
        name: 'column.amountUsd',
        width: getColumnWidth('amountUsd', columnsWidth),
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
        copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountUsd),
      }
    )),
    {
      id: 'fees',
      name: 'column.fees',
      width: getColumnWidth('fees', columnsWidth),
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
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].fees),
    },
    {
      id: 'destinationAddress',
      name: 'column.destination',
      width: getColumnWidth('destinationAddress', columnsWidth),
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
      width: getColumnWidth('transactionId', columnsWidth),
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
    {
      id: 'note',
      name: 'column.note',
      width: getColumnWidth('note', columnsWidth),
      renderer: (rowIndex) => {
        const { note } = filteredData[rowIndex]
        return (
          <Cell tooltip={note}>
            {note}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].note,
    },
  ]
}
