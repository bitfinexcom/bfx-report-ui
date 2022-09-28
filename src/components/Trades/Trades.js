import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import Pagination from 'ui/Pagination'
import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import SectionHeader from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import {
  checkInit,
  checkFetch,
  togglePair,
  clearAllPairs,
} from 'state/utils'

import TradesSwitch from './TradesSwitch'
import getColumns from './Trades.columns'
import { propTypes, defaultProps } from './Trades.props'

const TYPE = queryConstants.MENU_TRADES

class Trades extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  togglePair = pair => togglePair(TYPE, this.props, pair)

  clearPairs = () => clearAllPairs(TYPE, this.props)

  render() {
    const {
      columns,
      columnsWidth,
      entries,
      existingPairs,
      getFullTime,
      dataReceived,
      pageLoading,
      refresh,
      t,
      targetPairs,
      timeOffset,
    } = this.props
    const tableColumns = getColumns({
      columnsWidth,
      filteredData: entries,
      getFullTime,
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
            section={TYPE}
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination
            target={TYPE}
            loading={pageLoading}
          />
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader
          title='trades.title'
          target={TYPE}
          pairsSelectorProps={{
            currentFilters: targetPairs,
            existingPairs,
            togglePair: this.togglePair,
          }}
          refresh={refresh}
          clearTargetPairs={this.clearPairs}
        />
        <TradesSwitch target={TYPE} />
        {showContent}
      </Card>
    )
  }
}

Trades.propTypes = propTypes
Trades.defaultProps = defaultProps

export default withTranslation('translations')(Trades)
