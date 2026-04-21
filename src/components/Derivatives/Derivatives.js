import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
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
import ColumnsFilter from 'ui/ColumnsFilter'
import DerivativesSyncPref from 'ui/DerivativesSyncPref'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import MultiPairSelector from 'ui/MultiPairSelector'
import {
  addTargetPair,
  setTargetPairs,
  removeTargetPair,
  clearTargetPairs,
  fetchDerivatives,
} from 'state/derivatives/actions'
import { getFullTime, getTimeOffset } from 'state/base/selectors'
import { getInactivePairs, getPairs } from 'state/symbols/selectors'
import {
  getEntries,
  getPageLoading,
  getTargetPairs,
  getDataReceived,
  getExistingPairs,
} from 'state/derivatives/selectors'
import { getColumns } from 'state/filters/selectors'
import { getIsSyncRequired } from 'state/sync/selectors'
import { getColumnsWidth } from 'state/columns/selectors'
import queryConstants from 'state/query/constants'
import useFetchLifecycle from 'hooks/useFetchLifecycle'
import usePairFilter from 'hooks/usePairFilter'

import { getColumns as getTableColumns } from './Derivatives.columns'

const TYPE = queryConstants.MENU_DERIVATIVES

const Derivatives = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const pairs = useSelector(getPairs)
  const entries = useSelector(getEntries)
  const timeOffset = useSelector(getTimeOffset)
  const getFullTimeFn = useSelector(getFullTime)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const match = useRouteMatch('/derivatives/:pair')
  const existingPairs = useSelector(getExistingPairs)
  const inactivePairs = useSelector(getInactivePairs)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const columns = useSelector(state => getColumns(state, TYPE))
  const columnsWidth = useSelector(state => getColumnsWidth(state, TYPE))

  useFetchLifecycle(TYPE, {
    match,
    pageLoading,
    dataReceived,
    isSyncRequired,
    fetchData: () => dispatch(fetchDerivatives()),
    setTargetPairs: (p) => dispatch(setTargetPairs(p)),
  })

  const { targetPairs, togglePair, clearPairs } = usePairFilter(TYPE, {
    getTargetPairs,
    addTargetPair,
    removeTargetPair,
    clearTargetPairs,
  })

  const filteredPairs = useMemo(
    () => pairs.filter(pair => pair.includes('F0') || pair.includes('PERP')),
    [pairs],
  )
  const filteredInactivePairs = useMemo(
    () => inactivePairs.filter(pair => pair.includes('F0') || pair.includes('PERP')),
    [inactivePairs],
  )

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
          {t('derivatives.title')}
        </SectionHeaderTitle>
        <SectionHeaderRow>
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.symbol')}
            </SectionHeaderItemLabel>
            <MultiPairSelector
              currentFilters={targetPairs}
              togglePair={togglePair}
              existingPairs={existingPairs}
              pairs={filteredPairs}
              inactivePairs={filteredInactivePairs}
            />
          </SectionHeaderItem>
          <ClearFiltersButton onClick={clearPairs} />
          <SectionHeaderItem>
            <SectionHeaderItemLabel>
              {t('selector.filter.columns')}
            </SectionHeaderItemLabel>
            <ColumnsFilter target={TYPE} />
          </SectionHeaderItem>
          <DerivativesSyncPref />
        </SectionHeaderRow>
      </SectionHeader>
      {showContent}
    </Card>
  )
}

export default Derivatives
