import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import DataTable from 'ui/DataTable'
import Pagination from 'ui/Pagination'
import SectionHeader from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch } from 'state/utils'

import { getColumns } from './ChangeLogs.columns'

const TYPE = queryConstants.MENU_CHANGE_LOGS

class ChangeLogs extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      mtsCreate: PropTypes.bool,
      log: PropTypes.bool,
      ip: PropTypes.bool,
      userAgent: PropTypes.bool,
    }),
    entries: PropTypes.arrayOf(PropTypes.shape({
      log: PropTypes.string,
      mts: PropTypes.number,
      ip: PropTypes.string,
      userAgent: PropTypes.string,
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
      columns,
      dataReceived,
      entries,
      getFullTime,
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
        <div className='data-table-wrapper'>
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination
            target={TYPE}
            loading={pageLoading}
          />
        </div>
      )
    }
    return (
      <Card
        elevation={Elevation.ZERO}
        className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader
          target={TYPE}
          refresh={refresh}
          title='changelogs.title'
        />
        {showContent}
      </Card>
    )
  }
}

export default ChangeLogs
