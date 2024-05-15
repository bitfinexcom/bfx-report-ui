import React, { memo, useEffect } from 'react'
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
import {
  fetchTaxReportTransactions,
  refreshTaxReportTransactions,
} from 'state/taxReport/actions'
import {
  getTransactionsData,
  getTransactionsPageLoading,
  getTransactionsDataReceived,
} from 'state/taxReport/selectors'
import { getIsSyncRequired } from 'state/sync/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import { getFullTime as getFullTimeSelector } from 'state/base/selectors'

import queryConstants from 'state/query/constants'

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
  const columnsWidth = useSelector((state) => getColumnsWidth(state, TYPE))

  const isNoData = isEmpty(entries)
  const isLoading = !dataReceived && pageLoading

  useEffect(() => {
    if (!isSyncRequired) {
      dispatch(fetchTaxReportTransactions())
    }
  }, [dispatch, isSyncRequired])

  const tableColumns = getColumns({
    t,
    isNoData,
    isLoading,
    getFullTime,
    columnsWidth,
    filteredData: entries,
  })

  let showContent
  if (isNoData) {
    showContent = (
      <div className='data-table-wrapper'>
        <DataTable
          section={TYPE}
          isNoData={isNoData}
          isLoading={isLoading}
          tableColumns={tableColumns}
          numRows={isLoading ? 5 : 1}
        />
      </div>
    )
  } else {
    showContent = (
      <>
        <DataTable
          section={TYPE}
          tableColumns={tableColumns}
          numRows={isLoading ? 5 : entries.length}
        />
      </>
    )
  }

  return (
    <Card
      elevation={Elevation.ZERO}
      className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
    >
      <SectionHeader>
        <SectionHeaderTitle>
          {t('taxreport.title')}
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
              {t('selector.strategy')}
            </SectionHeaderItemLabel>
            <TaxStrategySelector />
          </SectionHeaderItem>
          <RefreshButton
            disabled={isLoading}
            onClick={() => dispatch(refreshTaxReportTransactions())}
          />
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default memo(TaxReport)
