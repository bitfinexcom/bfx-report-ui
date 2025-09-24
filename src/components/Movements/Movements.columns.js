import React from 'react'
import { Cell } from '@blueprintjs/table'

import config from 'config'
import Explorer from 'ui/Explorer'
import {
  getCell,
  getFeeCell,
  getCellState,
  getActionCell,
  getColumnWidth,
} from 'utils/columns'
import { prepareCurrency } from 'state/symbols/utils'
import { formatAmount, fixedFloat, insertIf } from 'ui/utils'

const getColumns = ({
  t,
  isNoData,
  isLoading,
  timeOffset,
  tetherNames,
  getFullTime,
  filteredData,
  columnsWidth,
  onDetailsClick,
}) => [
  ...(onDetailsClick ? [{
    id: 'moreDetails',
    name: 'column.moreDetails',
    className: 'align-left',
    width: getColumnWidth('moreDetails', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { id } = filteredData[rowIndex]
      const cellAction = (e) => onDetailsClick(e, { id })
      return getActionCell(t('column.show'), cellAction, t, t('column.moreDetails'))
    },
    copyText: rowIndex => filteredData[rowIndex].id,
  }] : []),
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
    id: 'mtsStarted',
    className: 'align-left',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('mtsStarted', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const timestamp = getFullTime(filteredData[rowIndex].mtsStarted)
      return getCell(timestamp, t)
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsStarted),
  },
  {
    id: 'currency',
    name: 'column.currency',
    className: 'align-left',
    width: getColumnWidth('currency', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { currency, currencyName } = filteredData[rowIndex]
      const preparedCurrency = prepareCurrency(currency, currencyName, tetherNames)
      return getCell(preparedCurrency, t)
    },
    copyText: rowIndex => filteredData[rowIndex].currency,
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
  ...insertIf(config.showFrameworkMode, (
    {
      id: 'amountUsd',
      name: 'column.amountUsd',
      width: getColumnWidth('amountUsd', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) return getCellState(isLoading, isNoData)
        const { amountUsd } = filteredData[rowIndex]
        return getCell(formatAmount(amountUsd), t, `${fixedFloat(amountUsd)} ${t('column.usd')}`)
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountUsd),
    }
  )),
  {
    id: 'fees',
    name: 'column.fees',
    width: getColumnWidth('fees', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { fees, currency } = filteredData[rowIndex]
      return getFeeCell(fees, currency, t, `${fixedFloat(fees)} ${currency}`)
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].fees),
  },
  {
    id: 'destinationAddress',
    name: 'column.destination',
    className: 'align-left',
    width: getColumnWidth('destinationAddress', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
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
    copyText: rowIndex => filteredData[rowIndex].destinationAddress,
  },
  {
    id: 'transactionId',
    name: 'column.transactionId',
    className: 'align-left',
    width: getColumnWidth('transactionId', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { transactionId } = filteredData[rowIndex]
      return getCell(transactionId, t)
    },
    copyText: rowIndex => filteredData[rowIndex].transactionId,
  },
  {
    id: 'note',
    name: 'column.note',
    className: 'align-left',
    width: getColumnWidth('note', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) return getCellState(isLoading, isNoData)
      const { note } = filteredData[rowIndex]
      return getCell(note, t)
    },
    copyText: rowIndex => filteredData[rowIndex].note,
  },
]

export default getColumns
