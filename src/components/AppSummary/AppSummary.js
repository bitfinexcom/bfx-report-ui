import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import TimeRange from 'ui/TimeRange'
import {
  getData,
  getPageLoading,
  getDataReceived,
} from 'state/accountSummary/selectors'
import { fetchData } from 'state/accountSummary/actions'
import { getIsTurkishSite } from 'state/base/selectors'
import { getIsSyncRequired, getIsFirstSyncing } from 'state/sync/selectors'

import Leo from './AppSummary.leo'
import Fees from './AppSummary.fees'
import Value from './AppSummary.value'
import Profits from './AppSummary.profits'
import ByAsset from './AppSummary.byAsset'
import Positions from './AppSummary.positions'
import Statistics from './AppSummary.statistics'

const AppSummary = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const data = useSelector(getData)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isFirstSync = useSelector(getIsFirstSyncing)
  const isTurkishSite = useSelector(getIsTurkishSite)
  const isSyncRequired = useSelector(getIsSyncRequired)

  useEffect(() => {
    if (!dataReceived && !pageLoading && !isSyncRequired) {
      dispatch(fetchData())
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

export default AppSummary
