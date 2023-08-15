import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Card, Elevation } from '@blueprintjs/core'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import DataTable from 'ui/DataTable'
import Pagination from 'ui/Pagination'
import SectionHeader from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import { mapRequestPairs } from 'state/symbols/utils'
import {
  checkInit,
  checkFetch,
  togglePair,
  clearAllPairs,
} from 'state/utils'
import { getPath } from 'state/query/utils'

import { getColumns } from './Orders.columns'

const TYPE = queryConstants.MENU_ORDERS

class Orders extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      amountExecuted: PropTypes.bool,
      amountOrig: PropTypes.bool,
      existingCoins: PropTypes.bool,
      targetSymbols: PropTypes.bool,
      id: PropTypes.bool,
      meta: PropTypes.bool,
      mtsCreate: PropTypes.bool,
      mtsUpdate: PropTypes.bool,
      pair: PropTypes.bool,
      price: PropTypes.bool,
      priceAvg: PropTypes.bool,
      priceTrailing: PropTypes.bool,
      status: PropTypes.bool,
      type: PropTypes.bool,
      typePrev: PropTypes.bool,
    }),
    columnsWidth: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    })),
    entries: PropTypes.arrayOf(PropTypes.shape({
      amountOrig: PropTypes.number,
      amountExecuted: PropTypes.number,
      id: PropTypes.number,
      mtsUpdate: PropTypes.number,
      pair: PropTypes.string,
      price: PropTypes.number,
      priceAvg: PropTypes.number,
      status: PropTypes.string,
      type: PropTypes.string,
    })),
    existingPairs: PropTypes.arrayOf(PropTypes.string),
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetPairs: PropTypes.arrayOf(PropTypes.string),
    getFullTime: PropTypes.func.isRequired,
    timeOffset: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    columns: {},
    entries: [],
    targetPairs: [],
    columnsWidth: [],
    existingPairs: [],
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  togglePair = pair => togglePair(TYPE, this.props, pair)

  clearPairs = () => clearAllPairs(TYPE, this.props)

  jumpToOrderTrades = (e, { id, pair }) => {
    e.preventDefault()
    const { history, location } = this.props
    const params = queryString.parse(location.search)
    const search = queryString.stringify({ ...params, orderId: id })

    const demappedPair = mapRequestPairs(pair, true)

    history.push({
      pathname: `${getPath(queryConstants.MENU_ORDER_TRADES)}/${demappedPair}`,
      search,
    })
    window.scrollTo(0, 0) // scroll to the top of page on section change
  }

  render() {
    const {
      t,
      columns,
      entries,
      refresh,
      timeOffset,
      targetPairs,
      getFullTime,
      pageLoading,
      dataReceived,
      columnsWidth,
      existingPairs,
    } = this.props
    const tableColumns = getColumns({
      t,
      timeOffset,
      getFullTime,
      columnsWidth,
      filteredData: entries,
      onIdClick: this.jumpToOrderTrades,
    }).filter(({ id }) => columns[id])

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <div className='data-table-wrapper'>
          <DataTable
            section={TYPE}
            numRows={entries.length}
            tableColumns={tableColumns}
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
          target={TYPE}
          refresh={refresh}
          title='orders.title'
          pairsSelectorProps={{
            currentFilters: targetPairs,
            existingPairs,
            togglePair: this.togglePair,
          }}
          clearTargetPairs={this.clearPairs}
        />
        {showContent}
      </Card>
    )
  }
}

export default Orders
