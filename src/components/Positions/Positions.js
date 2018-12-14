import React, { Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import Pagination from 'components/Pagination'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import { formatPair } from 'state/symbols/utils'
import {
  checkFetch,
  formatTime,
  getCurrentEntries,
} from 'state/utils'
import { amountStyle } from 'ui/utils'

import { propTypes, defaultProps } from './Positions.props'

const COLUMN_WIDTHS = [100, 100, 100, 100, 100, 100, 100, 100, 150]
const TYPE = queryConstants.MENU_POSITIONS
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

class Positions extends PureComponent {
  componentDidMount() {
    const { loading, fetchPositions } = this.props
    if (loading) {
      fetchPositions()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  render() {
    const {
      fetchNext,
      fetchPrev,
      offset,
      pageOffset,
      pageLoading,
      entries,
      handleClickExport,
      intl,
      jumpPage,
      loading,
      refresh,
      timezone,
      nextPage,
    } = this.props
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const numRows = filteredData.length

    const pairCellRenderer = (rowIndex) => {
      const formatedCurrentPair = formatPair(filteredData[rowIndex].pair)
      return (
        <Cell tooltip={formatedCurrentPair}>
          {formatedCurrentPair}
        </Cell>
      )
    }

    const amountCellRenderer = (rowIndex) => {
      const { amount } = filteredData[rowIndex]
      const classes = amountStyle(amount)
      return (
        <Cell
          className={classes}
          tooltip={amount}
        >
          {amount}
        </Cell>
      )
    }

    const basesPriceCellRenderer = (rowIndex) => {
      const price = filteredData[rowIndex].basePrice
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={price}
        >
          {price}
        </Cell>
      )
    }

    const priceLiqCellRenderer = (rowIndex) => {
      const price = filteredData[rowIndex].priceLiq
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={price}
        >
          {price}
        </Cell>
      )
    }

    const plCellRenderer = (rowIndex) => {
      const { pl } = filteredData[rowIndex]
      const classes = amountStyle(pl)
      return (
        <Cell
          className={classes}
          tooltip={pl}
        >
          {pl}
        </Cell>
      )
    }

    const plPercCellRenderer = (rowIndex) => {
      const { plPerc } = filteredData[rowIndex]
      const classes = amountStyle(plPerc)
      return (
        <Cell
          className={classes}
          tooltip={plPerc}
        >
          {plPerc}
        </Cell>
      )
    }

    const marginFundingCellRenderer = (rowIndex) => {
      const swap = filteredData[rowIndex].marginFunding
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={swap}
        >
          {swap}
        </Cell>
      )
    }

    const marginFundingTypeCellRenderer = (rowIndex) => {
      const swapType = filteredData[rowIndex].marginFundingType
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={swapType}
        >
          {swapType}
        </Cell>
      )
    }

    const mtsUpdateCellRenderer = (rowIndex) => {
      const mtsUpdate = formatTime(filteredData[rowIndex].mtsUpdate, timezone)
      return (
        <Cell tooltip={mtsUpdate}>
          <TruncatedFormat>
            {mtsUpdate}
          </TruncatedFormat>
        </Cell>
      )
    }

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

    const tableColums = [
      {
        id: 'pair',
        name: 'positions.column.pair',
        renderer: pairCellRenderer,
        tooltip: rowIndex => formatPair(filteredData[rowIndex].pair),
      },
      {
        id: 'amount',
        name: 'positions.column.amount',
        renderer: amountCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].amount,
      },
      {
        id: 'basesPrice',
        name: 'positions.column.base-price',
        renderer: basesPriceCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].basesPrice,
      },
      {
        id: 'priceLiq',
        name: 'positions.column.liq-price',
        renderer: priceLiqCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].priceLiq,
      },
      {
        id: 'pl',
        name: 'positions.column.pl',
        renderer: plCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].pl,
      },
      {
        id: 'plperc',
        name: 'positions.column.plperc',
        renderer: plPercCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].plPerc,
      },
      {
        id: 'swap',
        name: 'positions.column.swap',
        renderer: marginFundingCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].marginFunding,
      },
      {
        id: 'swapType',
        name: 'positions.column.swap-type',
        renderer: marginFundingTypeCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].marginFundingType,
      },
      {
        id: 'mtsUpdate',
        name: 'positions.column.update',
        renderer: mtsUpdateCellRenderer,
        tooltip: rowIndex => filteredData[rowIndex].mtsUpdate,
      },
    ]

    let showContent
    if (loading) {
      showContent = (
        <Loading title='positions.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'positions.title' })}
            &nbsp;
            <TimeRange />
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'positions.title' })}
            &nbsp;
            <TimeRange />
            &nbsp;
            <ExportButton handleClickExport={handleClickExport} />
            &nbsp;
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          {renderPagination}
          <DataTable
            numRows={numRows}
            columnWidths={COLUMN_WIDTHS}
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

Positions.propTypes = propTypes
Positions.defaultProps = defaultProps

export default injectIntl(Positions)
