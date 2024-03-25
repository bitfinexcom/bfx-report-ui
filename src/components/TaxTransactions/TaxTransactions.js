import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
import TimeRange from 'ui/TimeRange'
import RefreshButton from 'ui/RefreshButton'

import {
  checkInit,
  checkFetch,
  setPair,
} from 'state/utils'
import queryConstants from 'state/query/constants'

import { getColumns } from './TaxTransactions.columns'

const TYPE = queryConstants.MENU_WEIGHTED_AVERAGES

class TaxTransactions extends PureComponent {
  static propTypes = {
    dataReceived: PropTypes.bool.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      asset: PropTypes.string,
    })),
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    getFullTime: PropTypes.func.isRequired,
  }

  static defaultProps = {
    entries: [],
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
      entries,
      refresh,
      getFullTime,
      pageLoading,
      dataReceived,
    } = this.props
    const isNoData = isEmpty(entries)
    const isLoading = !dataReceived && pageLoading
    const tableColumns = getColumns({
      t,
      isNoData,
      isLoading,
      getFullTime,
      filteredData: entries,
    })

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
        className='weighted-averages col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader>
          <SectionHeaderTitle>
            {t('taxreport.title')}
          </SectionHeaderTitle>
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.date')}
              </SectionHeaderItemLabel>
              <TimeRange className='section-header-time-range' />
            </SectionHeaderItem>
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default TaxTransactions
