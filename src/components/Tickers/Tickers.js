import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import Pagination from 'ui/Pagination'
import ColumnsFilter from 'ui/ColumnsFilter'
import RefreshButton from 'ui/RefreshButton'
import SyncPrefButton from 'ui/SyncPrefButton'
import MultiPairSelector from 'ui/MultiPairSelector'
import ClearFiltersButton from 'ui/ClearFiltersButton'
import queryConstants from 'state/query/constants'
import {
  checkInit,
  checkFetch,
  togglePair,
  clearAllPairs,
} from 'state/utils'

import getColumns from './Tickers.columns'

const TYPE = queryConstants.MENU_TICKERS

class Tickers extends PureComponent {
  static propTypes = {
    columns: PropTypes.objectOf(PropTypes.bool).isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      ask: PropTypes.number,
      bid: PropTypes.number,
      pair: PropTypes.string.isRequired,
      mtsUpdate: PropTypes.number.isRequired,
    })).isRequired,
    existingPairs: PropTypes.arrayOf(PropTypes.string),
    getFullTime: PropTypes.func.isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetPairs: PropTypes.arrayOf(PropTypes.string),
    timeOffset: PropTypes.string.isRequired,
    updateErrorStatus: PropTypes.func.isRequired,
  }

  static defaultProps = {
    targetPairs: [],
    existingPairs: [],
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  togglePair = (pair) => {
    const { targetPairs, updateErrorStatus } = this.props
    if (targetPairs.length === 1 && targetPairs.includes(pair)) {
      updateErrorStatus({ id: 'tickers.minlength' })
    } else {
      togglePair(TYPE, this.props, pair)
    }
  }

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
        <SectionHeader>
          <SectionHeaderTitle>
            {t('tickers.title')}
          </SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <MultiPairSelector
                togglePair={this.togglePair}
                currentFilters={targetPairs}
                existingPairs={existingPairs}
              />
            </SectionHeaderItem>
            <ClearFiltersButton onClick={this.clearPairs} />
            <ColumnsFilter target={TYPE} />
            <RefreshButton onClick={refresh} />
            <SyncPrefButton sectionType={TYPE} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(Tickers)
