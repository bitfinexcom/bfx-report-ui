import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
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
import ByAsset from './AppSummary.byAsset'

const AppSummary = ({
  t,
  data,
  refresh,
  fetchData,
  setParams,
  pageLoading,
  dataReceived,
  isTurkishSite,
  refreshBalance,
  currentTimeFrame,
  isUnrealizedProfitExcluded,
}) => {
  useEffect(() => {
    if (!dataReceived && !pageLoading) fetchData()
  }, [])

  const handleTimeFrameChange = (timeframe) => {
    setParams({ timeframe })
  }

  const handleUnrealizedProfitChange = (value) => {
    setParams({ isUnrealizedProfitExcluded: value })
  }

  let showContent
  if (!dataReceived && pageLoading) {
    showContent = <Loading />
  } else if (isEmpty(data)) {
    showContent = <NoData refresh={refresh} />
  } else {
    showContent = (
      <>
        <div className='app-summary-data-row'>
          <Value />
          <Fees
            t={t}
            data={data}
            isTurkishSite={isTurkishSite}
          />
        </div>
        <div className='app-summary-data-row'>
          <ByAsset
            t={t}
            data={data}
            isTurkishSite={isTurkishSite}
          />
        </div>
      </>
    )
  }
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
            <RefreshButton onClick={refreshBalance} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
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
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  refreshBalance: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  currentTimeFrame: PropTypes.string.isRequired,
  isUnrealizedProfitExcluded: PropTypes.bool.isRequired,
}

AppSummary.defaultProps = {
  data: {},
}

export default memo(AppSummary)
