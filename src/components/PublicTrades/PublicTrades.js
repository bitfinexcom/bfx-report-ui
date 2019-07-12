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
import PairSelector from 'ui/PairSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import {
  checkFetch,
  getCurrentEntries,
  setPair,
} from 'state/utils'
import { platform } from 'var/config'

import getColumns from './PublicTrades.columns'
import { propTypes, defaultProps } from './PublicTrades.props'

const TYPE = queryConstants.MENU_PUBLIC_TRADES
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)
const WILD_CARD = ['']

class PublicTrades extends PureComponent {
  componentDidMount() {
    const { loading, fetchPublictrades, match } = this.props
    if (loading) {
      const pair = (match.params && match.params.pair) || ''
      fetchPublictrades(pair)
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  render() {
    const {
      fetchNext,
      fetchPrev,
      getFullTime,
      hasSyncPref,
      offset,
      pageOffset,
      pageLoading,
      pairs,
      entries,
      handleClickExport,
      jumpPage,
      loading,
      refresh,
      t,
      targetPair,
      nextPage,
      timeOffset,
    } = this.props
    if (platform.showSyncMode && !hasSyncPref) {
      return (
        <SyncNotSetYet />
      )
    }

    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const currentPair = targetPair || 'BTC:USD'
    const numRows = filteredData.length
    const tableColums = getColumns({
      filteredData,
      getFullTime,
      t,
      targetPair,
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
        <PairSelector
          currentPair={currentPair}
          existingPairs={[]}
          onPairSelect={pair => setPair(TYPE, this.props, pair)}
          pairs={pairs}
          wildCard={WILD_CARD}
        />
      </Fragment>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='publictrades.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {t('publictrades.title')}
            {' '}
            <TimeRange />
            {renderPairSelector}
            <SyncPrefButton />
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('publictrades.title')}
            {' '}
            <TimeRange />
            {renderPairSelector}
            {' '}
            <ExportButton handleClickExport={handleClickExport} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
            <SyncPrefButton />
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

PublicTrades.propTypes = propTypes
PublicTrades.defaultProps = defaultProps

export default withTranslation('translations')(PublicTrades)
