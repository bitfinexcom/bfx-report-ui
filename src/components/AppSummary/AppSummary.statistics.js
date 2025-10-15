import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import NoData from 'ui/NoData'
import CollapsedTable from 'ui/CollapsedTable'
import { formatDate } from 'state/utils'
import { getTimezone } from 'state/base/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getIsFirstSyncing } from 'state/sync/selectors'
import {
  getPageLoading,
  getDataReceived,
  getSummaryByAssetTotal,
} from 'state/summaryByAsset/selectors'

import { getStatisticsColumns } from './AppSummary.columns'

const AppSummaryStatistics = () => {
  const { t } = useTranslation()
  const timezone = useSelector(getTimezone)
  const pageLoading = useSelector(getPageLoading)
  const data = useSelector(getSummaryByAssetTotal)
  const { start, end } = useSelector(getTimeFrame)
  const dataReceived = useSelector(getDataReceived)
  const isFirstSync = useSelector(getIsFirstSyncing)
  const isNoData = dataReceived && isEmpty(data)
  const isLoading = isFirstSync || (!dataReceived && pageLoading)
  console.log('+++total', data)

  const columns = useMemo(
    () => getStatisticsColumns({ data, isLoading }),
    [data, isLoading],
  )

  return (
    <div className='app-summary-item account-fees'>
      <div className='app-summary-item-title'>
        {t('summary.statistics.title')}
      </div>
      <div className='app-summary-item-sub-title'>
        {t('summary.statistics.sub_title')}
        {`${formatDate(start, timezone)} - ${formatDate(end, timezone)}`}
      </div>
      {isNoData ? (
        <NoData title={t('summary.no_data')} />
      ) : (
        <CollapsedTable
          numRows={1}
          tableColumns={columns}
        />
      )}
    </div>
  )
}

export default AppSummaryStatistics
