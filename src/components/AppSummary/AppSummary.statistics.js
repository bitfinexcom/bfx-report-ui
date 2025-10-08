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

import { getFeesColumns } from './AppSummary.columns'
import { getFeeTierVolume } from './AppSummary.helpers'

const AppSummaryStatistics = ({
  data,
  pageLoading,
  isFirstSync,
  dataReceived,
  isTurkishSite,
}) => {
  const { t } = useTranslation()
  const timezone = useSelector(getTimezone)
  const { start, end } = useSelector(getTimeFrame)
  const {
    makerFee = 0,
    derivTakerFee = 0,
    takerFeeToFiat = 0,
    takerFeeToStable = 0,
    takerFeeToCrypto = 0,
    derivMakerRebate = 0,
  } = data
  const isLoading = isFirstSync || (!dataReceived && pageLoading)

  const feeTierVolume = useMemo(
    () => getFeeTierVolume(data),
    [data],
  )

  const columns = getFeesColumns({
    makerFee,
    isLoading,
    feeTierVolume,
    isTurkishSite,
    derivTakerFee,
    takerFeeToFiat,
    takerFeeToStable,
    takerFeeToCrypto,
    derivMakerRebate,
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
