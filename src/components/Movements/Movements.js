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

import getColumns from './Movements.columns'
import { propTypes, defaultProps } from './Movements.props'

const TYPE_WITHDRAWALS = queryConstants.MENU_WITHDRAWALS
// we treat withdrawals and deposits in the same way
const TYPE = queryConstants.MENU_MOVEMENTS

class Movements extends PureComponent {
  componentDidMount() {
    const {
      dataReceived, pageLoading, setTargetSymbols, fetchMovements, match, jumpPage,
    } = this.props
    if (!dataReceived && !pageLoading) {
      const symbols = (match.params && match.params.symbol) || ''
      if (symbols) {
        setTargetSymbols(getMappedSymbolsFromUrl(symbols))
      }
      fetchMovements()
    } else {
      jumpPage(TYPE, 0, 25)
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  render() {
    const {
      columns,
      entries,
      existingCoins,
      getFullTime,
      dataReceived,
      pageLoading,
      refresh,
      t,
      targetSymbols,
      timeOffset,
      type,
    } = this.props
    const filteredData = entries.filter(entry => (type === TYPE_WITHDRAWALS
      ? parseFloat(entry.amount) < 0 : parseFloat(entry.amount) > 0))

    const tableColumns = getColumns({
      filteredData,
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
          toggleSymbol={symbol => toggleSymbol(type, this.props, symbol)}
        />
      </Fragment>
    )

    const titleMsgId = type === TYPE_WITHDRAWALS ? 'withdrawals.title' : 'deposits.title'
    let showContent
    if (!dataReceived && pageLoading) {
      showContent = (
        <Loading title={titleMsgId} />
      )
    } else if (!filteredData.length) {
      showContent = (
        <Fragment>
          <h4>
            {t(titleMsgId)}
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
            {t(titleMsgId)}
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
            numRows={filteredData.length}
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

Movements.propTypes = propTypes
Movements.defaultProps = defaultProps

export default withTranslation('translations')(Movements)
