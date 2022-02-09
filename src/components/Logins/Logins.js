import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import DataTable from 'ui/DataTable'
import Pagination from 'ui/Pagination'
import SectionHeader from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch } from 'state/utils'

import getColumns from './Logins.columns'

const TYPE = queryConstants.MENU_LOGINS

class Logins extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      browser: PropTypes.bool,
      amount: PropTypes.bool,
      extra: PropTypes.bool,
      id: PropTypes.bool,
      ip: PropTypes.bool,
      mobile: PropTypes.bool,
      time: PropTypes.bool,
      version: PropTypes.bool,
    }),
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      mts: PropTypes.number,
      ip: PropTypes.string,
      browser: PropTypes.string,
      version: PropTypes.string,
      mobile: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    })),
    getFullTime: PropTypes.func.isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    timeOffset: PropTypes.string.isRequired,
  }

  static defaultProps = {
    columns: {},
    entries: [],
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  render() {
    const {
      t,
      columns,
      columnsWidth,
      getFullTime,
      entries,
      refresh,
      timeOffset,
      pageLoading,
      dataReceived,
    } = this.props

    const tableColumns = getColumns({
      columnsWidth,
      getFullTime,
      t,
      timeOffset,
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
        <SectionHeader
          title='logins.title'
          target={TYPE}
          refresh={refresh}
        />
        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(Logins)
