import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import memoizeOne from 'memoize-one'
import { Card, Elevation } from '@blueprintjs/core'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import ColumnsFilter from 'ui/ColumnsFilter'
import RefreshButton from 'ui/RefreshButton'
import DerivativesSyncPref from 'ui/DerivativesSyncPref'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import MultiPairSelector from 'ui/MultiPairSelector'
import queryConstants from 'state/query/constants'
import {
  checkInit,
  checkFetch,
  togglePair,
  clearAllPairs,
} from 'state/utils'

import { getColumns } from './Derivatives.columns'

const TYPE = queryConstants.MENU_DERIVATIVES

class Derivatives extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      clampMax: PropTypes.bool,
      clampMin: PropTypes.bool,
      fundBal: PropTypes.bool,
      fundingAccrued: PropTypes.bool,
      fundingStep: PropTypes.bool,
      pair: PropTypes.bool,
      price: PropTypes.bool,
      priceSpot: PropTypes.bool,
      timestamp: PropTypes.bool,
    }),
    columnsWidth: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      width: PropTypes.number,
    })),
    dataReceived: PropTypes.bool.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      pair: PropTypes.string,
    })),
    existingPairs: PropTypes.arrayOf(PropTypes.string),
    getFullTime: PropTypes.func.isRequired,
    inactivePairs: PropTypes.arrayOf(PropTypes.string),
    pairs: PropTypes.arrayOf(PropTypes.string),
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetPairs: PropTypes.arrayOf(PropTypes.string),
    timeOffset: PropTypes.string.isRequired,
  }

  static defaultProps = {
    columns: {},
    columnsWidth: [],
    entries: [],
    existingPairs: [],
    inactivePairs: [],
    pairs: [],
    targetPairs: [],
  }

  constructor() {
    super()

    this.getFilteredPairs = memoizeOne(this.getFilteredPairs)
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  getFilteredPairs = pairs => pairs.filter(pair => pair.includes('F0') || pair.includes('PERP'))

  togglePair = pair => togglePair(TYPE, this.props, pair)

  clearPairs = () => clearAllPairs(TYPE, this.props)

  render() {
    const {
      t,
      pairs,
      columns,
      entries,
      refresh,
      timeOffset,
      pageLoading,
      targetPairs,
      getFullTime,
      columnsWidth,
      dataReceived,
      existingPairs,
      inactivePairs,
    } = this.props
    const isNoData = isEmpty(entries)
    const isLoading = !dataReceived && pageLoading
    const tableColumns = getColumns({
      t,
      isNoData,
      isLoading,
      timeOffset,
      getFullTime,
      columnsWidth,
      filteredData: entries,
    }).filter(({ id }) => columns[id])

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
        <>
          <DataTable
            section={TYPE}
            tableColumns={tableColumns}
            numRows={isLoading ? 5 : entries.length}
          />
        </>
      )
    }

    return (
      <Card
        elevation={Elevation.ZERO}
        className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader>
          <SectionHeaderTitle>
            {t('derivatives.title')}
          </SectionHeaderTitle>
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <MultiPairSelector
                currentFilters={targetPairs}
                togglePair={this.togglePair}
                existingPairs={existingPairs}
                pairs={this.getFilteredPairs(pairs)}
                inactivePairs={this.getFilteredPairs(inactivePairs)}
              />
            </SectionHeaderItem>
            <ClearFiltersButton onClick={this.clearPairs} />
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.columns')}
              </SectionHeaderItemLabel>
              <ColumnsFilter target={TYPE} />
            </SectionHeaderItem>
            <RefreshButton onClick={refresh} />
            <DerivativesSyncPref />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default Derivatives
