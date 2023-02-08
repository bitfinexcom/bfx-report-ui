import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'
import _size from 'lodash/size'

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
import TimeRange from 'ui/TimeRange'
import RefreshButton from 'ui/RefreshButton'
import SectionSwitch from 'ui/SectionSwitch'
import MultiPairSelector from 'ui/MultiPairSelector'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import {
  checkInit,
  checkFetch,
  togglePair,
  clearAllPairs,
} from 'state/utils'
import queryConstants from 'state/query/constants'

import { getColumns } from './WeightedAverages.columns'

const TYPE = queryConstants.MENU_WEIGHTED_AVERAGES

class WeightedAverages extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      pair: PropTypes.bool,
      buyingWeightedPrice: PropTypes.bool,
      buyingAmount: PropTypes.bool,
      sellingWeightedPrice: PropTypes.bool,
      sellingAmount: PropTypes.bool,
      cumulativeWeightedPrice: PropTypes.bool,
      cumulativeAmount: PropTypes.bool,
    }),
    columnsWidth: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      width: PropTypes.number,
    })),
    dataReceived: PropTypes.bool.isRequired,
    entries: PropTypes.arrayOf(PropTypes.object),
    existingPairs: PropTypes.arrayOf(PropTypes.string),
    inactivePairs: PropTypes.arrayOf(PropTypes.string),
    pairs: PropTypes.arrayOf(PropTypes.string),
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetPairs: PropTypes.arrayOf(PropTypes.string),
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
      pairs,
      columns,
      entries,
      refresh,
      targetPairs,
      pageLoading,
      columnsWidth,
      dataReceived,
      existingPairs,
      inactivePairs,
    } = this.props

    const numRows = _size(entries)
    const tableColumns = getColumns({
      columnsWidth,
      filteredData: entries,
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
            {t('weightedaverages.title')}
          </SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <MultiPairSelector
                pairs={pairs}
                currentFilters={targetPairs}
                togglePair={this.togglePair}
                existingPairs={existingPairs}
                inactivePairs={inactivePairs}
              />
            </SectionHeaderItem>
            <ClearFiltersButton onClick={this.clearPairs} />
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>
        <SectionSwitch target={TYPE} />
        {showContent}
      </Card>
    )
  }
}

export default WeightedAverages
