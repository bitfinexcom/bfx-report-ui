import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
  getPageLoading,
  getDataReceived,
  getSummaryByAssetTotal,
  getSummaryByAssetEntries,
} from 'state/summaryByAsset/selectors'
import DataTable from 'ui/DataTable'

import { getAssetColumns } from './AppSummary.columns'
import { prepareSummaryByAssetData } from './AppSummary.helpers'

const AppSummaryByAsset = () => {
  const { t } = useTranslation()
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const total = useSelector(getSummaryByAssetTotal)
  const entries = useSelector(getSummaryByAssetEntries)
  const preparedData = prepareSummaryByAssetData(entries, total, t)
  const columns = getAssetColumns({ preparedData, t })

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
        tableColumns={columns}
        numRows={preparedData.length}
        className='summary-by-asset-table'
      />
    </div>
  )
}

export default AppSummaryByAsset
