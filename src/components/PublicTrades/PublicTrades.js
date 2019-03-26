import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Card,
  Elevation,
  NonIdealState,
} from '@blueprintjs/core'

import Pagination from 'ui/Pagination'
import SyncPrefButton from 'ui/SyncPrefButton'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import PairSelector from 'ui/PairSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getQueryLimit, getPageSize, getPath } from 'state/query/utils'
import {
  checkFetch,
  getCurrentEntries,
  getNoAuthTokenUrlString,
} from 'state/utils'
import { platform } from 'var/config'

import getColumns from './PublicTrades.columns'
import { propTypes, defaultProps } from './PublicTrades.props'

const TYPE = queryConstants.MENU_PUBLIC_TRADES
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)
const WILD_CARD = ['']

class PublicTrades extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
  }

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

  handleClick(pair) {
    if (!this.handlers[pair]) {
      this.handlers[pair] = () => {
        const { history, setTargetPair } = this.props
        // show select pair in url
        history.push(`${getPath(TYPE)}/${pair.toUpperCase()}${getNoAuthTokenUrlString(history.location.search)}`)
        setTargetPair(pair)
      }
    }
    return this.handlers[pair]
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
        <NonIdealState
          className='bitfinex-nonideal'
          icon='issue-new'
          title={t('preferences.sync.notset')}
          description={t('preferences.sync.description')}
        >
          <SyncPrefButton textOnly />
        </NonIdealState>
      )
    }

    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const pairList = pairs
    const currentPair = targetPair || 'btcusd'
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
        &nbsp;
        <PairSelector
          currentPair={currentPair}
          existingPairs={[]}
          onPairSelect={this.handleClick}
          pairList={pairList}
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
            &nbsp;
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
            &nbsp;
            <TimeRange />
            {renderPairSelector}
            &nbsp;
            <ExportButton handleClickExport={handleClickExport} />
            &nbsp;
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
