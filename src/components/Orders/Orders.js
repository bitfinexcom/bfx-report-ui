import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import queryString from 'query-string'
import { Card, Elevation } from '@blueprintjs/core'

import Pagination from 'ui/Pagination'
import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
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

import getColumns from './Orders.columns'
import { propTypes, defaultProps } from './Orders.props'

const TYPE = queryConstants.MENU_ORDERS

class Orders extends PureComponent {
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
      columns,
      existingPairs,
      entries,
      dataReceived,
      pageLoading,
      refresh,
      targetPairs,
      getFullTime,
      t,
      timeOffset,
    } = this.props
    const tableColumns = getColumns({
      filteredData: entries,
      getFullTime,
      onIdClick: this.jumpToOrderTrades,
      t,
      timeOffset,
    }).filter(({ id }) => columns[id])

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <Fragment>
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
        <SectionHeader
          title='orders.title'
          target={TYPE}
          pairsSelectorProps={{
            currentFilters: targetPairs,
            existingPairs,
            togglePair: this.togglePair,
          }}
          refresh={refresh}
          clearTargetPairs={this.clearPairs}
        />
        {showContent}
      </Card>
    )
  }
}

Orders.propTypes = propTypes
Orders.defaultProps = defaultProps

export default withTranslation('translations')(Orders)
