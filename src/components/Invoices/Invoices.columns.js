import React from 'react'
import { Cell } from '@blueprintjs/table'

import JSONFormat from 'ui/JSONFormat'
import { fixedFloat, formatAmount } from 'ui/utils'
import { getColumnWidth, getTooltipContent } from 'utils/columns'

export const getColumns = ({
  t,
  timeOffset,
  getFullTime,
  filteredData,
  columnsWidth,
}) => [
  {
    id: 'id',
    name: 'column.id',
    className: 'align-left',
    width: getColumnWidth('id', columnsWidth),
    renderer: (rowIndex) => {
      const { id } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(id, t)}>
          {id}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].id,
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
          tooltip={getTooltipContent(tooltip, t)}
        >
          {formatAmount(amount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
  },
  {
    id: 'currency',
    name: 'column.currency',
    className: 'align-left',
    width: getColumnWidth('currency', columnsWidth),
    renderer: (rowIndex) => {
      const { currency } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(currency, t)}>
          {currency}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].currency,
  },
  {
    id: 'orderId',
    name: 'column.orderid',
    className: 'align-left',
    width: getColumnWidth('orderId', columnsWidth),
    renderer: (rowIndex) => {
      const { orderId } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(orderId, t)}>
          {orderId}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].orderId,
  },
  {
    id: 'payCurrencies',
    name: 'column.payCurrencies',
    width: getColumnWidth('payCurrencies', columnsWidth),
    renderer: (rowIndex) => {
      const { payCurrencies } = filteredData[rowIndex]
      const formattedPayCurrenciesInfo = JSON.stringify(payCurrencies, undefined, 2)
      return (
        <Cell>
          <JSONFormat content={formattedPayCurrenciesInfo}>
            {formattedPayCurrenciesInfo}
          </JSONFormat>
        </Cell>
      )
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].payCurrencies, undefined, 2),
  },
  {
    id: 'status',
    name: 'column.status',
    className: 'align-left',
    width: getColumnWidth('status', columnsWidth),
    renderer: (rowIndex) => {
      const { status } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(status, t)}>
          {status}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].status,
  },
  {
    id: 'customerInfo',
    name: 'column.customerInfo',
    className: 'align-left',
    width: getColumnWidth('customerInfo', columnsWidth),
    renderer: (rowIndex) => {
      const { customerInfo } = filteredData[rowIndex]
      const formattedCustomerInfo = JSON.stringify(customerInfo, undefined, 2)
      return (
        <Cell>
          <JSONFormat content={formattedCustomerInfo}>
            {formattedCustomerInfo}
          </JSONFormat>
        </Cell>
      )
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].customerInfo, undefined, 2),
  },
  {
    id: 'invoices',
    name: 'column.invoices',
    className: 'align-left',
    width: getColumnWidth('invoices', columnsWidth),
    renderer: (rowIndex) => {
      const { invoices } = filteredData[rowIndex]
      const formattedInvoicesInfo = JSON.stringify(invoices, undefined, 2)
      return (
        <Cell>
          <JSONFormat content={formattedInvoicesInfo}>
            {formattedInvoicesInfo}
          </JSONFormat>
        </Cell>
      )
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].invoices, undefined, 2),
  },
  {
    id: 'payment',
    name: 'column.payment',
    className: 'align-left',
    width: getColumnWidth('payment', columnsWidth),
    renderer: (rowIndex) => {
      const { payment } = filteredData[rowIndex]
      const formattedPayment = JSON.stringify(payment, undefined, 2)
      return (
        <Cell>
          <JSONFormat content={formattedPayment}>
            {formattedPayment}
          </JSONFormat>
        </Cell>
      )
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].payment, undefined, 2),
  },
  {
    id: 'duration',
    name: 'column.duration',
    className: 'align-left',
    width: getColumnWidth('duration', columnsWidth),
    renderer: (rowIndex) => {
      const { duration } = filteredData[rowIndex]
      return (
        <Cell>
          {duration}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].duration,
  },
  {
    id: 'merchantName',
    name: 'column.merchantName',
    className: 'align-left',
    width: getColumnWidth('merchantName', columnsWidth),
    renderer: (rowIndex) => {
      const { merchantName } = filteredData[rowIndex]
      return (
        <Cell>
          {merchantName}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].merchantName,
  },
  {
    id: 'redirectUrl',
    name: 'column.redirectUrl',
    className: 'align-left',
    width: getColumnWidth('redirectUrl', columnsWidth),
    renderer: (rowIndex) => {
      const { redirectUrl } = filteredData[rowIndex]
      return (
        <Cell>
          <>
            <a
              target='_blank'
              href={`${redirectUrl}`}
              rel='noopener noreferrer'
            >
              {redirectUrl}
            </a>
          </>
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].redirectUrl,
  },
  {
    id: 'mts',
    className: 'align-left',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('mts', columnsWidth),
    renderer: (rowIndex) => {
      const timestamp = getFullTime(filteredData[rowIndex].mts)
      return (
        <Cell tooltip={getTooltipContent(timestamp, t)}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mts),
  },
  {
    id: 'webhook',
    name: 'column.webhook',
    className: 'align-left',
    width: getColumnWidth('webhook', columnsWidth),
    renderer: (rowIndex) => {
      const { webhook } = filteredData[rowIndex]
      return (
        <Cell>
          <>
            <a
              target='_blank'
              href={`${webhook}`}
              rel='noopener noreferrer'
            >
              {webhook}
            </a>
          </>
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].webhook,
  },
]
