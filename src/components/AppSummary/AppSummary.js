import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { Card, Elevation } from '@blueprintjs/core'

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

import Leo from './AppSummary.leo'
import Fees from './AppSummary.fees'

const AppSummary = ({
  t,
  data,
  refresh,
  fetchData,
  pageLoading,
  dataReceived,
  isTurkishSite,
}) => {
  useEffect(() => {
    if (!dataReceived && !pageLoading) fetchData()
  }, [])

  let showContent
  if (!dataReceived && pageLoading) {
    showContent = <Loading />
  } else if (_isEmpty(data)) {
    showContent = <NoData refresh={refresh} />
  } else {
    showContent = (
      <div className='app-summary-data-row'>
        <Fees
          t={t}
          data={data}
          isTurkishSite={isTurkishSite}
        />
      </div>
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
  t: PropTypes.func.isRequired,
}

AppSummary.defaultProps = {
  data: {},
}

export default memo(AppSummary)
