import React, { Fragment, PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Card,
  Elevation,
  Intent,
  NonIdealState,
} from '@blueprintjs/core'

import Pagination from 'components/Pagination'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import {
  getQueryLimit,
  getPageSize,
  getPath,
} from 'state/query/utils'
import {
  checkFetch,
  getCurrentEntries,
  getNoAuthTokenUrlString,
} from 'state/utils'

import getColumns from 'components/Positions/Positions.columns'
import { propTypes, defaultProps } from './PositionsAudit.props'

const TYPE = queryConstants.MENU_POSITIONS_AUDIT
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

class PositionsAudit extends PureComponent {
  constructor(props) {
    super(props)
    this.jumpToPositions = this.jumpToPositions.bind(this)
  }

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

  jumpToPositions(e) {
    e.preventDefault()
    const { history } = this.props
    history.push(`${getPath(queryConstants.MENU_POSITIONS)}${getNoAuthTokenUrlString(history.location.search)}`)
  }

  render() {
    const {
      entries,
      fetchNext,
      fetchPaudit,
      fetchPrev,
      handleClickExport,
      intl,
      jumpPage,
      loading,
      match,
      nextPage,
      noid,
      offset,
      pageOffset,
      pageLoading,
      refresh,
      targetIds,
      timezone,
    } = this.props
    if (noid) {
      return (
        <NonIdealState
          className='bitfinex-nonideal'
          icon='numbered-list'
          title={intl.formatMessage({ id: 'paudit.noid' })}
          description={intl.formatMessage({ id: 'paudit.noid.description' })}
        >
          <Button
            intent={Intent.PRIMARY}
            onClick={this.jumpToPositions}
          >
            {intl.formatMessage({ id: 'positions.title' })}
          </Button>
        </NonIdealState>
      )
    }
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
