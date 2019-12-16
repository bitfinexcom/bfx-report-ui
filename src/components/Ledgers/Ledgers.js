import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

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
import { getMappedSymbolsFromUrl } from 'state/symbols/utils'
import { checkFetch, toggleSymbol } from 'state/utils'

import getColumns from './Ledgers.columns'
import { propTypes, defaultProps } from './Ledgers.props'

const TYPE = queryConstants.MENU_LEDGERS

class Ledgers extends PureComponent {
  componentDidMount() {
    const {
      loading, setTargetSymbols, fetchLedgers, match,
    } = this.props
    if (loading) {
      const symbols = (match.params && match.params.symbol) || ''
      if (symbols) {
        setTargetSymbols(getMappedSymbolsFromUrl(symbols))
      }
      fetchLedgers()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  render() {
    const {
      columns,
      getFullTime,
      targetSymbols,
      entries,
      existingCoins,
      handleClickExport,
      loading,
      refresh,
      t,
      timeOffset,
    } = this.props
    const tableColumns = getColumns({
      filteredData: entries,
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

    let showContent
    if (loading) {
      showContent = (
        <Loading title='ledgers.title' />
      )
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('ledgers.title')}
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
            {t('ledgers.title')}
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
          <Pagination loading={loading} target={TYPE} />
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination loading={loading} target={TYPE} />
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

Ledgers.propTypes = propTypes
Ledgers.defaultProps = defaultProps

export default withTranslation('translations')(Ledgers)
