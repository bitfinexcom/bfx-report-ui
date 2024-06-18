import React from 'react'
import { Cell } from '@blueprintjs/table'

import {
  getCell,
  getLinkCell,
  getCellState,
  getColumnWidth,
  getJsonFormattedCell,
} from 'utils/columns'
import { fixedFloat, formatAmount } from 'ui/utils'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
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
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { id } = filteredData[rowIndex]
      return getCell(id, t)
    },
    copyText: rowIndex => filteredData[rowIndex].id,
  },
  {
    id: 'amount',
    name: 'column.amount',
    width: getColumnWidth('amount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { amount, currency } = filteredData[rowIndex]
      return getCell(formatAmount(amount), t, `${fixedFloat(amount)} ${currency}`)
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
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { currency } = filteredData[rowIndex]
      return getCell(currency, t)
    },
    copyText: rowIndex => filteredData[rowIndex].currency,
  },
  {
    id: 'orderId',
    name: 'column.orderid',
    className: 'align-left',
    width: getColumnWidth('orderId', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { orderId } = filteredData[rowIndex]
      return getCell(orderId, t)
    },
    copyText: rowIndex => filteredData[rowIndex].orderId,
  },
  {
    id: 'payCurrencies',
    name: 'column.payCurrencies',
    width: getColumnWidth('payCurrencies', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { payCurrencies } = filteredData[rowIndex]
      return getJsonFormattedCell(payCurrencies)
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].payCurrencies, undefined, 2),
  },
  {
    id: 'status',
    name: 'column.status',
    className: 'align-left',
    width: getColumnWidth('status', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { status } = filteredData[rowIndex]
      return getCell(status, t)
    },
    copyText: rowIndex => filteredData[rowIndex].status,
  },
  {
    id: 'customerInfo',
    name: 'column.customerInfo',
    className: 'align-left',
    width: getColumnWidth('customerInfo', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { customerInfo } = filteredData[rowIndex]
      return getJsonFormattedCell(customerInfo)
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].customerInfo, undefined, 2),
  },
  {
    id: 'invoices',
    name: 'column.invoices',
    className: 'align-left',
    width: getColumnWidth('invoices', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { invoices } = filteredData[rowIndex]
      return getJsonFormattedCell(invoices)
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].invoices, undefined, 2),
  },
  {
    id: 'payment',
    name: 'column.payment',
    className: 'align-left',
    width: getColumnWidth('payment', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { payment } = filteredData[rowIndex]
      return getJsonFormattedCell(payment)
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].payment, undefined, 2),
  },
  {
    id: 'duration',
    name: 'column.duration',
    className: 'align-left',
    width: getColumnWidth('duration', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { duration } = filteredData[rowIndex]
      return getCell(duration, t)
    },
    copyText: rowIndex => filteredData[rowIndex].duration,
  },
  {
    id: 'merchantName',
    name: 'column.merchantName',
    className: 'align-left',
    width: getColumnWidth('merchantName', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { merchantName } = filteredData[rowIndex]
      return getCell(merchantName, t)
    },
    copyText: rowIndex => filteredData[rowIndex].merchantName,
  },
  {
    id: 'redirectUrl',
    name: 'column.redirectUrl',
    className: 'align-left',
    width: getColumnWidth('redirectUrl', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { redirectUrl } = filteredData[rowIndex]
      return getLinkCell(redirectUrl)
    },
    copyText: rowIndex => filteredData[rowIndex].redirectUrl,
  },
  {
    id: 'mts',
    className: 'align-left',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('mts', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].mts)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mts),
  },
  {
    id: 'webhook',
    name: 'column.webhook',
    className: 'align-left',
    width: getColumnWidth('webhook', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { webhook } = filteredData[rowIndex]
      return getLinkCell(webhook)
    },
    copyText: rowIndex => filteredData[rowIndex].webhook,
  },
]
