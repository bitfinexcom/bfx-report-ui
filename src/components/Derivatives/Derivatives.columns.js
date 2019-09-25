import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import { COLUMN_WIDTHS } from 'utils/columns'

export default function getColumns(props) {
  const {
    filteredData,
    getFullTime,
    t,
    timeOffset,
  } = props

  return [
    {
      id: 'pair',
      name: 'derivatives.column.pair',
      width: COLUMN_WIDTHS.PAIR,
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
      name: 'derivatives.column.price',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { price } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(price)}
          >
            {formatAmount(price)}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].price,
    },
    {
      id: 'priceSpot',
      name: 'derivatives.column.price',
      width: COLUMN_WIDTHS.AMOUNT,
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
      copyText: rowIndex => filteredData[rowIndex].priceSpot,
    },
    {
      id: 'balance',
      name: 'derivatives.column.balance',
      width: COLUMN_WIDTHS.AMOUNT,
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
      copyText: rowIndex => filteredData[rowIndex].fundBal,
    },
    {
      id: 'funding',
      name: 'derivatives.column.funding',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { fundingAccrued } = filteredData[rowIndex]
        const fixedFunding = fixedFloat(fundingAccrued)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFunding}
          >
            {fixedFunding}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].fundingAccrued,
    },
    {
      id: 'step',
      name: 'derivatives.column.step',
      width: 80,
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
      id: 'mts',
      nameStr: `${t('derivatives.column.time')} (${timeOffset})`,
      width: COLUMN_WIDTHS.DATE,
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
  ]
}
