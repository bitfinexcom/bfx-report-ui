import React, { Fragment } from 'react'
import _endsWith from 'lodash/endsWith'

import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import queryConstants from 'state/query/constants'
import JSONFormat from 'ui/JSONFormat'
import { formatAmount, fixedFloat } from 'ui/utils'
import { COLUMN_WIDTHS, getColumnWidth } from 'utils/columns'

const { MENU_POSITIONS_ACTIVE, MENU_POSITIONS_AUDIT } = queryConstants

export default function getColumns(props) {
  const {
    columnsWidth,
    target,
    filteredData,
    getFullTime,
    t,
    onIdClick,
    timeOffset,
  } = props

  function showType(data) {
    const { marginFundingType, pair } = data

    if (_endsWith(pair, 'PERP')) {
      return t('positions.swap.period')
    }

    return marginFundingType
      ? t('positions.swap.term')
      : t('positions.swap.daily')
  }

  const ACTIVE_POSITIONS_COLS = (target === MENU_POSITIONS_ACTIVE)
    ? [
      {
        id: 'liquidationPrice',
        name: 'column.liq-price',
        width: getColumnWidth('liquidationPrice', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
        renderer: (rowIndex) => {
          const { liquidationPrice } = filteredData[rowIndex]
          const fixedPrice = fixedFloat(liquidationPrice)
          return (
            <Cell
              className='bitfinex-text-align-right'
              tooltip={fixedPrice}
            >
              {fixedPrice}
            </Cell>
          )
        },
        copyText: rowIndex => fixedFloat(filteredData[rowIndex].liquidationPrice),
      },
      {
        id: 'pl',
        name: 'column.pl',
        width: getColumnWidth('pl', columnsWidth) || 100,
        renderer: (rowIndex) => {
          const { pl } = filteredData[rowIndex]
          return (
            <Cell
              className='bitfinex-text-align-right'
              tooltip={fixedFloat(pl)}
            >
              {formatAmount(pl)}
            </Cell>
          )
        },
        copyText: rowIndex => fixedFloat(filteredData[rowIndex].pl),
      },
      {
        id: 'plPerc',
        name: 'column.plperc',
        width: getColumnWidth('plPerc', columnsWidth) || 100,
        renderer: (rowIndex) => {
          const { plPerc } = filteredData[rowIndex]
          return (
            <Cell
              className='bitfinex-text-align-right'
              tooltip={fixedFloat(plPerc)}
            >
              {formatAmount(plPerc)}
            </Cell>
          )
        },
        copyText: rowIndex => fixedFloat(filteredData[rowIndex].plPerc),
      },
    ]
    : []

  const COLLATERAL_META = (target === MENU_POSITIONS_ACTIVE || target === MENU_POSITIONS_AUDIT)
    ? [
      {
        id: 'collateral',
        name: 'column.collateral',
        width: getColumnWidth('collateral', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
        renderer: (rowIndex) => {
          const { collateral } = filteredData[rowIndex]
          const fixedCollateral = fixedFloat(collateral)
          return (
            <Cell
              className='bitfinex-text-align-right'
              tooltip={fixedCollateral}
            >
              {fixedCollateral}
            </Cell>
          )
        },
        copyText: rowIndex => fixedFloat(filteredData[rowIndex].collateral),
      },
      {
        id: 'meta',
        name: 'column.meta',
        width: getColumnWidth('meta', columnsWidth) || COLUMN_WIDTHS.META,
        renderer: (rowIndex) => {
          const { meta = '' } = filteredData[rowIndex]
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
    : []

  return [
    {
      id: 'id',
      name: 'column.id',
      width: getColumnWidth('id', columnsWidth) || COLUMN_WIDTHS.ID,
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        /* eslint-disable jsx-a11y/anchor-is-valid */
        return (
          <Cell tooltip={id}>
            <Fragment>
              <a href='#' onClick={onIdClick} value={id}>{id}</a>
            </Fragment>
          </Cell>
        )
        /* eslint-enable jsx-a11y/anchor-is-valid */
      },
      copyText: rowIndex => filteredData[rowIndex].id,
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
      id: 'amount',
      name: 'column.amount',
      width: getColumnWidth('amount', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { amount } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(amount)}
          >
            {formatAmount(amount)}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
    },
    {
      id: 'basePrice',
      name: 'column.base-price',
      width: getColumnWidth('basePrice', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { basePrice } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(basePrice)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].basePrice),
    },
    ...ACTIVE_POSITIONS_COLS,
    {
      id: 'marginFunding',
      name: 'column.fundingCost',
      width: getColumnWidth('marginFunding', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { marginFunding } = filteredData[rowIndex]
        const fixedSwap = fixedFloat(marginFunding)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedSwap}
          >
            {fixedSwap}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].marginFunding),
    },
    {
      id: 'marginFundingType',
      name: 'column.fundingType',
      width: getColumnWidth('marginFundingType', columnsWidth) || 130,
      renderer: (rowIndex) => {
        const swapType = showType(filteredData[rowIndex])
        return (
          <Cell tooltip={swapType}>
            {swapType}
          </Cell>
        )
      },
      copyText: rowIndex => showType(filteredData[rowIndex]),
    },
    {
      id: 'status',
      name: 'column.status',
      width: getColumnWidth('status', columnsWidth) || 100,
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
      id: 'mtsUpdate',
      nameStr: `${t('column.updated')} (${timeOffset})`,
      width: getColumnWidth('mtsUpdate', columnsWidth) || COLUMN_WIDTHS.DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
    },
    ...COLLATERAL_META,
  ]
}
