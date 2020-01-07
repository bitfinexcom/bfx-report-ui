import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import _sortBy from 'lodash/sortBy'

import Pagination from 'ui/Pagination'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getPath } from 'state/query/utils'
import { checkFetch } from 'state/utils'

import getColumns from 'components/Positions/Positions.columns'
import { propTypes, defaultProps } from './PositionsAudit.props'

const TYPE = queryConstants.MENU_POSITIONS_AUDIT

class PositionsAudit extends PureComponent {
  componentDidMount() {
    const {
      loading, setTargetIds, fetchPaudit, match, targetIds,
    } = this.props
    const ids = _get(match, 'params.id', '').split(',')

    const isIdChanged = !_isEqual(_sortBy(ids), _sortBy(targetIds))
    if (ids.length && (loading || isIdChanged)) {
      setTargetIds(ids)
      fetchPaudit()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  jumpToPositions = (e) => {
    e.preventDefault()
    const { history } = this.props
    history.push(`${getPath(queryConstants.MENU_POSITIONS)}${history.location.search}`)
  }

  render() {
    const {
      entries,
      getFullTime,
      handleClickExport,
      loading,
      pageLoading,
      refresh,
      t,
      timeOffset,
    } = this.props
    const tableColumns = getColumns({
      target: TYPE,
      filteredData: entries,
      getFullTime,
      t,
      timeOffset,
    })

    let showContent
    if (loading) {
      showContent = (
        <Loading title='paudit.title' />
      )
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          <h4>
            {t('paudit.title')}
            {' '}
            <TimeRange />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('paudit.title')}
            {' '}
            <TimeRange />
            {' '}
            <ExportButton handleClickExport={handleClickExport} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
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
        {showContent}
      </Card>
    )
  }
}

PositionsAudit.propTypes = propTypes
PositionsAudit.defaultProps = defaultProps

export default withTranslation('translations')(PositionsAudit)
