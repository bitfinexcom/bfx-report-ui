import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import { getColumnWidth, getTooltipContent } from 'utils/columns'

export const getColumns = ({
  t,
  timeOffset,
  getFullTime,
  filteredData,
  columnsWidth,
}) => [
  {
    id: 'pair',
    name: 'column.pair',
    className: 'align-left',
    width: getColumnWidth('pair', columnsWidth),
    renderer: (rowIndex) => {
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
    id: 'price',
    name: 'column.priceDeriv',
    width: getColumnWidth('price', columnsWidth),
    renderer: (rowIndex) => {
      const { price } = filteredData[rowIndex]
      const fixedPrice = fixedFloat(price)
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
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].price),
  },
  {
    id: 'priceSpot',
    name: 'column.priceSpot',
    width: getColumnWidth('priceSpot', columnsWidth),
    renderer: (rowIndex) => {
      const { priceSpot } = filteredData[rowIndex]
      const fixedPrice = fixedFloat(priceSpot)
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
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].priceSpot),
  },
  {
    id: 'fundBal',
    name: 'column.fundBalance',
    width: getColumnWidth('fundBal', columnsWidth),
    renderer: (rowIndex) => {
      const { fundBal } = filteredData[rowIndex]
      const fixedBalance = fixedFloat(fundBal)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedBalance, t)}
        >
          {fixedBalance}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].fundBal),
  },
  {
    id: 'fundingAccrued',
    name: 'column.fundingAccrued',
    width: getColumnWidth('fundingAccrued', columnsWidth),
    renderer: (rowIndex) => {
      const { fundingAccrued } = filteredData[rowIndex]
      const fixedFunding = fixedFloat(fundingAccrued)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedFunding, t)}
        >
          {formatAmount(fundingAccrued)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].fundingAccrued),
  },
  {
    id: 'fundingStep',
    name: 'column.fundingStep',
    width: getColumnWidth('fundingStep', columnsWidth),
    renderer: (rowIndex) => {
      const { fundingStep } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fundingStep, t)}
        >
          {fundingStep}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].fundingStep,
  },
  {
    id: 'timestamp',
    className: 'align-left',
    nameStr: `${t('column.updated')} (${timeOffset})`,
    width: getColumnWidth('timestamp', columnsWidth),
    renderer: (rowIndex) => {
      const timestamp = getFullTime(filteredData[rowIndex].timestamp)
      return (
        <Cell tooltip={getTooltipContent(timestamp, t)}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].timestamp),
  },
  {
    id: 'clampMin',
    name: 'column.clampMin',
    width: getColumnWidth('clampMin', columnsWidth),
    renderer: (rowIndex) => {
      const { clampMin } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(clampMin, t)}
        >
          {clampMin}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].clampMin,
  },
  {
    id: 'clampMax',
    name: 'column.clampMax',
    width: getColumnWidth('clampMax', columnsWidth),
    renderer: (rowIndex) => {
      const { clampMax } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(clampMax, t)}
        >
          {clampMax}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].clampMax,
  },
]
