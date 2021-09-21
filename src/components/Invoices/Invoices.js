import React, { PureComponent } from 'react'
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
import ColumnsFilter from 'ui/ColumnsFilter'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch, toggleSymbol } from 'state/utils'

import getColumns from './Invoices.columns'
import { propTypes, defaultProps } from './Invoices.props'

const TYPE = queryConstants.MENU_INVOICES

class Invoices extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  toggleSymbol = symbol => toggleSymbol(TYPE, this.props, symbol)

  render() {
    const {
      t,
      entries,
      refresh,
      columns,
      timeOffset,
      getFullTime,
      pageLoading,
      dataReceived,
      existingCoins,
      targetSymbols,
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
          <SectionHeaderTitle>{t('invoices.title')}</SectionHeaderTitle>
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

export default Invoices
