import React from 'react'
import { Cell } from '@blueprintjs/table'

import { getColumnWidth } from 'utils/columns'
import { formatAmount, fixedFloat } from 'ui/utils'

export const getColumns = ({
  filteredData,
  columnsWidth,
}) => [
  {
    id: 'pair',
    name: 'column.pair',
    width: getColumnWidth('pair', columnsWidth),
    renderer: (rowIndex) => {
      const { pair } = filteredData[rowIndex]
      return (
        <Cell tooltip={pair}>
          {pair}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].pair,
  },
  {
    id: 'buyingWeightedPrice',
    name: 'column.buyingWeightedPrice',
    width: getColumnWidth('buyingWeightedPrice', columnsWidth),
    renderer: (rowIndex) => {
      const { buyingWeightedPrice } = filteredData[rowIndex]
      const fixedPrice = fixedFloat(buyingWeightedPrice)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedPrice}
        >
          {fixedPrice}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].buyingWeightedPrice),
  },
  {
    id: 'buyingAmount',
    name: 'column.buyingAmount',
    width: getColumnWidth('buyingAmount', columnsWidth),
    renderer: (rowIndex) => {
      const { buyingAmount } = filteredData[rowIndex]
      const tooltip = fixedFloat(buyingAmount)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {formatAmount(buyingAmount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].buyingAmount),
  },
  {
    id: 'sellingWeightedPrice',
    name: 'column.sellingWeightedPrice',
    width: getColumnWidth('sellingWeightedPrice', columnsWidth),
    renderer: (rowIndex) => {
      const { sellingWeightedPrice } = filteredData[rowIndex]
      const fixedPrice = fixedFloat(sellingWeightedPrice)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedPrice}
        >
          {fixedPrice}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].sellingWeightedPrice),
  },
  {
    id: 'sellingAmount',
    name: 'column.sellingAmount',
    width: getColumnWidth('sellingAmount', columnsWidth),
    renderer: (rowIndex) => {
      const { sellingAmount } = filteredData[rowIndex]
      const tooltip = fixedFloat(sellingAmount)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {formatAmount(sellingAmount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].sellingAmount),
  },
  {
    id: 'cumulativeWeightedPrice',
    name: 'column.cumulativeWeightedPrice',
    width: getColumnWidth('cumulativeWeightedPrice', columnsWidth),
    renderer: (rowIndex) => {
      const { cumulativeWeightedPrice } = filteredData[rowIndex]
      const fixedPrice = fixedFloat(cumulativeWeightedPrice)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedPrice}
        >
          {fixedPrice}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].cumulativeWeightedPrice),
  },
  {
    id: 'cumulativeAmount',
    name: 'column.cumulativeAmount',
    width: getColumnWidth('cumulativeAmount', columnsWidth),
    renderer: (rowIndex) => {
      const { cumulativeAmount } = filteredData[rowIndex]
      const tooltip = fixedFloat(cumulativeAmount)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {formatAmount(cumulativeAmount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].cumulativeAmount),
  },
]
