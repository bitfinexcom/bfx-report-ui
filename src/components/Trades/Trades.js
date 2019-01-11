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
import { getPageSize } from 'state/query/utils'
import {
  checkFetch,
  getCurrentEntries,
  handleAddPairFilter,
  handleRemovePairFilter,
} from 'state/utils'

import getColumns from './Trades.columns'
import { propTypes, defaultProps } from './Trades.props'

const TYPE = queryConstants.MENU_TRADES
const PAGE_SIZE = getPageSize(TYPE)

class Trades extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.handleTagRemove = this.handleTagRemove.bind(this)
  }

  componentDidMount() {
    const { loading, fetchTrades, match } = this.props
    if (loading) {
      const pair = (match.params && match.params.pair) || ''
      fetchTrades(pair)
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
      getFullTime,
      getQueryLimit,
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
      nextPage,
      timeOffset,
    } = this.props
    const LIMIT = getQueryLimit(TYPE)
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const numRows = filteredData.length
    const tableColums = getColumns({
      filteredData,
      getFullTime,
      intl,
      timeOffset,
    })

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
        <Loading title='trades.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'trades.title' })}
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
            {intl.formatMessage({ id: 'trades.title' })}
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

Trades.propTypes = propTypes
Trades.defaultProps = defaultProps

export default injectIntl(Trades)
