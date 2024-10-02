import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import { fetchData, refresh } from 'state/summaryByAsset/actions'
import {
  getPageLoading,
  getDataReceived,
  getUseMinBalance,
  getMinimumBalance,
  getSummaryByAssetTotal,
  getSummaryByAssetEntries,
} from 'state/summaryByAsset/selectors'
import queryConstants from 'state/query/constants'
import { getTimeRange } from 'state/timeRange/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import { getIsSyncRequired, getIsFirstSyncing } from 'state/sync/selectors'

import { getAssetColumns } from './AppSummary.columns'
import { prepareSummaryByAssetData } from './AppSummary.helpers'

const TYPE = queryConstants.SUMMARY_BY_ASSET

const SummaryActivePositions = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const timeRange = useSelector(getTimeRange)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const total = useSelector(getSummaryByAssetTotal)
  const isFirstSync = useSelector(getIsFirstSyncing)
  const entries = useSelector(getSummaryByAssetEntries)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const minimumBalance = useSelector(getMinimumBalance)
  const useMinimumBalance = useSelector(getUseMinBalance)
  const columnsWidth = useSelector((state) => getColumnsWidth(state, TYPE))
  const isLoading = isFirstSync || (!dataReceived && pageLoading)
  const isNoData = dataReceived && isEmpty(entries)
  const tableClasses = classNames('summary-by-asset-table', {
    'empty-table': isNoData,
  })

  useEffect(() => {
    if (!dataReceived && !pageLoading && !isSyncRequired) {
      dispatch(fetchData())
    }
  }, [dataReceived, pageLoading, isSyncRequired])

  useEffect(() => {
    dispatch(refresh())
  }, [timeRange])

  const preparedData = useMemo(
    () => prepareSummaryByAssetData(entries, total, t, minimumBalance, useMinimumBalance),
    [entries, total, t, minimumBalance, useMinimumBalance],
  )

  const columns = useMemo(
    () => getAssetColumns({
      preparedData, t, isLoading, isNoData, columnsWidth,
    }),
    [preparedData, t, isLoading, isNoData, columnsWidth],
  )

  return (
    <div className='app-summary-item full-width-item'>
      <div className='app-summary-item-title--row'>
        <div>
          <div className='app-summary-item-title'>
            {t('summary.positions.title')}
          </div>
        </div>
      </div>
      <DataTable
        section={TYPE}
        defaultRowHeight={73}
        tableColumns={columns}
        className={tableClasses}
        numRows={isLoading ? 3 : preparedData.length}
      />
    </div>
  )
}

export default SummaryActivePositions
