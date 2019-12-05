import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'

import ColumnsFilter from 'ui/ColumnsFilter'
import Pagination from 'ui/Pagination'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import QueryLimitSelector from 'ui/QueryLimitSelector'
import queryConstants from 'state/query/constants'
import { getPageSize } from 'state/query/utils'
import { getMappedSymbolsFromUrl } from 'state/symbols/utils'
import {
  checkFetch,
  toggleSymbol,
  getCurrentEntries,
} from 'state/utils'

import getColumns from 'components/Ledgers/Ledgers.columns'
import { propTypes, defaultProps } from 'components/Ledgers/Ledgers.props'

const TYPE = queryConstants.MENU_AFFILIATES_EARNINGS
const PAGE_SIZE = getPageSize(TYPE)

/**
 * Affiliates Earnings has the same state and columns as Ledgers
 */
class AffiliatesEarnings extends PureComponent {
  componentDidMount() {
    const {
      loading, setTargetSymbols, fetchAffiliatesearnings, match,
    } = this.props
    if (loading) {
      const symbols = (match.params && match.params.symbol) || ''
      if (symbols) {
        setTargetSymbols(getMappedSymbolsFromUrl(symbols))
      }
      fetchAffiliatesearnings()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  render() {
    const {
      columns,
      fetchNext,
      fetchPrev,
      getFullTime,
      getQueryLimit,
      offset,
      pageOffset,
      pageLoading,
      targetSymbols,
      entries,
      existingCoins,
      handleClickExport,
      jumpPage,
      loading,
      refresh,
      nextPage,
      t,
      timeOffset,
    } = this.props
    const limit = getQueryLimit(TYPE)
    const filteredData = getCurrentEntries(entries, offset, limit, pageOffset, PAGE_SIZE)
    const numRows = filteredData.length
    const tableColumns = getColumns({
      filteredData,
      getFullTime,
      t,
      timeOffset,
    }).filter(({ id }) => columns[id])

    const renderSymbolSelector = (
      <Fragment>
        {' '}
        <MultiSymbolSelector
          currentFilters={targetSymbols}
          existingCoins={existingCoins}
          toggleSymbol={symbol => toggleSymbol(TYPE, this.props, symbol)}
        />
      </Fragment>
    )

    const renderPagination = (
      <Pagination
        type={TYPE}
        dataLen={entries.length}
        loading={pageLoading}
        offset={offset}
        jumpPage={jumpPage}
        nextClick={fetchNext}
        prevClick={fetchPrev}
        pageOffset={pageOffset}
        nextPage={nextPage}
      />
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='affiliatesearnings.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {t('affiliatesearnings.title')}
            {' '}
            <TimeRange />
            {renderSymbolSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
            {' '}
            <QueryLimitSelector target={TYPE} />
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('affiliatesearnings.title')}
            {' '}
            <TimeRange />
            {renderSymbolSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <ExportButton handleClickExport={handleClickExport} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          {renderPagination}
          <DataTable
            numRows={numRows}
            tableColumns={tableColumns}
          />
          {renderPagination}
        </Fragment>
      )
    }
    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        {showContent}
      </Card>
    )
  }
}

AffiliatesEarnings.propTypes = propTypes
AffiliatesEarnings.defaultProps = defaultProps

export default withTranslation('translations')(AffiliatesEarnings)
