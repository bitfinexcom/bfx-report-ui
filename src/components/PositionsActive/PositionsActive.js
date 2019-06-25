import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
} from '@blueprintjs/core'

import Pagination from 'ui/Pagination'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import {
  getQueryLimit,
  getPath,
  getPageSize,
} from 'state/query/utils'
import {
  checkFetch,
  getCurrentEntries,
  getNoAuthUrlString,
} from 'state/utils'

import getColumns from 'components/Positions/Positions.columns'
import { propTypes, defaultProps } from 'components/Positions/Positions.props'

const TYPE = queryConstants.MENU_POSITIONS_ACTIVE
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

class PositionsActive extends PureComponent {
  componentDidMount() {
    const { loading, fetchActivepositions } = this.props
    if (loading) {
      fetchActivepositions()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  jumpToPositionsAudit = (e) => {
    e.preventDefault()
    const { history } = this.props
    const id = e.target.getAttribute('value')
    history.push(`${getPath(queryConstants.MENU_POSITIONS_AUDIT)}/`
      + `${id}${getNoAuthUrlString(history.location.search)}`)
  }

  jumpToPositions = (e) => {
    e.preventDefault()
    const { history } = this.props
    history.push(`${getPath(queryConstants.MENU_POSITIONS)}`
      + `${getNoAuthUrlString(history.location.search)}`)
  }

  render() {
    const {
      fetchNext,
      fetchPrev,
      getFullTime,
      offset,
      pageOffset,
      pageLoading,
      entries,
      handleClickExport,
      jumpPage,
      loading,
      refresh,
      t,
      nextPage,
      timeOffset,
    } = this.props
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const numRows = filteredData.length
    const tableColums = getColumns({
      target: TYPE,
      filteredData,
      getFullTime,
      t,
      onIdClick: this.jumpToPositionsAudit,
      timeOffset,
    })

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

    const renderButtonGroup = (
      <ButtonGroup>
        <Button onClick={this.jumpToPositions}>{t('positions.closed')}</Button>
        <Button active>{t('positions.active')}</Button>
      </ButtonGroup>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='positions.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {t('positions.title')}
          </h4>
          {renderButtonGroup}
          <br />
          <br />
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('positions.title')}
            {' '}
            <ExportButton handleClickExport={handleClickExport} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          {renderButtonGroup}
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

PositionsActive.propTypes = propTypes
PositionsActive.defaultProps = defaultProps

export default withTranslation('translations')(PositionsActive)
