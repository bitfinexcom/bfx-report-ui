import React, { Fragment } from 'react'
import { Cell, TruncatedFormat } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import { demapPairs, demapSymbols } from 'state/symbols/utils'
import { COLUMN_WIDTHS, getColumnWidth } from 'utils/columns'

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
    return `${fixedFloat(Math.abs(val) * 100, 2)}%`
  }
  return '-'
}

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
      id: 'id',
      name: 'column.id',
      width: getColumnWidth('id', columnsWidth) || COLUMN_WIDTHS.ID,
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        return (
          <Cell tooltip={id}>
            {id}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'orderID',
      name: 'column.orderid',
      width: getColumnWidth('orderID', columnsWidth) || COLUMN_WIDTHS.ORDER_ID,
      renderer: (rowIndex) => {
        const { orderID } = filteredData[rowIndex]
        return (
          <Cell tooltip={orderID}>
            {orderID}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].orderID,
    },
    {
      id: 'pair',
      name: 'column.pair',
      width: getColumnWidth('pair', columnsWidth) || COLUMN_WIDTHS.PAIR,
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
      id: 'execAmount',
      name: 'column.amount',
      width: getColumnWidth('execAmount', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { execAmount } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(execAmount)}
          >
            {formatAmount(execAmount)}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].execAmount),
    },
    {
      id: 'execPrice',
      name: 'column.price',
      width: getColumnWidth('execPrice', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { execPrice } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(execPrice)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].execPrice,
    },
    {
      id: 'fee',
      name: 'column.fee',
      width: getColumnWidth('fee', columnsWidth) || COLUMN_WIDTHS.FEE,
      renderer: (rowIndex) => {
        const { fee, feeCurrency } = filteredData[rowIndex]
        const fixedFee = fixedFloat(fee)
        const tooltip = `${fixedFee} ${feeCurrency}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={tooltip}
          >
            <Fragment>
              {formatAmount(fee)}
              {' '}
              <span className='bitfinex-show-soft'>
                {feeCurrency}
              </span>
            </Fragment>
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].fee),
    },
    {
      id: 'feePercent',
      name: 'column.feePercent',
      width: getColumnWidth('feePercent', columnsWidth) || COLUMN_WIDTHS.FEE_PERC,
      renderer: (rowIndex) => {
        const feePercent = getFeePercent(filteredData[rowIndex])
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={feePercent}
          >
            {feePercent}
          </Cell>
        )
      },
      copyText: rowIndex => getFeePercent(filteredData[rowIndex]),
    },
    {
      id: 'mtsCreate',
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: getColumnWidth('mtsCreate', columnsWidth) || COLUMN_WIDTHS.TRADES_DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsCreate)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsCreate),
    },
  ]
}
