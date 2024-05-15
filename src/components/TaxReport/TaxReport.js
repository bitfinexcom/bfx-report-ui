import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
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

import queryConstants from 'state/query/constants'

import { getColumns } from './TaxReport.columns'

const TYPE = queryConstants.MENU_TAX_REPORT

const TaxReport = ({
  t,
  entries,
  refresh,
  fetchData,
  getFullTime,
  pageLoading,
  dataReceived,
  columnsWidth,
  isSyncRequired,
}) => {
  const isNoData = isEmpty(entries)
  const isLoading = !dataReceived && pageLoading

  useEffect(() => {
    if (!dataReceived && !isLoading && !isSyncRequired) {
      fetchData()
    }
  }, [dataReceived, isLoading, isSyncRequired])

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
            onClick={refresh}
            disabled={isLoading}
          />
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

TaxReport.propTypes = {
  dataReceived: PropTypes.bool.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({
    asset: PropTypes.string,
  })),
  columnsWidth: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    width: PropTypes.number,
  })),
  pageLoading: PropTypes.bool.isRequired,
  isSyncRequired: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  getFullTime: PropTypes.func.isRequired,
}

TaxReport.defaultProps = {
  entries: [],
  columnsWidth: [],
}

export default memo(TaxReport)
