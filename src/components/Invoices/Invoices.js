import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderItem,
  SectionHeaderItemLabel,
  SectionHeaderRow,
  SectionHeaderTitle,
} from 'ui/SectionHeader'
import Pagination from 'ui/Pagination'
import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import TimeRange from 'ui/TimeRange'
import RefreshButton from 'ui/RefreshButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import LedgersCategorySelect from 'ui/LedgersCategorySelect'
import ColumnsFilter from 'ui/ColumnsFilter'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch, toggleSymbol } from 'state/utils'

import getColumns from './Invoices.columns'
import { propTypes, defaultProps } from './Invoices.props'

const TYPE = queryConstants.MENU_LEDGERS

class Invoices extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  toggleSymbol = symbol => toggleSymbol(TYPE, this.props, symbol)

  onCategoryChange = (targetCategory) => {
    const { setParams } = this.props
    setParams({ targetCategory: targetCategory ? +targetCategory : undefined })
  }

  render() {
    const {
      columns,
      getFullTime,
      targetSymbols,
      entries,
      existingCoins,
      dataReceived,
      pageLoading,
      refresh,
      t,
      targetCategory,
      timeOffset,
    } = this.props
    const tableColumns = getColumns({
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
        <Fragment>
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination loading={pageLoading} target={TYPE} />
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('ledgers.title')}</SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <MultiSymbolSelector
                currentFilters={targetSymbols}
                existingCoins={existingCoins}
                toggleSymbol={this.toggleSymbol}
              />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.category')}
              </SectionHeaderItemLabel>
              <LedgersCategorySelect
                onChange={this.onCategoryChange}
                value={targetCategory}
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

Invoices.propTypes = propTypes
Invoices.defaultProps = defaultProps

export default withTranslation('translations')(Invoices)
