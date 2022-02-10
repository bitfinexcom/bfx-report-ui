import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderItem,
  SectionHeaderItemLabel,
  SectionHeaderRow,
  SectionHeaderTitle,
} from 'ui/SectionHeader'
import TimeRange from 'ui/TimeRange'
import ColumnsFilter from 'ui/ColumnsFilter'
import Pagination from 'ui/Pagination'
import SyncSymbolPrefButton from 'ui/SyncSymbolPrefButton'
import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import SymbolSelector from 'ui/SymbolSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getPath } from 'state/query/utils'
import { checkInit, checkFetch } from 'state/utils'

import getColumns from './PublicFunding.columns'

const TYPE = queryConstants.MENU_PUBLIC_FUNDING

class PublicFunding extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      amount: PropTypes.bool,
      currency: PropTypes.bool,
      id: PropTypes.bool,
      mts: PropTypes.bool,
      period: PropTypes.bool,
      rate: PropTypes.bool,
    }),
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      amount: PropTypes.number,
      rate: PropTypes.number,
      mts: PropTypes.number,
      period: PropTypes.number,
    })),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    getFullTime: PropTypes.func.isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    setTargetSymbol: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetSymbol: PropTypes.string,
    timeOffset: PropTypes.string.isRequired,
  }

  static defaultProps = {
    columns: {},
    entries: [],
    targetSymbol: '',
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  onSymbolSelect = (symbol) => {
    const { history, targetSymbol, setTargetSymbol } = this.props
    if (symbol !== targetSymbol) {
      // show select symbol in url
      history.push(`${getPath(TYPE)}/${symbol}${window.location.search}`)
      setTargetSymbol(symbol)
    }
  }

  render() {
    const {
      t,
      columns,
      columnsWidth,
      entries,
      refresh,
      timeOffset,
      pageLoading,
      getFullTime,
      targetSymbol,
      dataReceived,
    } = this.props

    const tableColumns = getColumns({
      columnsWidth,
      getFullTime,
      t,
      timeOffset,
      targetSymbol,
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
            {t('publicfunding.title')}
          </SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <SymbolSelector
                currentCoin={targetSymbol}
                onSymbolSelect={this.onSymbolSelect}
              />
            </SectionHeaderItem>
            <ColumnsFilter target={TYPE} />
            <RefreshButton onClick={refresh} />
            <SyncSymbolPrefButton />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(PublicFunding)
