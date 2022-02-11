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
import DataTable from 'ui/DataTable'
import TimeRange from 'ui/TimeRange'
import Pagination from 'ui/Pagination'
import PairSelector from 'ui/PairSelector'
import RefreshButton from 'ui/RefreshButton'
import ColumnsFilter from 'ui/ColumnsFilter'
import SyncPrefButton from 'ui/SyncPrefButton'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch, setPair } from 'state/utils'

import getColumns from './PublicTrades.columns'

const TYPE = queryConstants.MENU_PUBLIC_TRADES

class PublicTrades extends PureComponent {
  static propTypes = {
    columns: PropTypes.objectOf(PropTypes.bool),
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      mts: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })),
    getFullTime: PropTypes.func.isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetPair: PropTypes.string,
    timeOffset: PropTypes.string.isRequired,
  }

  static defaultProps = {
    columns: {},
    entries: [],
    targetPair: '',
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  onPairSelect = pair => setPair(TYPE, this.props, pair)

  render() {
    const {
      t,
      columns,
      columnsWidth,
      entries,
      refresh,
      targetPair,
      timeOffset,
      getFullTime,
      pageLoading,
      dataReceived,
    } = this.props

    const tableColumns = getColumns({
      columnsWidth,
      t,
      targetPair,
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
            section={TYPE}
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
            {t('publictrades.title')}
          </SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <PairSelector
                currentPair={targetPair}
                onPairSelect={this.onPairSelect}
              />
            </SectionHeaderItem>
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

export default withTranslation('translations')(PublicTrades)
