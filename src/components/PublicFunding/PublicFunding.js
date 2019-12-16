import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import ColumnsFilter from 'ui/ColumnsFilter'
import Pagination from 'ui/Pagination'
import SyncSymbolPrefButton from 'ui/SyncSymbolPrefButton'
import SyncNotSetYet from 'ui/SyncNotSetYet'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import SymbolSelector from 'ui/SymbolSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getPath } from 'state/query/utils'
import { getMappedSymbolsFromUrl } from 'state/symbols/utils'
import { checkFetch } from 'state/utils'
import { platform } from 'var/config'

import getColumns from './PublicFunding.columns'
import { propTypes, defaultProps } from './PublicFunding.props'

const TYPE = queryConstants.MENU_PUBLIC_FUNDING

class PublicFunding extends PureComponent {
  componentDidMount() {
    const {
      loading, setTargetSymbol, fetchPublicfunding, match,
    } = this.props
    if (loading) {
      const pair = (match.params && match.params.symbol) || ''
      if (pair) {
        setTargetSymbol(getMappedSymbolsFromUrl(pair)[0])
      }
      fetchPublicfunding()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  handleClick = (symbol) => {
    const { history, targetSymbol, setTargetSymbol } = this.props
    if (symbol !== targetSymbol) {
      // show select symbol in url
      history.push(`${getPath(TYPE)}/${symbol}${history.location.search}`)
      setTargetSymbol(symbol)
    }
  }

  render() {
    const {
      columns,
      coins,
      currencies,
      getFullTime,
      hasSyncPref,
      pageLoading,
      entries,
      handleClickExport,
      loading,
      refresh,
      t,
      targetSymbol,
      timeOffset,
    } = this.props
    if (platform.showFrameworkMode && !hasSyncPref) {
      return (
        <SyncNotSetYet acceptSymbol sectionType={TYPE} />
      )
    }

    const currentSymbol = targetSymbol || 'USD'
    const tableColumns = getColumns({
      filteredData: entries,
      getFullTime,
      t,
      targetSymbol,
      timeOffset,
    }).filter(({ id }) => columns[id])

    const renderSymbolSelector = (
      <Fragment>
        {' '}
        <SymbolSelector
          coins={coins}
          currencies={currencies}
          currentCoin={currentSymbol}
          onSymbolSelect={this.handleClick}
        />
      </Fragment>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='publicfunding.title' />
      )
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('publicfunding.title')}
            {' '}
            <TimeRange />
            {renderSymbolSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
            <SyncSymbolPrefButton />
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('publicfunding.title')}
            {' '}
            <TimeRange />
            {renderSymbolSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <ExportButton handleClickExport={handleClickExport} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
            <SyncSymbolPrefButton />
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

PublicFunding.propTypes = propTypes
PublicFunding.defaultProps = defaultProps

export default withTranslation('translations')(PublicFunding)
