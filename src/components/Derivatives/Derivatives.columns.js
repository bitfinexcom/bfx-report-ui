import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import { COLUMN_WIDTHS, getColumnWidth } from 'utils/columns'

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
      id: 'pair',
      name: 'column.pair',
      width: getColumnWidth('pair', columnsWidth) || 140,
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
      id: 'price',
      name: 'column.priceDeriv',
      width: getColumnWidth('price', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { price } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(price)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].price),
    },
    {
      id: 'priceSpot',
      name: 'column.priceSpot',
      width: getColumnWidth('priceSpot', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { priceSpot } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(priceSpot)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].priceSpot),
    },
    {
      id: 'fundBal',
      name: 'column.fundBalance',
      width: getColumnWidth('fundBal', columnsWidth) || 205,
      renderer: (rowIndex) => {
        const { fundBal } = filteredData[rowIndex]
        const fixedBalance = fixedFloat(fundBal)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedBalance}
          >
            {fixedBalance}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].fundBal),
    },
    {
      id: 'fundingAccrued',
      name: 'column.fundingAccrued',
      width: getColumnWidth('fundingAccrued', columnsWidth) || 185,
      renderer: (rowIndex) => {
        const { fundingAccrued } = filteredData[rowIndex]
        const fixedFunding = fixedFloat(fundingAccrued)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFunding}
          >
            {formatAmount(fundingAccrued)}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].fundingAccrued),
    },
    {
      id: 'fundingStep',
      name: 'column.fundingStep',
      width: getColumnWidth('fundingStep', columnsWidth) || 155,
      renderer: (rowIndex) => {
        const { fundingStep } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fundingStep}
          >
            {fundingStep}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].fundingStep,
    },
    {
      id: 'timestamp',
      nameStr: `${t('column.updated')} (${timeOffset})`,
      width: getColumnWidth('timestamp', columnsWidth) || COLUMN_WIDTHS.DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].timestamp)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].timestamp),
    },
    {
      id: 'clampMin',
      name: 'column.clampMin',
      width: getColumnWidth('clampMin', columnsWidth) || 155,
      renderer: (rowIndex) => {
        const { clampMin } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={clampMin}
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
      width: getColumnWidth('clampMax', columnsWidth) || 155,
      renderer: (rowIndex) => {
        const { clampMax } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={clampMax}
          >
            {clampMax}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].clampMax,
    },
  ]
}
