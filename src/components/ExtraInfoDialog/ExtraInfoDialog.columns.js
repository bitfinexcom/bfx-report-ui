import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount } from 'ui/utils'
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
    id: 'currency',
    name: 'column.currency',
    renderer: (rowIndex) => {
      const { currency } = filteredData[rowIndex]
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
      const { currencyName } = filteredData[rowIndex]
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
      const { remark } = filteredData[rowIndex]
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
      const timestamp = getFullTime(filteredData[rowIndex].mtsStarted)
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
      const timestamp = getFullTime(filteredData[rowIndex].mtsUpdated)
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
      const { status } = filteredData[rowIndex]
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
      const { amount } = filteredData[rowIndex]
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
      const { fees, currency } = filteredData[rowIndex]
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
      const { currency, destinationAddress } = filteredData[rowIndex]
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
      const { memo } = filteredData[rowIndex]
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
      const { transactionId } = filteredData[rowIndex]
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
      const { note } = filteredData[rowIndex]
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
      const { bankFees } = filteredData[rowIndex]
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
      const { bankRouterId } = filteredData[rowIndex]
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
      const { externalBankMovId } = filteredData[rowIndex]
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
      const { externalBankMovStatus } = filteredData[rowIndex]
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
      const { externalBankMovDescription } = filteredData[rowIndex]
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
      const { externalBankAccInfo } = filteredData[rowIndex]
      return (
        <Cell>
          {externalBankAccInfo}
        </Cell>
      )
    },
  },
]

export default getColumns
