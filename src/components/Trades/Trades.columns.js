import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import { demapPairs, demapSymbols } from 'state/symbols/utils'
import { getCellState, getColumnWidth, getTooltipContent } from 'utils/columns'

const getFeePercent = (entry) => {
  const {
    fee,
    execAmount,
    execPrice,
    pair,
    feeCurrency,
  } = entry

  const demappedPair = demapPairs(pair, true)
  const demappedFeeCurrency = demapSymbols(feeCurrency, true)
  const [firstCurr, secondCurr] = demappedPair.split(':')
  let val
  if (demappedFeeCurrency === firstCurr) {
    val = fee / execAmount
  }
  if (demappedFeeCurrency === secondCurr) {
    val = fee / (execAmount * execPrice)
  }
  if (val) {
    return `${fixedFloat(Math.abs(val) * 100, 3)}%`
  }
  return '-'
}

export default function getColumns(props) {
  const {
    t,
    isNoData,
    isLoading,
    timeOffset,
    getFullTime,
    filteredData,
    columnsWidth,
  } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      className: 'align-left',
      width: getColumnWidth('id', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) return getCellState(isLoading, isNoData)
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
      id: 'orderID',
      name: 'column.orderid',
      className: 'align-left',
      width: getColumnWidth('orderID', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) return getCellState(isLoading, isNoData)
        const { orderID } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(orderID, t)}>
            {orderID}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].orderID,
    },
    {
      id: 'pair',
      name: 'column.pair',
      className: 'align-left',
      width: getColumnWidth('pair', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) return getCellState(isLoading, isNoData)
        const { pair } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(pair, t)}>
            {pair}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].pair,
    },
    {
      id: 'execAmount',
      name: 'column.amount',
      width: getColumnWidth('execAmount', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) return getCellState(isLoading, isNoData)
        const { execAmount } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(getTooltipContent(execAmount, t))}
          >
            {formatAmount(execAmount)}
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].execAmount),
    },
    {
      id: 'execPrice',
      name: 'column.price',
      width: getColumnWidth('execPrice', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) return getCellState(isLoading, isNoData)
        const { execPrice } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(execPrice)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedPrice, t)}
          >
            {fixedPrice}
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => filteredData[rowIndex].execPrice,
    },
    {
      id: 'fee',
      name: 'column.fee',
      width: getColumnWidth('fee', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) return getCellState(isLoading, isNoData)
        const { fee, feeCurrency } = filteredData[rowIndex]
        const fixedFee = fixedFloat(fee)
        const tooltip = getTooltipContent(`${fixedFee} ${feeCurrency}`, t)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={tooltip}
          >
            <>
              {formatAmount(fee)}
              {' '}
              <span className='bitfinex-show-soft'>
                {feeCurrency}
              </span>
            </>
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].fee),
    },
    {
      id: 'feePercent',
      name: 'column.feePercent',
      width: getColumnWidth('feePercent', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) return getCellState(isLoading, isNoData)
        const feePercent = getFeePercent(filteredData[rowIndex])
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(feePercent, t)}
          >
            {feePercent}
          </Cell>
        )
      },
      copyText: rowIndex => getFeePercent(filteredData[rowIndex]),
    },
    {
      id: 'mtsCreate',
      className: 'align-left',
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: getColumnWidth('mtsCreate', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) return getCellState(isLoading, isNoData)
        const timestamp = getFullTime(filteredData[rowIndex].mtsCreate)
        return (
          <Cell tooltip={getTooltipContent(timestamp, t)}>
            {timestamp}
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsCreate),
    },
  ]
}
