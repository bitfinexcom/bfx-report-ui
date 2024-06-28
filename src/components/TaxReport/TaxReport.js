import React, { useMemo, useEffect, useCallback } from 'react'
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
import { fetchTaxReportTransactions } from 'state/taxReport/actions'
import {
  getTransactionsData,
  getTransactionsPageLoading,
  getTransactionsDataReceived,
  getTransactionsShowDisclaimer,
} from 'state/taxReport/selectors'
import { getIsSyncRequired } from 'state/sync/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import { getFullTime as getFullTimeSelector } from 'state/base/selectors'

import queryConstants from 'state/query/constants'

import Disclaimer from './TaxReport.disclaimer'
import { getColumns } from './TaxReport.columns'

const TYPE = queryConstants.MENU_TAX_REPORT

const TaxReport = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getTransactionsData)
  const getFullTime = useSelector(getFullTimeSelector)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const pageLoading = useSelector(getTransactionsPageLoading)
  const dataReceived = useSelector(getTransactionsDataReceived)
  const showDisclaimer = useSelector(getTransactionsShowDisclaimer)
  const columnsWidth = useSelector((state) => getColumnsWidth(state, TYPE))
  const isNoData = isEmpty(entries)
  const isLoading = !dataReceived && pageLoading

  console.log('++showDisclaimer', showDisclaimer)

  useEffect(() => {
    if (!isSyncRequired && isNoData) dispatch(fetchTaxReportTransactions())
  }, [isSyncRequired, isNoData])

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

  let showContent
  if (isNoData) {
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
          <RefreshButton
            onClick={onRefresh}
            disabled={isLoading}
          />
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default TaxReport
