import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount } from 'ui/utils'
import Explorer from 'ui/Explorer'

const getColumns = ({
  t,
  timeOffset,
  formatTime,
  preparedData,
}) => [
  {
    id: 'id',
    name: 'column.id',
    renderer: (rowIndex) => {
      const { id } = preparedData[rowIndex]
      return (
        <Cell tooltip={id}>
          {id}
        </Cell>
      )
    },
  },
  {
    id: 'currency',
    name: 'column.currency',
    renderer: (rowIndex) => {
      const { currency } = preparedData[rowIndex]
      return (
        <Cell>
          {currency}
        </Cell>
      )
    },
  },
  {
    id: 'currencyName',
    name: 'column.currencyName',
    renderer: (rowIndex) => {
      const { currencyName } = preparedData[rowIndex]
      return (
        <Cell>
          {currencyName}
        </Cell>
      )
    },
  },
  {
    id: 'remark',
    name: 'column.remark',
    renderer: (rowIndex) => {
      const { remark } = preparedData[rowIndex]
      return (
        <Cell>
          {remark}
        </Cell>
      )
    },
  },
  {
    id: 'mtsStarted',
    nameStr: `${t('column.started')} (${timeOffset})`,
    renderer: (rowIndex) => {
      const timestamp = formatTime(preparedData[rowIndex].mtsStarted)
      return (
        <Cell>
          {timestamp}
        </Cell>
      )
    },
  },
  {
    id: 'mtsUpdated',
    nameStr: `${t('column.updated')} (${timeOffset})`,
    renderer: (rowIndex) => {
      const timestamp = formatTime(preparedData[rowIndex].mtsUpdated)
      return (
        <Cell>
          {timestamp}
        </Cell>
      )
    },
  },
  {
    id: 'status',
    name: 'column.status',
    renderer: (rowIndex) => {
      const { status } = preparedData[rowIndex]
      return (
        <Cell>
          {status}
        </Cell>
      )
    },
  },
  {
    id: 'amount',
    name: 'column.amount',
    renderer: (rowIndex) => {
      const { amount } = preparedData[rowIndex]
      return (
        <Cell className='bitfinex-text-align-right'>
          {formatAmount(amount)}
        </Cell>
      )
    },
  },
  {
    id: 'fees',
    name: 'column.fees',
    renderer: (rowIndex) => {
      const { fees, currency } = preparedData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
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
      const { currency, destinationAddress } = preparedData[rowIndex]
      return (
        <Cell>
          <>
            {destinationAddress}
            {' '}
            <Explorer
              currency={currency}
              destinationAddress={destinationAddress}
            />
          </>
        </Cell>
      )
    },
  },
  {
    id: 'memo',
    name: 'column.memo',
    renderer: (rowIndex) => {
      const { memo } = preparedData[rowIndex]
      return (
        <Cell>
          {memo}
        </Cell>
      )
    },
  },
  {
    id: 'transactionId',
    name: 'column.transactionId',
    className: 'align-left',
    renderer: (rowIndex) => {
      const { transactionId } = preparedData[rowIndex]
      return (
        <Cell>
          {transactionId}
        </Cell>
      )
    },
  },
  {
    id: 'note',
    name: 'column.note',
    renderer: (rowIndex) => {
      const { note } = preparedData[rowIndex]
      return (
        <Cell>
          {note}
        </Cell>
      )
    },
  },
  {
    id: 'bankFees',
    name: 'column.bankFees',
    renderer: (rowIndex) => {
      const { bankFees } = preparedData[rowIndex]
      return (
        <Cell>
          {formatAmount(bankFees)}
        </Cell>
      )
    },
  },
  {
    id: 'bankRouterId',
    name: 'column.bankRouterId',
    renderer: (rowIndex) => {
      const { bankRouterId } = preparedData[rowIndex]
      return (
        <Cell>
          {bankRouterId}
        </Cell>
      )
    },
  },
  {
    id: 'externalProviderId',
    name: 'column.externalProviderId',
    renderer: (rowIndex) => {
      const { externalBankMovId } = preparedData[rowIndex]
      return (
        <Cell>
          {externalBankMovId}
        </Cell>
      )
    },
  },
  {
    id: 'externalProviderStatus',
    name: 'column.externalProviderStatus',
    renderer: (rowIndex) => {
      const { externalBankMovStatus } = preparedData[rowIndex]
      return (
        <Cell>
          {externalBankMovStatus}
        </Cell>
      )
    },
  },
  {
    id: 'externalProviderInfo',
    name: 'column.externalProviderInfo',
    renderer: (rowIndex) => {
      const { externalBankMovDescription } = preparedData[rowIndex]
      return (
        <Cell>
          {externalBankMovDescription}
        </Cell>
      )
    },
  },
  {
    id: 'externalBankAccInfo',
    name: 'column.externalProviderBankAccInfo',
    renderer: (rowIndex) => {
      const { externalBankAccInfo } = preparedData[rowIndex]
      return (
        <Cell>
          {externalBankAccInfo}
        </Cell>
      )
    },
  },
]

export default getColumns
