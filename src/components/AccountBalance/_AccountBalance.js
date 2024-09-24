import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Elevation } from '@blueprintjs/core'
import _sortBy from 'lodash/sortBy'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import Chart from 'ui/Charts/Chart'
import TimeRange from 'ui/TimeRange'
import RefreshButton from 'ui/RefreshButton'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import parseChartData from 'ui/Charts/Charts.helpers'
import UnrealizedProfitSelector from 'ui/UnrealizedProfitSelector'
import queryConstants from 'state/query/constants'
import {
  refresh,
  setParams,
  fetchBalance,
} from 'state/accountBalance/actions'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
  getCurrentTimeFrame,
  getIsUnrealizedProfitExcluded,
} from 'state/accountBalance/selectors'
import { getTimeRange } from 'state/timeRange/selectors'
import { getIsSyncRequired, getIsFirstSyncing } from 'state/sync/selectors'

const TYPE = queryConstants.MENU_ACCOUNT_BALANCE

const AccountBalance = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  const timeRange = useSelector(getTimeRange)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isFirstSync = useSelector(getIsFirstSyncing)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const currTimeFrame = useSelector(getCurrentTimeFrame)
  const isLoading = isFirstSync || (!dataReceived && pageLoading)
  const isProfitExcluded = useSelector(getIsUnrealizedProfitExcluded)

  useEffect(() => {
    if (!dataReceived && !pageLoading && !isSyncRequired) {
      dispatch(fetchBalance())
    }
  }, [timeRange, dataReceived, pageLoading, isSyncRequired])

  const handleTimeframeChange = (timeframe) => {
    dispatch(setParams({ timeframe }))
  }

  const handleUnrealizedProfitChange = (isUnrealizedProfitExcluded) => {
    dispatch(setParams({ isUnrealizedProfitExcluded }))
  }

  const { chartData, presentCurrencies } = useMemo(
    () => parseChartData({
      timeframe: currTimeFrame,
      data: _sortBy(entries, ['mts']),
    }), [currTimeFrame, entries],
  )

  let showContent
  if (isLoading) {
    showContent = <Loading />
  } else if (isEmpty(entries)) {
    showContent = <NoData />
  } else {
    showContent = (
      <Chart
        data={chartData}
        dataKeys={presentCurrencies}
      />
    )
  }
  return (
    <Card
      elevation={Elevation.ZERO}
      className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
    >
      <SectionHeader>
        <SectionHeaderTitle>
          {t('accountbalance.title')}
        </SectionHeaderTitle>
        <SectionHeaderRow>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.date')}
            </SectionHeaderItemLabel>
            <TimeRange className='section-header-time-range' />
          </SectionHeaderItem>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.select')}
            </SectionHeaderItemLabel>
            <TimeFrameSelector
              value={timeRange}
              onChange={handleTimeframeChange}
            />
          </SectionHeaderItem>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.unrealized-profits.title')}
            </SectionHeaderItemLabel>
            <UnrealizedProfitSelector
              value={isProfitExcluded}
              onChange={handleUnrealizedProfitChange}
            />
          </SectionHeaderItem>
          <RefreshButton onClick={() => dispatch(refresh)} />
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

AccountBalance.propTypes = {
  currentFetchParams: PropTypes.shape({
    timeframe: PropTypes.string,
    isUnrealizedProfitExcluded: PropTypes.bool,
  }),
  dataReceived: PropTypes.bool.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({
    mts: PropTypes.number,
    USD: PropTypes.number,
  })),
  isUnrealizedProfitExcluded: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  timeframe: PropTypes.string.isRequired,
}

AccountBalance.defaultProps = {
  currentFetchParams: {},
  entries: [],
}

export default AccountBalance
