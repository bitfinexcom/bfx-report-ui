import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import ColumnsFilter from 'ui/ColumnsFilter'
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
import { getMappedSymbolsFromUrl } from 'state/symbols/utils'
import { checkFetch, setPair } from 'state/utils'
import { platform } from 'var/config'

import getColumns from './PublicTrades.columns'
import { propTypes, defaultProps } from './PublicTrades.props'

const TYPE = queryConstants.MENU_PUBLIC_TRADES

class PublicTrades extends PureComponent {
  componentDidMount() {
    const {
      dataReceived, pageLoading, setTargetPair, fetchPublictrades, match,
    } = this.props
    if (!dataReceived && !pageLoading) {
      const pair = (match.params && match.params.pair) || ''
      if (pair) {
        setTargetPair(getMappedSymbolsFromUrl(pair)[0])
      }
      fetchPublictrades()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  render() {
    const {
      columns,
      getFullTime,
      hasSyncPref,
      pairs,
      entries,
      dataReceived,
      pageLoading,
      refresh,
      t,
      targetPair,
      timeOffset,
    } = this.props
    if (platform.showFrameworkMode && !hasSyncPref) {
      return (
        <SyncNotSetYet sectionType={TYPE} />
      )
    }
    const currentPair = targetPair || 'BTC:USD'
    const tableColumns = getColumns({
      filteredData: entries,
      getFullTime,
      t,
      targetPair,
      timeOffset,
    }).filter(({ id }) => columns[id])

    const renderPairSelector = (
      <Fragment>
        {' '}
        <PairSelector
          currentPair={currentPair}
          onPairSelect={pair => setPair(TYPE, this.props, pair)}
          pairs={pairs}
        />
      </Fragment>
    )

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = (
        <Loading title='publictrades.title' />
      )
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('publictrades.title')}
            {' '}
            <TimeRange />
            {renderPairSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
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
            {t('publictrades.title')}
            {' '}
            <TimeRange />
            {renderPairSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <ExportButton />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
            <SyncPrefButton sectionType={TYPE} />
          </h4>
          <Pagination target={TYPE} loading={pageLoading} />
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination target={TYPE} loading={pageLoading} />
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
