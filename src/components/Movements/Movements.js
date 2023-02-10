import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import DataTable from 'ui/DataTable'
import Pagination from 'ui/Pagination'
import SectionHeader from 'ui/SectionHeader'
import SectionSwitch from 'ui/SectionSwitch'
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
      mtsUpdated: PropTypes.bool,
      note: PropTypes.bool,
      status: PropTypes.bool,
      transactionId: PropTypes.bool,
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

  render() {
    const {
      t,
      columns,
      entries,
      refresh,
      timeOffset,
      getFullTime,
      pageLoading,
      columnsWidth,
      dataReceived,
      existingCoins,
      targetSymbols,
    } = this.props

    const tableColumns = getColumns({
      t,
      timeOffset,
      getFullTime,
      columnsWidth,
      filteredData: entries,
    }).filter(({ id }) => columns[id])

    const title = 'movements.title'
    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <>
          <DataTable
            section={TYPE}
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination
            target={TYPE}
            loading={pageLoading}
          />
        </>
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
          showHeaderTabs
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
