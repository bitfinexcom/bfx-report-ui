import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
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
import getColumns from 'components/Ledgers/Ledgers.columns'

import AffiliatesLink from './AffiliatesEarnings.link'

const TYPE = queryConstants.MENU_AFFILIATES_EARNINGS

/**
 * Affiliates Earnings has the same state and columns as Ledgers
 */
class AffiliatesEarnings extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      amount: PropTypes.bool,
      amountUsd: PropTypes.bool,
      balance: PropTypes.bool,
      balanceUsd: PropTypes.bool,
      currency: PropTypes.bool,
      description: PropTypes.bool,
      id: PropTypes.bool,
      mts: PropTypes.bool,
      wallet: PropTypes.bool,
    }),
    columnsWidth: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      width: PropTypes.number,
    })),
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      balance: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      mts: PropTypes.number.isRequired,
      wallet: PropTypes.string,
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
    columnsWidth: [],
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
      columns,
      columnsWidth,
      dataReceived,
      entries,
      existingCoins,
      getFullTime,
      pageLoading,
      refresh,
      t,
      targetSymbols,
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
          showHeaderTabs
          refresh={refresh}
          title='affiliatesearnings.title'
          getTitleLink={() => <AffiliatesLink />}
          symbolsSelectorProps={{
            existingCoins,
            currentFilters: targetSymbols,
            toggleSymbol: this.toggleSymbol,
          }}
          clearTargetSymbols={this.clearSymbols}
        />
        {showContent}
      </Card>
    )
  }
}

export default AffiliatesEarnings
