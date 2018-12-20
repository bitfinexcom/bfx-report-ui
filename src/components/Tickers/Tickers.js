import React, { Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'

import Pagination from 'components/Pagination'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import MultiPairSelector from 'ui/MultiPairSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import {
  checkFetch,
  getCurrentEntries,
  handleAddPairFilter,
  handleRemovePairFilter,
} from 'state/utils'

import getColumns from './Tickers.columns'
import { propTypes, defaultProps } from './Tickers.props'

const COLUMN_WIDTHS = [80, 100, 100, 200]
const TYPE = queryConstants.MENU_TICKERS
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

class Tickers extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.handleTagRemove = this.handleTagRemove.bind(this)
  }

  componentDidMount() {
    const { loading, fetchTickers, match } = this.props
    if (loading) {
      const pair = (match.params && match.params.pair) || ''
      fetchTickers(pair)
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  handleClick(pair) {
    if (!this.handlers[pair]) {
      this.handlers[pair] = () => handleAddPairFilter(TYPE, pair, this.props)
    }
    return this.handlers[pair]
  }

  handleTagRemove(tag) {
    handleRemovePairFilter(TYPE, tag, this.props)
  }

  render() {
    const {
      existingPairs,
      fetchNext,
      fetchPrev,
      offset,
      pageOffset,
      pageLoading,
      entries,
      handleClickExport,
      intl,
      jumpPage,
      loading,
      refresh,
      targetPairs,
      timezone,
      nextPage,
    } = this.props
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const numRows = filteredData.length
    const tableColums = getColumns({ filteredData, timezone })

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

    const renderPairSelector = (
      <Fragment>
          &nbsp;
        <MultiPairSelector
          currentFilters={targetPairs}
          existingPairs={existingPairs}
          onPairSelect={this.handleClick}
          handleTagRemove={this.handleTagRemove}
        />
      </Fragment>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='tickers.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'tickers.title' })}
            &nbsp;
            <TimeRange />
            {renderPairSelector}
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'tickers.title' })}
            &nbsp;
            <TimeRange />
            {renderPairSelector}
            &nbsp;
            <ExportButton handleClickExport={handleClickExport} />
            &nbsp;
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          {renderPagination}
          <DataTable
            numRows={numRows}
            columnWidths={COLUMN_WIDTHS}
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

Tickers.propTypes = propTypes
Tickers.defaultProps = defaultProps

export default injectIntl(Tickers)
