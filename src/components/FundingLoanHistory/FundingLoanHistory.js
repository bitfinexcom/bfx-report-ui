import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'

import Pagination from 'ui/Pagination'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import queryConstants from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import {
  checkFetch,
  getCurrentEntries,
  handleAddSymbolFilter,
  handleRemoveSymbolFilter,
} from 'state/utils'

import getColumns from './FundingLoanHistory.columns'
import { propTypes, defaultProps } from './FundingLoanHistory.props'

const TYPE = queryConstants.MENU_FLOAN
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

class FundingLoanHistory extends PureComponent {
  handlers = {}

  componentDidMount() {
    const { loading, fetchFloan, match } = this.props
    if (loading) {
      const symbol = (match.params && match.params.symbol) || ''
      fetchFloan(symbol)
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  handleClick = (symbol) => {
    if (!this.handlers[symbol]) {
      this.handlers[symbol] = () => handleAddSymbolFilter(TYPE, symbol, this.props)
    }
    return this.handlers[symbol]
  }

  handleTagRemove = (tag) => {
    handleRemoveSymbolFilter(TYPE, tag, this.props)
  }

  render() {
    const {
      fetchNext,
      fetchPrev,
      getFullTime,
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
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const numRows = filteredData.length
    const tableColums = getColumns({
      filteredData,
      getFullTime,
      t,
      timeOffset,
    })

    const renderSymbolSelector = (
      <Fragment>
        {' '}
        <MultiSymbolSelector
          currentFilters={targetSymbols}
          existingCoins={existingCoins}
          onSymbolSelect={this.handleClick}
          handleTagRemove={this.handleTagRemove}
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
        prevClick={fetchPrev}
        nextClick={fetchNext}
        pageOffset={pageOffset}
        nextPage={nextPage}
      />
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='floan.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {t('floan.title')}
            {' '}
            <TimeRange />
            {renderSymbolSelector}
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('floan.title')}
            {' '}
            <TimeRange />
            {renderSymbolSelector}
            {' '}
            <ExportButton handleClickExport={handleClickExport} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          {renderPagination}
          <DataTable
            numRows={numRows}
            tableColums={tableColums}
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

FundingLoanHistory.propTypes = propTypes
FundingLoanHistory.defaultProps = defaultProps

export default withTranslation('translations')(FundingLoanHistory)
