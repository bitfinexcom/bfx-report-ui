import React, { PureComponent } from 'react'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import Pagination from 'ui/Pagination'
import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import TimeRange from 'ui/TimeRange'
import RefreshButton from 'ui/RefreshButton'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import LedgersCategorySelect from 'ui/LedgersCategorySelect'
import ColumnsFilter from 'ui/ColumnsFilter'
import queryConstants from 'state/query/constants'
import {
  clearAll,
  checkInit,
  checkFetch,
  toggleSymbol,
} from 'state/utils'

import getColumns from './Ledgers.columns'
import { propTypes, defaultProps } from './Ledgers.props'

const TYPE = queryConstants.MENU_LEDGERS

class Ledgers extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  toggleSymbol = symbol => toggleSymbol(TYPE, this.props, symbol)

  clearSymbols = () => {
    const { clearTargetSymbols } = this.props
    clearAll(TYPE, this.props)
    clearTargetSymbols()
  }

  onCategoryChange = (targetCategory) => {
    const { setParams } = this.props
    setParams({ targetCategory: targetCategory ? +targetCategory : undefined })
  }

  render() {
    const {
      t,
      columns,
      entries,
      refresh,
      timeOffset,
      pageLoading,
      getFullTime,
      dataReceived,
      targetSymbols,
      existingCoins,
      targetCategory,
      clearTargetSymbols,
    } = this.props
    const tableColumns = getColumns({
      t,
      timeOffset,
      getFullTime,
      filteredData: entries,
    }).filter(({ id }) => columns[id])

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <>
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination loading={pageLoading} target={TYPE} />
        </>
      )
    }

    return (
      <Card
        elevation={Elevation.ZERO}
        className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader>
          <SectionHeaderTitle>{t('ledgers.title')}</SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <MultiSymbolSelector
                existingCoins={existingCoins}
                currentFilters={targetSymbols}
                toggleSymbol={this.toggleSymbol}
              />
            </SectionHeaderItem>
            <ClearFiltersButton onClick={this.clearSymbols} />
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.category')}
              </SectionHeaderItemLabel>
              <LedgersCategorySelect
                value={targetCategory}
                onChange={this.onCategoryChange}
              />
            </SectionHeaderItem>
            <ColumnsFilter target={TYPE} />
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

Ledgers.propTypes = propTypes
Ledgers.defaultProps = defaultProps

export default Ledgers
