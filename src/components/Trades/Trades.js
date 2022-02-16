import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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

const TYPE = queryConstants.MENU_TRADES

class Trades extends PureComponent {
  static propTypes = {
    columns: PropTypes.objectOf(PropTypes.bool).isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      execAmount: PropTypes.number.isRequired,
      execPrice: PropTypes.number.isRequired,
      fee: PropTypes.number,
      feeCurrency: PropTypes.string,
      mtsCreate: PropTypes.number.isRequired,
      orderID: PropTypes.number.isRequired,
    })),
    existingPairs: PropTypes.arrayOf(PropTypes.string),
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetPairs: PropTypes.arrayOf(PropTypes.string),
    getFullTime: PropTypes.func.isRequired,
    timeOffset: PropTypes.string.isRequired,
  }

  static defaultProps = {
    entries: [],
    targetPairs: [],
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
      existingPairs,
    } = this.props
    const tableColumns = getColumns({
      t,
      timeOffset,
      getFullTime,
      filteredData: entries,
    }).filter(({ id }) => columns[id])

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <>
          <DataTable
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

export default withTranslation('translations')(Trades)
