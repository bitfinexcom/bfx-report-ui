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
    columns: PropTypes.shape({
      pair: PropTypes.bool,
      buyingWeightedPrice: PropTypes.bool,
      buyingAmount: PropTypes.bool,
      sellingWeightedPrice: PropTypes.bool,
      sellingAmount: PropTypes.bool,
      cost: PropTypes.bool,
      sale: PropTypes.bool,
      cumulativeAmount: PropTypes.bool,
      firstTradeMts: PropTypes.bool,
      lastTradeMts: PropTypes.bool,
    }),
    columnsWidth: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      width: PropTypes.number,
    })),
    dataReceived: PropTypes.bool.isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
      pair: PropTypes.string,
    })),
    nextPage: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
    ]),
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    getFullTime: PropTypes.func.isRequired,
    targetPair: PropTypes.string.isRequired,
  }

  static defaultProps = {
    columns: {},
    columnsWidth: [],
    entries: [],
    nextPage: false,
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
      entries,
      refresh,
      getFullTime,
      pageLoading,
      columnsWidth,
      dataReceived,
    } = this.props
    const isNoData = isEmpty(entries)
    const isLoading = !dataReceived && pageLoading
    const tableColumns = getColumns({
      t,
      isNoData,
      isLoading,
      getFullTime,
      columnsWidth,
      filteredData: entries,
    }).filter(({ id }) => columns[id])

    let showContent
    if (isNoData) {
      showContent = (
        <div className='data-table-wrapper'>
          <DataTable
            numRows={1}
            section={TYPE}
            isNoData={isNoData}
            isLoading={isLoading}
            tableColumns={tableColumns}
          />
        </div>
      )
    } else {
      showContent = (
        <>
          <DataTable
            numRows={1}
            section={TYPE}
            tableColumns={tableColumns}
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
