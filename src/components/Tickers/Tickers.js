import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'

import Pagination from 'ui/Pagination'
import SyncPrefButton from 'ui/SyncPrefButton'
import SyncNotSetYet from 'ui/SyncNotSetYet'
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
  togglePair,
} from 'state/utils'
import { parsePairTag } from 'state/symbols/utils'
import { platform } from 'var/config'

import getColumns from './Tickers.columns'
import { propTypes, defaultProps } from './Tickers.props'

const TYPE = queryConstants.MENU_TICKERS
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

class Tickers extends PureComponent {
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

  togglePair = (pair) => {
    const { targetPairs, updateErrorStatus } = this.props
    if (targetPairs.length === 1 && targetPairs.includes(parsePairTag(pair))) {
      updateErrorStatus({ id: 'tickers.minlength' })
    } else {
      togglePair(TYPE, this.props, pair)
    }
  }

  render() {
    const {
      existingPairs,
      fetchNext,
      fetchPrev,
      getFullTime,
      hasSyncPref,
      offset,
      pageOffset,
      pageLoading,
      entries,
      handleClickExport,
      jumpPage,
      loading,
      refresh,
      t,
      targetPairs,
      nextPage,
      timeOffset,
    } = this.props
    if (platform.showFrameworkMode && !hasSyncPref) {
      return (
        <SyncNotSetYet sectionType={TYPE} />
      )
    }

    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const numRows = filteredData.length
    const tableColums = getColumns({
      filteredData,
      getFullTime,
      t,
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
        {' '}
        <MultiPairSelector
          currentFilters={targetPairs}
          existingPairs={existingPairs}
          togglePair={this.togglePair}
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
            {t('tickers.title')}
            {' '}
            <TimeRange />
            {renderPairSelector}
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
            <SyncPrefButton sectionType={TYPE} />
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('tickers.title')}
            {' '}
            <TimeRange />
            {renderPairSelector}
            {' '}
            <ExportButton handleClickExport={handleClickExport} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
            <SyncPrefButton sectionType={TYPE} />
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

Tickers.propTypes = propTypes
Tickers.defaultProps = defaultProps

export default withTranslation('translations')(Tickers)
