import React, { Fragment, PureComponent } from 'react'
import { withNamespaces } from 'react-i18next'
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

import getColumns from 'components/Movements/Movements.columns'
import { propTypes, defaultProps } from 'components/Movements/Movements.props'

const TYPE_WITHDRAWALS = queryConstants.MENU_WITHDRAWALS
// we treat withdrawals and deposits in the same way
const LIMIT = getQueryLimit(queryConstants.MENU_MOVEMENTS)
const PAGE_SIZE = getPageSize(queryConstants.MENU_MOVEMENTS)

class Withdrawals extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.handleTagRemove = this.handleTagRemove.bind(this)
  }

  componentDidMount() {
    const { loading, fetchWithdrawals, match } = this.props
    if (loading) {
      const symbol = (match.params && match.params.symbol) || ''
      fetchWithdrawals(symbol)
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE_WITHDRAWALS)
  }

  handleClick(symbol) {
    if (!this.handlers[symbol]) {
      this.handlers[symbol] = () => {
        const { type } = this.props
        handleAddSymbolFilter(type, symbol, this.props)
      }
    }
    return this.handlers[symbol]
  }

  handleTagRemove(tag) {
    const { type } = this.props
    handleRemoveSymbolFilter(type, tag, this.props)
  }

  render() {
    const {
      entries,
      existingCoins,
      fetchNext,
      fetchPrev,
      getFullTime,
      handleClickExport,
      jumpPage,
      loading,
      nextPage,
      offset,
      pageOffset,
      pageLoading,
      refresh,
      t,
      targetSymbols,
      timeOffset,
      type,
    } = this.props
    const currentEntries = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const filteredData = currentEntries.filter(entry => (type === TYPE_WITHDRAWALS
      ? parseFloat(entry.amount) < 0 : parseFloat(entry.amount) > 0))
    const numRows = filteredData.length
    const tableColums = getColumns({
      filteredData,
      getFullTime,
      t,
      timeOffset,
    })

    const renderSymbolSelector = (
      <Fragment>
        &nbsp;
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
        type='withdrawals'
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

    const titleMsgId = type === TYPE_WITHDRAWALS ? 'withdrawals.title' : 'deposits.title'
    let showContent
    if (loading) {
      showContent = (
        <Loading title={titleMsgId} />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {t(titleMsgId)}
            &nbsp;
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
            {t(titleMsgId)}
            &nbsp;
            <TimeRange />
            {renderSymbolSelector}
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

Withdrawals.propTypes = propTypes
Withdrawals.defaultProps = defaultProps

export default withNamespaces('translations')(Withdrawals)
