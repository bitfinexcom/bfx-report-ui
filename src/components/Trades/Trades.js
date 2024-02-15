import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import Pagination from 'ui/Pagination'
import SectionHeader from 'ui/SectionHeader'
import SectionSwitch from 'ui/SectionSwitch'
import queryConstants from 'state/query/constants'
import {
  checkInit,
  checkFetch,
  togglePair,
  clearAllPairs,
} from 'state/utils'

import getColumns from './Trades.columns'
import { propTypes, defaultProps } from './Trades.props'

const TYPE = queryConstants.MENU_TRADES

class Trades extends PureComponent {
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
      columns,
      entries,
      refresh,
      timeOffset,
      targetPairs,
      getFullTime,
      pageLoading,
      dataReceived,
      columnsWidth,
      existingPairs,
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
        <div className='data-table-wrapper'>
          <DataTable
            section={TYPE}
            tableColumns={tableColumns}
            numRows={isLoading ? 5 : tableColumns.length}
          />
          <Pagination
            target={TYPE}
            loading={pageLoading}
          />
        </div>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader
          title='trades.title'
          target={TYPE}
          showHeaderTabs
          pairsSelectorProps={{
            currentFilters: targetPairs,
            existingPairs,
            togglePair: this.togglePair,
          }}
          refresh={refresh}
          clearTargetPairs={this.clearPairs}
        />
        <SectionSwitch target={TYPE} hasSubSections />
        {showContent}
      </Card>
    )
  }
}

Trades.propTypes = propTypes
Trades.defaultProps = defaultProps

export default withTranslation('translations')(Trades)
