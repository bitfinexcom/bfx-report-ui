import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Elevation } from '@blueprintjs/core'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import DataTable from 'ui/DataTable'
import TimeRange from 'ui/TimeRange'
import Pagination from 'ui/Pagination'
import ColumnsFilter from 'ui/ColumnsFilter'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import LedgersCategorySelect from 'ui/LedgersCategorySelect'
import {
  setParams,
  fetchLedgers,
  addTargetSymbol,
  setTargetSymbols,
  removeTargetSymbol,
  clearTargetSymbols,
} from 'state/ledgers/actions'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
  getExistingCoins,
  getTargetSymbols,
  getTargetCategory,
} from 'state/ledgers/selectors'
import queryConstants from 'state/query/constants'
import { getColumns } from 'state/filters/selectors'
import { getIsSyncRequired } from 'state/sync/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import { getFilteredEntries } from 'state/pagination/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import useSymbolFilter from 'hooks/useSymbolFilter'
import useFetchLifecycle from 'hooks/useFetchLifecycle'

import { getColumns as getTableColumns } from './Ledgers.columns'

const TYPE = queryConstants.MENU_LEDGERS

const Ledgers = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const timeOffset = useSelector(getTimeOffset)
  const getFullTimeFn = useSelector(getFullTime)
  const match = useRouteMatch('/ledgers/:symbol')
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const existingCoins = useSelector(getExistingCoins)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const targetCategory = useSelector(getTargetCategory)
  const columns = useSelector(state => getColumns(state, TYPE))
  const columnsWidth = useSelector(state => getColumnsWidth(state, TYPE))
  const entries = useSelector(state => getFilteredEntries(state, TYPE, getEntries(state)))

  useFetchLifecycle(TYPE, {
    match,
    pageLoading,
    dataReceived,
    isSyncRequired,
    fetchData: () => dispatch(fetchLedgers()),
    setTargetSymbols: (s) => dispatch(setTargetSymbols(s)),
  })

  const { targetSymbols, toggleSymbol, clearSymbols } = useSymbolFilter(TYPE, {
    getTargetSymbols,
    addTargetSymbol,
    removeTargetSymbol,
    clearTargetSymbols,
  })

  const onCategoryChange = useCallback((category) => {
    dispatch(setParams({ targetCategory: category ? +category : undefined }))
  }, [dispatch])

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
        <SectionHeaderTitle>
          {t('ledgers.title')}
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
              {t('selector.filter.category')}
            </SectionHeaderItemLabel>
            <LedgersCategorySelect
              value={targetCategory}
              onChange={onCategoryChange}
            />
          </SectionHeaderItem>
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

export default Ledgers
