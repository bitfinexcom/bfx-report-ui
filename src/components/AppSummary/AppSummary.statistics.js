import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
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
  const isLoading = isFirstSync || (!dataReceived && pageLoading)
  console.log('+++total', data)

  const columns = getStatisticsColumns({
    data,
    isLoading,
  })

  let showContent
  if (dataReceived && isEmpty(data)) {
    showContent = <NoData title='summary.no_data' />
  } else {
    showContent = (
      <CollapsedTable
        numRows={1}
        tableColumns={columns}
      />
    )
  }

  return (
    <div className='app-summary-item account-fees'>
      <div className='app-summary-item-title'>
        {t('summary.statistics.title')}
      </div>
      <div className='app-summary-item-sub-title'>
        {t('summary.statistics.sub_title')}
        {`${formatDate(start, timezone)} - ${formatDate(end, timezone)}`}
      </div>
      {showContent}
    </div>
  )
}

AppSummaryStatistics.propTypes = {
  data: PropTypes.shape({
    derivMakerRebate: PropTypes.number,
    derivTakerFee: PropTypes.number,
    makerFee: PropTypes.number,
    takerFeeToCrypto: PropTypes.number,
    takerFeeToFiat: PropTypes.number,
    takerFeeToStable: PropTypes.number,
  }).isRequired,
  isFirstSync: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  isTurkishSite: PropTypes.bool.isRequired,
}

export default memo(AppSummaryStatistics)
