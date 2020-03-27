import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import SectionHeader from 'ui/SectionHeader'
import Pagination from 'ui/Pagination'
import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch, toggleSymbol } from 'state/utils'

import getColumns from './Ledgers.columns'
import { propTypes, defaultProps } from './Ledgers.props'

const TYPE = queryConstants.MENU_LEDGERS

class Ledgers extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  toggleSymbol = symbol => toggleSymbol(TYPE, this.props, symbol)

  render() {
    const {
      columns,
      getFullTime,
      targetSymbols,
      entries,
      existingCoins,
      dataReceived,
      pageLoading,
      refresh,
      t,
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
          <Pagination loading={pageLoading} target={TYPE} />
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination loading={pageLoading} target={TYPE} />
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader
          title='ledgers.title'
          target={TYPE}
          symbolsSelectorProps={{
            currentFilters: targetSymbols,
            existingCoins,
            toggleSymbol: this.toggleSymbol,
          }}
          refresh={refresh}
        />
        {showContent}
      </Card>
    )
  }
}

Ledgers.propTypes = propTypes
Ledgers.defaultProps = defaultProps

export default withTranslation('translations')(Ledgers)
