import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount} from 'ui/utils'
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
    id: 'REMARK',
    name: 'column.remark',
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
    id: 'BANK_FEES',
    name: 'column.bankFees',
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
    id: 'BANK_ROUTER_ID',
    name: 'column.bankRouterId',
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
    id: 'EXTERNAL_BANK_MOV_ID',
    name: 'column.externalProviderId',
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
    id: 'EXTERNAL_BANK_MOV_STATUS',
    name: 'column.externalProviderStatus',
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
    id: 'EXTERNAL_BANK_MOV_DESCRIPTION',
    name: 'column.externalProviderInfo',
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
    id: 'EXTERNAL_BANK_ACC_INFO',
    name: 'column.externalProviderBankAccInfo',
    renderer: (rowIndex) => {
      const { note } = filteredData[rowIndex]
      return (
        <Cell>
          {note}
        </Cell>
      )
    },
  },
]

export default getColumns
