import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import Pagination from 'ui/Pagination'
import PairSelector from 'ui/PairSelector'
import RefreshButton from 'ui/RefreshButton'
import ColumnsFilter from 'ui/ColumnsFilter'
import SyncPrefButton from 'ui/SyncPrefButton'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch, setPair } from 'state/utils'

import { getColumns } from './PublicTrades.columns'
import { propTypes, defaultProps } from './PublicTrades.props'

const TYPE = queryConstants.MENU_PUBLIC_TRADES

class PublicTrades extends PureComponent {
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
      entries,
      refresh,
      targetPair,
      timeOffset,
      getFullTime,
      pageLoading,
      dataReceived,
      columnsWidth,
    } = this.props
    const isNoData = isEmpty(entries)
    const isLoading = !dataReceived && pageLoading
    const tableColumns = getColumns({
      t,
      isNoData,
      isLoading,
      targetPair,
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
        <div className='data-table-wrapper'>
          <DataTable
            section={TYPE}
            tableColumns={tableColumns}
            numRows={isLoading ? 5 : entries.length}
          />
          <Pagination target={TYPE} loading={pageLoading} />
        </div>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('publictrades.title')}</SectionHeaderTitle>
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.date')}
              </SectionHeaderItemLabel>
              <TimeRange className='section-header-time-range' />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <PairSelector
                currentPair={targetPair}
                onPairSelect={this.onPairSelect}
              />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.columns')}
              </SectionHeaderItemLabel>
              <ColumnsFilter target={TYPE} />
            </SectionHeaderItem>
            <RefreshButton onClick={refresh} />
            <SyncPrefButton sectionType={TYPE} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

PublicTrades.propTypes = propTypes
PublicTrades.defaultProps = defaultProps

export default withTranslation('translations')(PublicTrades)
