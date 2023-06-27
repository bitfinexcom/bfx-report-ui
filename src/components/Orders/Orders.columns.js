import React from 'react'
import { Cell } from '@blueprintjs/table'

import JSONFormat from 'ui/JSONFormat'
import { formatAmount, fixedFloat } from 'ui/utils'
import { getColumnWidth } from 'utils/columns'

export const getColumns = ({
  t,
  onIdClick,
  timeOffset,
  getFullTime,
  columnsWidth,
  filteredData,
}) => [
  {
    id: 'id',
    name: 'column.id',
    className: 'align-left',
    width: getColumnWidth('id', columnsWidth),
    renderer: (rowIndex) => {
      const { id, pair, amountExecuted } = filteredData[rowIndex]
      /* eslint-disable jsx-a11y/anchor-is-valid */
      return (
        <Cell tooltip={id}>
          <>
            {amountExecuted
              ? <a href='#' onClick={e => onIdClick(e, { id, pair })}>{id}</a>
              : id}
          </>
        </Cell>
      )
      /* eslint-enable jsx-a11y/anchor-is-valid */
    },
    copyText: rowIndex => filteredData[rowIndex].id,
  },
  {
    id: 'pair',
    name: 'column.pair',
    className: 'align-left',
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
    id: 'type',
    name: 'column.type',
    className: 'align-left',
    width: getColumnWidth('type', columnsWidth),
    renderer: (rowIndex) => {
      const { type } = filteredData[rowIndex]
      return (
        <Cell tooltip={type}>
          {type}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].type,
  },
  {
    id: 'amountOrig',
    name: 'column.amount',
    width: getColumnWidth('amountOrig', columnsWidth),
    renderer: (rowIndex) => {
      const { amountOrig } = filteredData[rowIndex]
      const fixedAmount = fixedFloat(amountOrig)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedAmount}
        >
          {fixedAmount}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountOrig),
  },
  {
    id: 'amountExecuted',
    name: 'column.amount-exe',
    width: getColumnWidth('amountExecuted', columnsWidth),
    renderer: (rowIndex) => {
      const { amountExecuted } = filteredData[rowIndex]
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={fixedFloat(amountExecuted)}
        >
          {formatAmount(amountExecuted)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountExecuted),
  },
  {
    id: 'price',
    name: 'column.price',
    width: getColumnWidth('price', columnsWidth),
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
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].price),
  },
  {
    id: 'priceAvg',
    name: 'column.avgprice',
    width: getColumnWidth('priceAvg', columnsWidth),
    renderer: (rowIndex) => {
      const { priceAvg } = filteredData[rowIndex]
      const fixedPrice = fixedFloat(priceAvg)
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
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].priceAvg),
  },
  {
    id: 'mtsCreate',
    className: 'align-left',
    nameStr: `${t('column.created')} (${timeOffset})`,
    width: getColumnWidth('mtsCreate', columnsWidth),
    renderer: (rowIndex) => {
      const timestamp = getFullTime(filteredData[rowIndex].mtsCreate)
      return (
        <Cell tooltip={timestamp}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsCreate),
  },
  {
    id: 'mtsUpdate',
    className: 'align-left',
    nameStr: `${t('column.updated')} (${timeOffset})`,
    width: getColumnWidth('mtsUpdate', columnsWidth),
    renderer: (rowIndex) => {
      const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
      return (
        <Cell tooltip={timestamp}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
  },
  {
    id: 'status',
    name: 'column.status',
    className: 'align-left',
    width: getColumnWidth('status', columnsWidth),
    renderer: (rowIndex) => {
      const { status } = filteredData[rowIndex]
      return (
        <Cell tooltip={status}>
          {status}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].status,
  },
  {
    id: 'priceTrailing',
    name: 'column.pricetrail',
    width: getColumnWidth('priceTrailing', columnsWidth),
    renderer: (rowIndex) => {
      const { priceTrailing } = filteredData[rowIndex]
      const fixedPrice = fixedFloat(priceTrailing)
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
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].priceTrailing),
  },
  {
    id: 'typePrev',
    name: 'column.typeprev',
    className: 'align-left',
    width: getColumnWidth('typePrev', columnsWidth),
    renderer: (rowIndex) => {
      const { typePrev } = filteredData[rowIndex]
      return (
        <Cell tooltip={typePrev}>
          {typePrev}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].typePrev,
  },
  {
    id: 'meta',
    name: 'column.meta',
    className: 'align-left',
    width: getColumnWidth('meta', columnsWidth),
    renderer: (rowIndex) => {
      const { meta } = filteredData[rowIndex]
      const formattedMeta = JSON.stringify(meta, undefined, 2)

      return (
        <Cell>
          <JSONFormat content={formattedMeta}>
            {formattedMeta}
          </JSONFormat>
        </Cell>
      )
    },
    copyText: rowIndex => JSON.stringify(filteredData[rowIndex].meta) || '',
  },
]
