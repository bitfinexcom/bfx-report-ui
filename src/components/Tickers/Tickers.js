import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderItem,
  SectionHeaderItemLabel,
  SectionHeaderRow,
  SectionHeaderTitle,
} from 'ui/SectionHeader'
import ColumnsFilter from 'ui/ColumnsFilter'
import RefreshButton from 'ui/RefreshButton'
import MultiPairSelector from 'ui/MultiPairSelector'
import Pagination from 'ui/Pagination'
import SyncPrefButton from 'ui/SyncPrefButton'
import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch, togglePair } from 'state/utils'

import getColumns from './Tickers.columns'
import { propTypes, defaultProps } from './Tickers.props'

const TYPE = queryConstants.MENU_TICKERS

class Tickers extends PureComponent {
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

  render() {
    const {
      columns,
      existingPairs,
      getFullTime,
      entries,
      dataReceived,
      pageLoading,
      refresh,
      t,
      targetPairs,
      timeOffset,
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
        <Fragment>
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination target={TYPE} loading={pageLoading} />
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('tickers.title')}</SectionHeaderTitle>
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <MultiPairSelector
                currentFilters={targetPairs}
                existingPairs={existingPairs}
                togglePair={this.togglePair}
              />
            </SectionHeaderItem>
            <ColumnsFilter target={TYPE} />
            <SyncPrefButton sectionType={TYPE} />
            <RefreshButton handleClickRefresh={refresh} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

Tickers.propTypes = propTypes
Tickers.defaultProps = defaultProps

export default withTranslation('translations')(Tickers)
