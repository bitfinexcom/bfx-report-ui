import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import Pagination from 'ui/Pagination'
import SectionHeader from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import {
  checkInit,
  checkFetch,
  toggleSymbol,
  clearAllSymbols,
} from 'state/utils'

import getColumns from './Movements.columns'

const TYPE = queryConstants.MENU_MOVEMENTS

class Movements extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      amount: PropTypes.bool,
      amountUsd: PropTypes.bool,
      currency: PropTypes.bool,
      destinationAddress: PropTypes.bool,
      fees: PropTypes.bool,
      id: PropTypes.bool,
      moreDetails: PropTypes.bool,
      mtsUpdated: PropTypes.bool,
      note: PropTypes.bool,
      status: PropTypes.bool,
      transactionId: PropTypes.bool,
    }),
    tetherNames: PropTypes.shape({
      TESTUSDT: PropTypes.string,
      TESTUSDTF0: PropTypes.string,
      UST: PropTypes.string,
      USDTKSM: PropTypes.string,
      USTF0: PropTypes.string,
      USDTAVAX: PropTypes.string,
      USDTALG: PropTypes.string,
      USDTBCH: PropTypes.string,
      USS: PropTypes.string,
      USE: PropTypes.string,
      USDTKAVA: PropTypes.string,
      USDTNEAR: PropTypes.string,
      USDTDOT: PropTypes.string,
      USDTPLY: PropTypes.string,
      USDTSOL: PropTypes.string,
      USDTXTZ: PropTypes.string,
      USX: PropTypes.string,
      USDTZK: PropTypes.string,
    }),
    columnsWidth: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    })),
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      currency: PropTypes.string,
      mtsStarted: PropTypes.number,
      mtsUpdated: PropTypes.number,
      status: PropTypes.string,
      amount: PropTypes.number,
      destinationAddress: PropTypes.string,
    })),
    jumpPage: PropTypes.func,
    existingCoins: PropTypes.arrayOf(PropTypes.string),
    getFullTime: PropTypes.func.isRequired,
    getMovementInfo: PropTypes.func.isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetSymbols: PropTypes.arrayOf(PropTypes.string),
    timeOffset: PropTypes.string.isRequired,
  }

  static defaultProps = {
    columns: {},
    entries: [],
    tetherNames: {},
    columnsWidth: [],
    existingCoins: [],
    targetSymbols: [],
    jumpPage: () => {},
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
    const {
      dataReceived, pageLoading, jumpPage,
    } = this.props
    // workaround for managing pagination of movements from 2 points (deposits/withdrawals)
    if (dataReceived || pageLoading) {
      jumpPage(TYPE, 1)
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  toggleSymbol = symbol => toggleSymbol(TYPE, this.props, symbol)

  clearSymbols = () => clearAllSymbols(TYPE, this.props)

  showExtraInfo = (e, { id }) => {
    const { getMovementInfo } = this.props
    e.preventDefault()
    getMovementInfo(id)
  }

  render() {
    const {
      t,
      columns,
      entries,
      refresh,
      timeOffset,
      getFullTime,
      pageLoading,
      tetherNames,
      columnsWidth,
      dataReceived,
      existingCoins,
      targetSymbols,
    } = this.props
    const isNoData = isEmpty(entries)
    const isLoading = !dataReceived && pageLoading
    const tableColumns = getColumns({
      t,
      isNoData,
      isLoading,
      timeOffset,
      tetherNames,
      getFullTime,
      columnsWidth,
      filteredData: entries,
      onDetailsClick: this.showExtraInfo,
    }).filter(({ id }) => columns[id])

    const title = 'movements.title'
    let showContent
    if (isNoData) {
      showContent = (
        <div className='data-table-wrapper'>
          <DataTable
            section={TYPE}
            isNoData={isNoData}
            isLoading={isLoading}
            tableColumns={tableColumns}
            numRows={isLoading ? 5 : 1}
          />
        </div>
      )
    } else {
      showContent = (
        <div className='data-table-wrapper'>
          <DataTable
            section={TYPE}
            tableColumns={tableColumns}
            numRows={isLoading ? 5 : entries.length}
          />
          <Pagination
            target={TYPE}
            loading={pageLoading}
          />
        </div>
      )
    }
    return (
      <Card
        elevation={Elevation.ZERO}
        className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader
          title={title}
          target={TYPE}
          symbolsSelectorProps={{
            currentFilters: targetSymbols,
            existingCoins,
            toggleSymbol: this.toggleSymbol,
          }}
          refresh={refresh}
          clearTargetSymbols={this.clearSymbols}
        />
        {showContent}
      </Card>
    )
  }
}

export default Movements
