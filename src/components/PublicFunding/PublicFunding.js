import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import Pagination from 'ui/Pagination'
import SyncSymbolPrefButton from 'ui/SyncSymbolPrefButton'
import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import SectionHeader from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import { getPath } from 'state/query/utils'
import { checkInit, checkFetch } from 'state/utils'

import getColumns from './PublicFunding.columns'
import { propTypes, defaultProps } from './PublicFunding.props'

const TYPE = queryConstants.MENU_PUBLIC_FUNDING

class PublicFunding extends PureComponent {
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
      columns,
      coins,
      currencies,
      getFullTime,
      entries,
      dataReceived,
      pageLoading,
      refresh,
      t,
      targetSymbol,
      timeOffset,
    } = this.props

    const tableColumns = getColumns({
      filteredData: entries,
      getFullTime,
      t,
      targetSymbol,
      timeOffset,
    }).filter(({ id }) => columns[id])

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <SyncSymbolPrefButton />
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <SyncSymbolPrefButton />
          <Pagination target={TYPE} loading={pageLoading} />
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
        <SectionHeader
          title='publicfunding.title'
          target={TYPE}
          symbolSelectorProps={{
            coins,
            currencies,
            currentCoin: targetSymbol,
            onSymbolSelect: this.onSymbolSelect,
          }}
          refresh={refresh}
        />
        {showContent}
      </Card>
    )
  }
}

PublicFunding.propTypes = propTypes
PublicFunding.defaultProps = defaultProps

export default withTranslation('translations')(PublicFunding)
