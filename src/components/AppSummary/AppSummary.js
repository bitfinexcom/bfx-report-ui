import React, { memo, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import TimeRange from 'ui/TimeRange'
import RefreshButton from 'ui/RefreshButton'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import UnrealizedProfitSelector from 'ui/UnrealizedProfitSelector'

import Leo from './AppSummary.leo'
import Fees from './AppSummary.fees'
import Value from './AppSummary.value'
import Profits from './AppSummary.profits'
import ByAsset from './AppSummary.byAsset'

const AppSummary = ({
  t,
  data,
  refresh,
  fetchData,
  setParams,
  pageLoading,
  isFirstSync,
  dataReceived,
  isTurkishSite,
  isSyncRequired,
  refreshBalance,
  refreshProfits,
  currentTimeFrame,
  refreshSummaryByAsset,
  isUnrealizedProfitExcluded,
}) => {
  useEffect(() => {
    if (!dataReceived && !pageLoading && !isSyncRequired) {
      fetchData()
    }
  }, [dataReceived, pageLoading, isSyncRequired])

  const handleTimeFrameChange = (timeframe) => {
    setParams({ timeframe })
  }

  const handleUnrealizedProfitChange = (value) => {
    setParams({ isUnrealizedProfitExcluded: value })
  }

  const onRefresh = useCallback(() => {
    refresh()
    refreshBalance()
    refreshProfits()
    refreshSummaryByAsset()
  }, [refresh, refreshBalance, refreshSummaryByAsset, refreshProfits])

  return (
    <Card
      elevation={Elevation.ZERO}
      className='app-summary-card col-lg-12 col-md-12 col-sm-12 col-xs-12 no-table-scroll'
    >
      <div className='app-summary-wrapper'>
        <SectionHeader>
          <SectionHeaderTitle>
            <div className='app-summary-title-row'>
              <div className='app-summary-title-item'>
                {t('summary.title')}
              </div>
              <div className='app-summary-title-item'>
                <Leo
                  data={data}
                  isLoading={pageLoading}
                />
              </div>
            </div>
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
                value={currentTimeFrame}
                onChange={handleTimeFrameChange}
              />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.unrealized-profits.title')}
              </SectionHeaderItemLabel>
              <UnrealizedProfitSelector
                value={isUnrealizedProfitExcluded}
                onChange={handleUnrealizedProfitChange}
              />
            </SectionHeaderItem>
            <RefreshButton onClick={onRefresh} />
          </SectionHeaderRow>
        </SectionHeader>
        <div className='app-summary-data-row'>
          <Value />
          <Profits />
        </div>
        <ByAsset />
        <div className='app-summary-data-row'>
          <Fees
            t={t}
            data={data}
            pageLoading={pageLoading}
            isFirstSync={isFirstSync}
            dataReceived={dataReceived}
            isTurkishSite={isTurkishSite}
          />
        </div>
      </div>
    </Card>
  )
}

AppSummary.propTypes = {
  data: PropTypes.shape({
    derivMakerRebate: PropTypes.number,
    derivTakerFee: PropTypes.number,
    leoAmountAvg: PropTypes.number,
    leoLev: PropTypes.number,
    makerFee: PropTypes.number,
    takerFeeToCrypto: PropTypes.number,
    takerFeeToFiat: PropTypes.number,
    takerFeeToStable: PropTypes.number,
  }),
  dataReceived: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  isTurkishSite: PropTypes.bool.isRequired,
  isFirstSync: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  refreshBalance: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isSyncRequired: PropTypes.bool.isRequired,
  currentTimeFrame: PropTypes.string.isRequired,
  isUnrealizedProfitExcluded: PropTypes.bool.isRequired,
  refreshSummaryByAsset: PropTypes.func.isRequired,
  refreshProfits: PropTypes.func.isRequired,
}

AppSummary.defaultProps = {
  data: {},
}

export default memo(AppSummary)
