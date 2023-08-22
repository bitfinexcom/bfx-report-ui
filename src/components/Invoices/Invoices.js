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
import NoMerchant from 'ui/NoMerchant'
import Pagination from 'ui/Pagination'
import ColumnsFilter from 'ui/ColumnsFilter'
import RefreshButton from 'ui/RefreshButton'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import queryConstants from 'state/query/constants'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import {
  checkInit,
  checkFetch,
  toggleSymbol,
  clearAllSymbols,
} from 'state/utils'

import { getColumns } from './Invoices.columns'

const TYPE = queryConstants.MENU_INVOICES

class Invoices extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      amount: PropTypes.bool,
      currency: PropTypes.bool,
      customerInfo: PropTypes.bool,
      duration: PropTypes.bool,
      id: PropTypes.bool,
      invoices: PropTypes.bool,
      merchantName: PropTypes.bool,
      mts: PropTypes.bool,
      orderId: PropTypes.bool,
      payCurrencies: PropTypes.bool,
      payment: PropTypes.bool,
      redirectUrl: PropTypes.bool,
      status: PropTypes.bool,
      webhook: PropTypes.bool,
    }),
    columnsWidth: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    })),
    dataReceived: PropTypes.bool.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      orderId: PropTypes.string.isRequired,
      payCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
      status: PropTypes.string.isRequired,
      invoices: PropTypes.arrayOf(PropTypes.shape({
        currency: PropTypes.string,
      })).isRequired,
      duration: PropTypes.number.isRequired,
      merchantName: PropTypes.string.isRequired,
      redirectUrl: PropTypes.string.isRequired,
      mts: PropTypes.number.isRequired,
      webhook: PropTypes.string.isRequired,
    })).isRequired,
    existingCoins: PropTypes.arrayOf(PropTypes.string),
    getFullTime: PropTypes.func.isRequired,
    isMerchant: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetSymbols: PropTypes.arrayOf(PropTypes.string),
    timeOffset: PropTypes.string.isRequired,
  }

  static defaultProps = {
    columns: {},
    columnsWidth: [],
    existingCoins: [],
    targetSymbols: [],
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  toggleSymbol = symbol => toggleSymbol(TYPE, this.props, symbol)

  clearSymbols = () => clearAllSymbols(TYPE, this.props)

  render() {
    const {
      t,
      entries,
      refresh,
      columns,
      timeOffset,
      isMerchant,
      getFullTime,
      pageLoading,
      columnsWidth,
      dataReceived,
      existingCoins,
      targetSymbols,
    } = this.props

    const tableColumns = getColumns({
      t,
      timeOffset,
      getFullTime,
      columnsWidth,
      filteredData: entries,
    }).filter(({ id }) => columns[id])

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!isMerchant) {
      showContent = <NoMerchant />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <div className='data-table-wrapper'>
          <DataTable
            section={TYPE}
            numRows={entries.length}
            tableColumns={tableColumns}
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
          <SectionHeaderTitle>{t('invoices.title')}</SectionHeaderTitle>
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
                toggleSymbol={this.toggleSymbol}
              />
            </SectionHeaderItem>
            <ClearFiltersButton onClick={this.clearSymbols} />
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.columns')}
              </SectionHeaderItemLabel>
              <ColumnsFilter target={TYPE} />
            </SectionHeaderItem>
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default Invoices
