import React, {
  useMemo, useEffect, useCallback, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import TimeRange from 'ui/TimeRange'
import RefreshButton from 'ui/RefreshButton'
import TaxStrategySelector from 'ui/TaxStrategySelector'
import FeesDeductionSelector from 'ui/FeesDeductionSelector'
import { fetchTaxReportTransactions } from 'state/taxReport/actions'
import {
  getTransactionsDataEntries,
  getTransactionsPageLoading,
  getTransactionsDataReceived,
  getTransactionsShowDisclaimer,
} from 'state/taxReport/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import { getFullTime as getFullTimeSelector } from 'state/base/selectors'
import { getIsSyncRequired, getIsFirstSyncing } from 'state/sync/selectors'

import queryConstants from 'state/query/constants'

import Loader from './TaxReport.loader'
import SyncNote from './TaxReport.note'
import Disclaimer from './TaxReport.disclaimer'
import { getColumns } from './TaxReport.columns'

const TYPE = queryConstants.MENU_TAX_REPORT

const TaxReport = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getTransactionsDataEntries)
  const getFullTime = useSelector(getFullTimeSelector)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const pageLoading = useSelector(getTransactionsPageLoading)
  const dataReceived = useSelector(getTransactionsDataReceived)
  const showDisclaimer = useSelector(getTransactionsShowDisclaimer)
  const columnsWidth = useSelector((state) => getColumnsWidth(state, TYPE))
  const isNoData = isEmpty(entries)
  const isLoading = !dataReceived && pageLoading
  const isFirstSyncing = useSelector(getIsFirstSyncing)
  const shouldFetchTaxReport = !isSyncRequired && !dataReceived && !isLoading
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (shouldFetchTaxReport) dispatch(fetchTaxReportTransactions())
  }, [shouldFetchTaxReport])

  const onRefresh = useCallback(
    () => dispatch(fetchTaxReportTransactions()),
    [dispatch],
  )

  const columns = useMemo(
    () => getColumns({
      t, entries, isNoData, isLoading, getFullTime, columnsWidth,
    }),
    [t, entries, isNoData, isLoading, getFullTime, columnsWidth],
  )

  // const switchClasses = classNames('switch-btn', {
  //   active: isActive,
  // })

  let showContent
  if (isFirstSyncing) {
    showContent = <SyncNote />
  } else if (isLoading) {
    showContent = <Loader />
  } else if (isNoData) {
    showContent = (
      <div className='data-table-wrapper'>
        <DataTable
          section={TYPE}
          isNoData={isNoData}
          isLoading={isLoading}
          tableColumns={columns}
          numRows={isLoading ? 5 : 1}
        />
      </div>
    )
  } else {
    showContent = (
      <>
        <DataTable
          section={TYPE}
          tableColumns={columns}
          numRows={isLoading ? 5 : entries.length}
        />
      </>
    )
  }

  return (
    <Card
      elevation={Elevation.ZERO}
      className='tax-report col-lg-12 col-md-12 col-sm-12 col-xs-12'
    >
      <SectionHeader>
        <SectionHeaderTitle>
          {t('taxreport.title')}
        </SectionHeaderTitle>
        {showDisclaimer && (
          <SectionHeaderRow>
            <Disclaimer />
          </SectionHeaderRow>
        )}
        <SectionHeaderRow>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.date')}
            </SectionHeaderItemLabel>
            <TimeRange className='section-header-time-range' />
          </SectionHeaderItem>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.strategy')}
            </SectionHeaderItemLabel>
            <TaxStrategySelector />
          </SectionHeaderItem>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.fees-deduction.title')}
            </SectionHeaderItemLabel>
            <FeesDeductionSelector
              value={isActive}
              onChange={() => setIsActive(!isActive)}
            />
          </SectionHeaderItem>
          <RefreshButton
            onClick={onRefresh}
            label={t('taxreport.generation.btn')}
            disabled={isFirstSyncing || isLoading}
          />
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default TaxReport
