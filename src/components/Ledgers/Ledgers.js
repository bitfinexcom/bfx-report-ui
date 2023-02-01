import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import DataTable from 'ui/DataTable'
import TimeRange from 'ui/TimeRange'
import Pagination from 'ui/Pagination'
import ColumnsFilter from 'ui/ColumnsFilter'
import SectionSwitch from 'ui/SectionSwitch'
import RefreshButton from 'ui/RefreshButton'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import LedgersCategorySelect from 'ui/LedgersCategorySelect'
import queryConstants from 'state/query/constants'
import {
  checkInit,
  checkFetch,
  toggleSymbol,
  clearAllSymbols,
} from 'state/utils'

import getColumns from './Ledgers.columns'

const TYPE = queryConstants.MENU_LEDGERS

class Ledgers extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      amount: PropTypes.bool,
      amountUsd: PropTypes.bool,
      balance: PropTypes.bool,
      balanceUsd: PropTypes.bool,
      currency: PropTypes.bool,
      description: PropTypes.bool,
      id: PropTypes.bool,
      mts: PropTypes.bool,
      wallet: PropTypes.bool,
    }),
    columnsWidth: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      width: PropTypes.number,
    })),
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      balance: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      mts: PropTypes.number.isRequired,
      wallet: PropTypes.string,
    })).isRequired,
    existingCoins: PropTypes.arrayOf(PropTypes.string),
    getFullTime: PropTypes.func.isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetSymbols: PropTypes.arrayOf(PropTypes.string),
    setParams: PropTypes.func.isRequired,
    timeOffset: PropTypes.string.isRequired,
    targetCategory: PropTypes.number,
  }

  static defaultProps = {
    columns: {},
    columnsWidth: [],
    existingCoins: [],
    targetSymbols: [],
    targetCategory: undefined,
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  toggleSymbol = symbol => toggleSymbol(TYPE, this.props, symbol)

  clearSymbols = () => clearAllSymbols(TYPE, this.props)

  onCategoryChange = (targetCategory) => {
    const { setParams } = this.props
    setParams({ targetCategory: targetCategory ? +targetCategory : undefined })
  }

  render() {
    const {
      columns,
      columnsWidth,
      dataReceived,
      entries,
      existingCoins,
      getFullTime,
      pageLoading,
      refresh,
      t,
      targetSymbols,
      targetCategory,
      timeOffset,
    } = this.props
    const tableColumns = getColumns({
      columnsWidth,
      filteredData: entries,
      getFullTime,
      t,
      timeOffset,
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
            section={TYPE}
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination
            target={TYPE}
            loading={pageLoading}
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
        <SectionSwitch target={TYPE} />
        {showContent}
      </Card>
    )
  }
}

export default Ledgers
