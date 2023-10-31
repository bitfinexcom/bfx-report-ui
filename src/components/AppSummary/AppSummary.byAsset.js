import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import DataTable from 'ui/DataTable'
import {
  getPageLoading,
  getDataReceived,
  getSummaryByAssetTotal,
  getSummaryByAssetEntries,
} from 'state/summaryByAsset/selectors'

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

  let showContent
  if (!dataReceived && pageLoading) {
    showContent = <Loading />
  } else if (isEmpty(entries)) {
    showContent = <NoData />
  } else {
    showContent = (
      <DataTable
        defaultRowHeight={73}
        tableColumns={columns}
        numRows={preparedData.length}
        className='summary-by-asset-table'
      />
    )
  }

  return (
    <div className='app-summary-item full-width-item'>
      <div className='app-summary-item-title'>
        {t('summary.by_asset.title')}
      </div>
      <div className='app-summary-item-sub-title'>
        {t('summary.by_asset.sub_title')}
      </div>
      {showContent}
    </div>
  )
}

export default AppSummaryByAsset
