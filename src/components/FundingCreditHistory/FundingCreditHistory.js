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
  toggleSymbol,
  clearAllSymbols,
} from 'state/utils'

import getColumns from './FundingCreditHistory.columns'

const TYPE = queryConstants.MENU_FCREDIT

class FundingCreditHistory extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      amount: PropTypes.bool,
      id: PropTypes.bool,
      mtsLastPayout: PropTypes.bool,
      mtsOpening: PropTypes.bool,
      mtsUpdate: PropTypes.bool,
      period: PropTypes.bool,
      positionPair: PropTypes.bool,
      rate: PropTypes.bool,
      wallet: PropTypes.bool,
      side: PropTypes.bool,
      status: PropTypes.bool,
      symbol: PropTypes.bool,
      type: PropTypes.bool,
    }),
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      side: PropTypes.number.isRequired,
      amount: PropTypes.number,
      status: PropTypes.string,
      rate: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      period: PropTypes.number,
      mtsUpdate: PropTypes.number.isRequired,
      mtsOpening: PropTypes.number,
      mtsLastPayout: PropTypes.number,
      positionPair: PropTypes.string,
    })).isRequired,
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
    existingCoins: [],
    targetSymbols: [],
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  toggleSymbol = symbol => toggleSymbol(TYPE, this.props, symbol)

  clearSymbols = () => clearAllSymbols(TYPE, this.props)

  render() {
    const {
      t,
      refresh,
      columns,
      entries,
      timeOffset,
      pageLoading,
      getFullTime,
      dataReceived,
      existingCoins,
      targetSymbols,
    } = this.props
    const tableColumns = getColumns({
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
          target={TYPE}
          refresh={refresh}
          title='fcredit.title'
          symbolsSelectorProps={{
            currentFilters: targetSymbols,
            existingCoins,
            toggleSymbol: this.toggleSymbol,
          }}
          clearTargetSymbols={this.clearSymbols}
        />
        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(FundingCreditHistory)
