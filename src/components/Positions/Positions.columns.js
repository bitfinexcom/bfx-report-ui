import React, { Fragment } from 'react'

import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import queryConstants from 'state/query/constants'
import { formatAmount, fixedFloat } from 'ui/utils'
import { COLUMN_WIDTHS } from 'utils/columns'

const { MENU_POSITIONS_ACTIVE, MENU_POSITIONS_AUDIT } = queryConstants

export default function getColumns(props) {
  const {
    target,
    filteredData,
    getFullTime,
    t,
    onIdClick,
    timeOffset,
  } = props

  function showType(swapType) {
    return swapType
      ? t('positions.swap.term')
      : t('positions.swap.daily')
  }

  const ACTIVE_POSITIONS_COLS = (target === MENU_POSITIONS_ACTIVE)
    ? [
      {
        id: 'priceLiq',
        name: 'positions.column.liq-price',
        width: COLUMN_WIDTHS.AMOUNT,
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
        copyText: rowIndex => filteredData[rowIndex].liquidationPrice,
      },
      {
        id: 'pl',
        name: 'positions.column.pl',
        width: 100,
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
        copyText: rowIndex => filteredData[rowIndex].pl,
      },
      {
        id: 'plperc',
        name: 'positions.column.plperc',
        width: 100,
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
        copyText: rowIndex => filteredData[rowIndex].plPerc,
      },
    ]
    : []

  const COLLATERAL_META = (target === MENU_POSITIONS_ACTIVE || target === MENU_POSITIONS_AUDIT)
    ? [
      {
        id: 'collateral',
        name: 'positions.column.collateral',
        width: COLUMN_WIDTHS.AMOUNT,
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
        copyText: rowIndex => filteredData[rowIndex].collateral,
      },
      {
        id: 'meta',
        name: 'positions.column.meta',
        width: 160,
        renderer: (rowIndex) => {
          const { meta = '' } = filteredData[rowIndex]
          const metaData = JSON.stringify(meta)
          return (
            <Cell tooltip={metaData}>
              <TruncatedFormat>
                {metaData}
              </TruncatedFormat>
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
      width: COLUMN_WIDTHS.ID,
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
      name: 'positions.column.pair',
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
      id: 'amount',
      name: 'positions.column.amount',
      width: COLUMN_WIDTHS.AMOUNT,
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
      copyText: rowIndex => filteredData[rowIndex].amount,
    },
    {
      id: 'basePrice',
      name: 'positions.column.base-price',
      width: COLUMN_WIDTHS.AMOUNT,
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
      copyText: rowIndex => filteredData[rowIndex].basePrice,
    },
    ...ACTIVE_POSITIONS_COLS,
    {
      id: 'swap',
      name: 'positions.column.swap',
      width: COLUMN_WIDTHS.AMOUNT,
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
      copyText: rowIndex => filteredData[rowIndex].marginFunding,
    },
    {
      id: 'swapType',
      name: 'positions.column.swap-type',
      width: 130,
      renderer: (rowIndex) => {
        const swapType = showType(filteredData[rowIndex].marginFundingType)
        return (
          <Cell tooltip={swapType}>
            {swapType}
          </Cell>
        )
      },
      copyText: rowIndex => showType(filteredData[rowIndex].marginFundingType),
    },
    {
      id: 'status',
      name: 'positions.column.status',
      width: 100,
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
      nameStr: `${t('positions.column.update')} (${timeOffset})`,
      width: COLUMN_WIDTHS.DATE,
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
