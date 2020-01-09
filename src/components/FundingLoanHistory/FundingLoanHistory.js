import React, { Fragment, PureComponent } from 'react'
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
import queryConstants from 'state/query/constants'
import { getMappedSymbolsFromUrl } from 'state/symbols/utils'
import { checkFetch, toggleSymbol } from 'state/utils'

import getColumns from './FundingLoanHistory.columns'
import { propTypes, defaultProps } from './FundingLoanHistory.props'

const TYPE = queryConstants.MENU_FLOAN

class FundingLoanHistory extends PureComponent {
  componentDidMount() {
    const {
      dataReceived, pageLoading, setTargetSymbols, fetchFloan, match,
    } = this.props
    if (!dataReceived && !pageLoading) {
      const symbols = (match.params && match.params.symbol) || ''
      if (symbols) {
        setTargetSymbols(getMappedSymbolsFromUrl(symbols))
      }
      fetchFloan()
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
      dataReceived,
      pageLoading,
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
    if (!dataReceived && pageLoading) {
      showContent = (
        <Loading title='floan.title' />
      )
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('floan.title')}
            {' '}
            <TimeRange />
            {renderSymbolSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
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
            <ColumnsFilter target={TYPE} />
            {' '}
            <ExportButton />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
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

FundingLoanHistory.propTypes = propTypes
FundingLoanHistory.defaultProps = defaultProps

export default withTranslation('translations')(FundingLoanHistory)
