import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import memoizeOne from 'memoize-one'
import { Card, Elevation } from '@blueprintjs/core'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
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
import MultiPairSelector from 'ui/MultiPairSelector'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import DerivativesSyncPref from 'ui/DerivativesSyncPref'
import queryConstants from 'state/query/constants'
import {
  checkInit,
  checkFetch,
  togglePair,
  clearAllPairs,
} from 'state/utils'

import getColumns from './Derivatives.columns'

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
    entries: PropTypes.arrayOf(PropTypes.object),
    inactivePairs: PropTypes.arrayOf(PropTypes.string),
    pairs: PropTypes.arrayOf(PropTypes.string),
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
    pairs: [],
    columns: {},
    entries: [],
    targetPairs: [],
    existingPairs: [],
    inactivePairs: [],
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
      columns,
      columnsWidth,
      pairs,
      entries,
      refresh,
      timeOffset,
      getFullTime,
      targetPairs,
      pageLoading,
      dataReceived,
      inactivePairs,
      existingPairs,
    } = this.props

    const numRows = entries.length
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
    } else if (numRows === 0) {
      showContent = <NoData />
    } else {
      showContent = (
        <>
          <DataTable
            section={TYPE}
            numRows={numRows}
            tableColumns={tableColumns}
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
            <ColumnsFilter target={TYPE} />
            <RefreshButton onClick={refresh} />
            <DerivativesSyncPref />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(Derivatives)
