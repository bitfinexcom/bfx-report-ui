import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Card, Elevation } from '@blueprintjs/core'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import Pagination from 'ui/Pagination'
import TimeRange from 'ui/TimeRange'
import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import ColumnsFilter from 'ui/ColumnsFilter'
import SectionSwitch from 'ui/SectionSwitch'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import {
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
  fetchAffiliatesEarnings,
} from 'state/affiliatesEarnings/actions'
import {
  getEntries,
  getPageLoading,
  getTargetSymbols,
  getDataReceived,
  getExistingCoins,
} from 'state/affiliatesEarnings/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import { getColumns } from 'state/filters/selectors'
import { getIsSyncRequired } from 'state/sync/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'
import useFetchLifecycle from 'hooks/useFetchLifecycle'
import useSymbolFilter from 'hooks/useSymbolFilter'
import { getColumns as getTableColumns } from 'components/Ledgers/Ledgers.columns'

import AffiliatesLink from './AffiliatesEarnings.link'

const TYPE = queryConstants.MENU_AFFILIATES_EARNINGS

const AffiliatesEarnings = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const timeOffset = useSelector(getTimeOffset)
  const getFullTimeFn = useSelector(getFullTime)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const existingCoins = useSelector(getExistingCoins)
  const match = useRouteMatch('/affiliates/:symbol')
  const isSyncRequired = useSelector(getIsSyncRequired)
  const columns = useSelector(state => getColumns(state, TYPE))
  const columnsWidth = useSelector(state => getColumnsWidth(state, TYPE))
  const entries = useSelector(state => getFilteredEntries(state, TYPE, getEntries(state)))

  useFetchLifecycle(TYPE, {
    match,
    pageLoading,
    dataReceived,
    isSyncRequired,
    fetchData: () => dispatch(fetchAffiliatesEarnings()),
    setTargetSymbols: (s) => dispatch(setTargetSymbols(s)),
  })

  const { targetSymbols, toggleSymbol, clearSymbols } = useSymbolFilter(TYPE, {
    getTargetSymbols,
    addTargetSymbol,
    removeTargetSymbol,
    clearTargetSymbols,
  })

  const isNoData = isEmpty(entries)
  const isLoading = !dataReceived && pageLoading
  const tableColumns = getTableColumns({
    t,
    isNoData,
    isLoading,
    timeOffset,
    columnsWidth,
    filteredData: entries,
    getFullTime: getFullTimeFn,
  }).filter(({ id }) => columns[id])

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
      <div className='data-table-wrapper'>
        <DataTable
          section={TYPE}
          tableColumns={tableColumns}
          numRows={isLoading ? 5 : entries.length}
        />
        <Pagination
          target={TYPE}
          loading={pageLoading}
        />
      </div>
    )
  }

  return (
    <Card
      elevation={Elevation.ZERO}
      className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
    >
      <SectionHeader>
        <SectionHeaderTitle getTitleLink={() => <AffiliatesLink />}>
          {t('affiliatesearnings.title')}
        </SectionHeaderTitle>
        <SectionSwitch target={TYPE} />
        <SectionHeaderRow>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.date')}
            </SectionHeaderItemLabel>
            <TimeRange className='section-header-time-range' />
          </SectionHeaderItem>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.symbol')}
            </SectionHeaderItemLabel>
            <MultiSymbolSelector
              existingCoins={existingCoins}
              currentFilters={targetSymbols}
              toggleSymbol={toggleSymbol}
            />
          </SectionHeaderItem>
          <ClearFiltersButton onClick={clearSymbols} />
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.columns')}
            </SectionHeaderItemLabel>
            <ColumnsFilter target={TYPE} />
          </SectionHeaderItem>
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default AffiliatesEarnings
