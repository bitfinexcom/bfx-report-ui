import React, { Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'

import Pagination from 'components/Pagination'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getQueryLimit, getPageSize } from 'state/query/utils'
import {
  checkFetch,
  getCurrentEntries,
} from 'state/utils'

import getColumns from 'components/Positions/Positions.columns'
import { propTypes, defaultProps } from './PositionsAudit.props'

const TYPE = queryConstants.MENU_POSITIONS_AUDIT
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

class PositionsAudit extends PureComponent {
  componentDidMount() {
    const { loading, fetchPaudit, match } = this.props
    if (loading) {
      const id = (match.params && match.params.id)
      if (id) {
        fetchPaudit(id)
      }
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  render() {
    const {
      fetchNext,
      fetchPaudit,
      fetchPrev,
      offset,
      pageOffset,
      pageLoading,
      entries,
      handleClickExport,
      intl,
      jumpPage,
      loading,
      refresh,
      targetIds,
      timezone,
      nextPage,
      match,
    } = this.props
    // workaround for withRouter doesn't trigger update when param is changed
    // could fix by using context API instead of withRouter
    // https://github.com/ReactTraining/react-router/pull/6159
    const urlIds = match.params && match.params.id
    if (urlIds && urlIds !== targetIds.join(',')) {
      fetchPaudit(urlIds)
    }
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const numRows = filteredData.length
    const tableColums = getColumns({ filteredData, intl, timezone })

    const renderPagination = (
      <Pagination
        type={TYPE}
        dataLen={entries.length}
        loading={pageLoading}
        offset={offset}
        jumpPage={jumpPage}
        prevClick={fetchPrev}
        nextClick={fetchNext}
        pageOffset={pageOffset}
        nextPage={nextPage}
      />
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='paudit.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'paudit.title' })}
            &nbsp;
            <TimeRange />
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {intl.formatMessage({ id: 'paudit.title' })}
            &nbsp;
            <TimeRange />
            &nbsp;
            <ExportButton handleClickExport={handleClickExport} />
            &nbsp;
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          {renderPagination}
          <DataTable
            numRows={numRows}
            tableColums={tableColums}
          />
          {renderPagination}
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        {showContent}
      </Card>
    )
  }
}

PositionsAudit.propTypes = propTypes
PositionsAudit.defaultProps = defaultProps

export default injectIntl(PositionsAudit)
