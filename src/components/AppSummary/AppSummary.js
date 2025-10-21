import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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

import Leo from './AppSummary.leo'
import Fees from './AppSummary.fees'
import Value from './AppSummary.value'
import Profits from './AppSummary.profits'
import ByAsset from './AppSummary.byAsset'
import Positions from './AppSummary.positions'
import Statistics from './AppSummary.statistics'

const AppSummary = ({
  data,
  fetchData,
  pageLoading,
  isFirstSync,
  dataReceived,
  isTurkishSite,
  isSyncRequired,
}) => {
  const { t } = useTranslation()
  useEffect(() => {
    if (!dataReceived && !pageLoading && !isSyncRequired) {
      fetchData()
    }
  }, [dataReceived, pageLoading, isSyncRequired])

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
          </SectionHeaderRow>
        </SectionHeader>
        <div className='app-summary-data-row'>
          <Value />
          <Profits />
        </div>
        <ByAsset />
        <Positions />
        <div className='app-summary-data-row'>
          <Statistics />
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
  isSyncRequired: PropTypes.bool.isRequired,
}

AppSummary.defaultProps = {
  data: {},
}

export default memo(AppSummary)
