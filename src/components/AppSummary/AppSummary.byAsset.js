import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Cell } from '@blueprintjs/table'

// import { formatFee } from 'ui/utils'
import {
  getSummaryByAssetTotal,
  getSummaryByAssetEntries,
} from 'state/summaryByAsset/selectors'
// import CollapsedTable from 'ui/CollapsedTable'
import DataTable from 'ui/DataTable'
import { getTooltipContent } from 'utils/columns'

import { getFeesColumns } from './AppSummary.columns'
import { prepareSummaryByAssetData } from './AppSummary.helpers'

const getColumns = ({
  t,
  preparedData,
}) => [
  {
    id: 'currency',
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

const AppSummaryByAsset = ({
  data,
  isTurkishSite,
}) => {
  const { t } = useTranslation()
  const total = useSelector(getSummaryByAssetTotal)
  const entries = useSelector(getSummaryByAssetEntries)
  const preparedData = prepareSummaryByAssetData(entries, total, t)

  console.log('++preparedData', preparedData)

  const {
    makerFee = 0,
    derivTakerFee = 0,
    takerFeeToFiat = 0,
    takerFeeToStable = 0,
    takerFeeToCrypto = 0,
    derivMakerRebate = 0,
  } = data

  const columns = getFeesColumns({
    makerFee,
    isTurkishSite,
    derivTakerFee,
    takerFeeToFiat,
    takerFeeToStable,
    takerFeeToCrypto,
    derivMakerRebate,
  })

  const assetColumns = getColumns({ preparedData, t })
  console.log('+++assetColumns', assetColumns)

  return (
    <div className='app-summary-item full-width-item'>
      <div className='app-summary-item-title'>
        {t('summary.by_asset.title')}
      </div>
      <div className='app-summary-item-sub-title'>
        {t('summary.by_asset.sub_title')}
      </div>
      {/* <CollapsedTable
        tableColumns={assetColumns}
        numRows={preparedData.length}
      /> */}
      <DataTable
        tableColumns={assetColumns}
        numRows={preparedData.length}
      />
    </div>
  )
}

AppSummaryByAsset.propTypes = {
  data: PropTypes.shape({
    derivMakerRebate: PropTypes.number,
    derivTakerFee: PropTypes.number,
    makerFee: PropTypes.number,
    takerFeeToCrypto: PropTypes.number,
    takerFeeToFiat: PropTypes.number,
    takerFeeToStable: PropTypes.number,
  }).isRequired,
  isTurkishSite: PropTypes.bool.isRequired,
}

export default memo(AppSummaryByAsset)
