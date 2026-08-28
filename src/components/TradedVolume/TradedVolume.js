import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Card, Elevation } from '@blueprintjs/core'
import classNames from 'classnames'
import { isEmpty, orderBy } from '@bitfinex/lib-js-util-base'

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
import InitSyncNote from 'ui/InitSyncNote'
import SectionSwitch from 'ui/SectionSwitch'
import MultiPairSelector from 'ui/MultiPairSelector'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import parseChartData from 'ui/Charts/Charts.helpers'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import queryConstants from 'state/query/constants'
import {
  setParams,
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
  fetchTradedVolume,
} from 'state/tradedVolume/actions'
import { setShouldRefreshAfterSync } from 'state/sync/actions'
import {
  getParams,
  getEntries,
  getTargetPairs,
  getPageLoading,
  getDataReceived,
} from 'state/tradedVolume/selectors'
import {
  getIsSyncRequired,
  getIsFirstSyncing,
  getShouldRefreshAfterSync,
} from 'state/sync/selectors'
import { getIsTimeframeMoreThanYear } from 'state/timeRange/selectors'
import usePairFilter from 'hooks/usePairFilter'
import useFetchLifecycle from 'hooks/useFetchLifecycle'

const TYPE = queryConstants.MENU_TRADED_VOLUME

const TradedVolume = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const params = useSelector(getParams)
  const entries = useSelector(getEntries)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const match = useRouteMatch('/traded_volume/:pair')
  const isSyncRequired = useSelector(getIsSyncRequired)
  const isFirstSyncing = useSelector(getIsFirstSyncing)
  const shouldShowYear = useSelector(getIsTimeframeMoreThanYear)
  const shouldRefreshAfterSync = useSelector(getShouldRefreshAfterSync)

  const { timeframe } = params

  useFetchLifecycle(TYPE, {
    match,
    params,
    pageLoading,
    dataReceived,
    isSyncRequired,
    shouldRefreshAfterSync,
    fetchData: () => dispatch(fetchTradedVolume()),
    setTargetPairs: (p) => dispatch(setTargetPairs(p)),
    setShouldRefreshAfterSync: (v) => dispatch(setShouldRefreshAfterSync(v)),
  })

  const { targetPairs, togglePair, clearPairs } = usePairFilter(TYPE, {
    getTargetPairs,
    addTargetPair,
    removeTargetPair,
    clearTargetPairs,
  })

  const handleTimeframeChange = useCallback((tf) => {
    dispatch(setParams({ timeframe: tf }))
  }, [dispatch])

  const { chartData, presentCurrencies } = useMemo(
    () => parseChartData({
      timeframe,
      shouldShowYear,
      data: orderBy(entries, ['mts']),
    }),
    [entries, timeframe, shouldShowYear],
  )

  const paramChangerClass = classNames({ disabled: isFirstSyncing })

  let showContent
  if (isFirstSyncing) {
    showContent = <InitSyncNote />
  } else if (!dataReceived && pageLoading) {
    showContent = <Loading />
  } else if (isEmpty(entries)) {
    showContent = <NoData />
  } else {
    showContent = (
      <Chart
        isSumUpEnabled
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
          {t('tradedvolume.title')}
        </SectionHeaderTitle>
        <SectionSwitch target={TYPE} />
        <SectionHeaderRow>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.date')}
            </SectionHeaderItemLabel>
            <TimeRange className={paramChangerClass} />
          </SectionHeaderItem>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.symbol')}
            </SectionHeaderItemLabel>
            <MultiPairSelector
              togglePair={togglePair}
              currentFilters={targetPairs}
              className={paramChangerClass}
            />
          </SectionHeaderItem>
          <ClearFiltersButton onClick={clearPairs} />
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.select')}
            </SectionHeaderItemLabel>
            <TimeFrameSelector
              value={timeframe}
              className={paramChangerClass}
              onChange={handleTimeframeChange}
            />
          </SectionHeaderItem>
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default TradedVolume
