import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Cell } from '@blueprintjs/table'

import {
  getSummaryByAssetTotal,
  getSummaryByAssetEntries,
} from 'state/summaryByAsset/selectors'
import DataTable from 'ui/DataTable'
import { getTooltipContent } from 'utils/columns'

import { prepareSummaryByAssetData } from './AppSummary.helpers'

const getColumns = ({
  t,
  preparedData,
}) => [
  {
    id: 'currency',
    className: 'align-left',
    name: 'summary.by_asset.currency',
    width: 100,
    renderer: (rowIndex) => {
      const { currency } = preparedData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(currency, t)}>
          {currency}
        </Cell>
      )
    },
    copyText: rowIndex => preparedData[rowIndex]?.currency,
  },
  {
    id: 'balance',
    name: 'summary.by_asset.amount',
    width: 140,
    renderer: (rowIndex) => {
      const { balance = null } = preparedData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(balance, t)}>
          {balance}
        </Cell>
      )
    },
    copyText: rowIndex => preparedData[rowIndex]?.balance,
  },
  {
    id: 'balanceUsd',
    name: 'summary.by_asset.balance',
    width: 140,
    renderer: (rowIndex) => {
      const { balanceUsd } = preparedData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(balanceUsd, t)}>
          {balanceUsd}
        </Cell>
      )
    },
    copyText: rowIndex => preparedData[rowIndex]?.balanceUsd,
  },
  {
    id: 'valueChange30dUsd',
    name: 'summary.by_asset.balance_change',
    width: 140,
    renderer: (rowIndex) => {
      const { valueChange30dUsd, valueChange30dPerc } = preparedData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(valueChange30dUsd, t)}>
          {valueChange30dUsd}
          {valueChange30dPerc}
        </Cell>
      )
    },
    copyText: rowIndex => preparedData[rowIndex]?.valueChange30dUsd,
  },
  {
    id: 'result30dUsd',
    name: 'summary.by_asset.profits',
    width: 140,
    renderer: (rowIndex) => {
      const { result30dUsd, result30dPerc } = preparedData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(result30dUsd, t)}>
          {result30dUsd}
          {result30dPerc}
        </Cell>
      )
    },
    copyText: rowIndex => preparedData[rowIndex]?.result30dUsd,
  },
  {
    id: 'volume30dUsd',
    name: 'summary.by_asset.volume',
    width: 140,
    renderer: (rowIndex) => {
      const { volume30dUsd } = preparedData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(volume30dUsd, t)}>
          {volume30dUsd}
        </Cell>
      )
    },
    copyText: rowIndex => preparedData[rowIndex]?.volume30dUsd,
  },
]

const AppSummaryByAsset = () => {
  const { t } = useTranslation()
  const total = useSelector(getSummaryByAssetTotal)
  const entries = useSelector(getSummaryByAssetEntries)
  const preparedData = prepareSummaryByAssetData(entries, total, t)

  console.log('++preparedData', preparedData)

  const assetColumns = getColumns({ preparedData, t })

  return (
    <div className='app-summary-item full-width-item'>
      <div className='app-summary-item-title'>
        {t('summary.by_asset.title')}
      </div>
      <div className='app-summary-item-sub-title'>
        {t('summary.by_asset.sub_title')}
      </div>
      <DataTable
        defaultRowHeight={73}
        tableColumns={assetColumns}
        numRows={preparedData.length}
      />
    </div>
  )
}

export default AppSummaryByAsset
