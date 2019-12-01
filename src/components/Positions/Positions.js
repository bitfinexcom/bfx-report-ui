import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
} from '@blueprintjs/core'

import ColumnsFilter from 'ui/ColumnsFilter'
import Pagination from 'ui/Pagination'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import MultiPairSelector from 'ui/MultiPairSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getMappedSymbolsFromUrl } from 'state/symbols/utils'
import {
  getQueryLimit,
  getPath,
  getPageSize,
} from 'state/query/utils'
import {
  checkFetch,
  getCurrentEntries,
  togglePair,
} from 'state/utils'

import getColumns from './Positions.columns'
import { propTypes, defaultProps } from './Positions.props'

const TYPE = queryConstants.MENU_POSITIONS
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

class Positions extends PureComponent {
  componentDidMount() {
    const {
      loading, setTargetPairs, fetchPositions, match,
    } = this.props
    if (loading) {
      const pairs = (match.params && match.params.pair) || ''
      if (pairs) {
        setTargetPairs(getMappedSymbolsFromUrl(pairs))
      }
      fetchPositions()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  jumpToPositionsAudit = (e) => {
    e.preventDefault()
    const { history } = this.props
    const id = e.target.getAttribute('value')
    history.push(`${getPath(queryConstants.MENU_POSITIONS_AUDIT)}/${id}${history.location.search}`)
  }

  jumpToActivePositions = (e) => {
    e.preventDefault()
    const { history } = this.props
    history.push(`${getPath(queryConstants.MENU_POSITIONS_ACTIVE)}${history.location.search}`)
  }

  render() {
    const {
      columns,
      existingPairs,
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
      targetPairs,
      nextPage,
      timeOffset,
    } = this.props
    const filteredData = getCurrentEntries(entries, offset, LIMIT, pageOffset, PAGE_SIZE)
    const numRows = filteredData.length
    const tableColumns = getColumns({
      target: TYPE,
      filteredData,
      getFullTime,
      t,
      onIdClick: this.jumpToPositionsAudit,
      timeOffset,
    }).filter(({ id }) => columns[id])

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

    const renderPairSelector = (
      <Fragment>
        {' '}
        <MultiPairSelector
          currentFilters={targetPairs}
          existingPairs={existingPairs}
          togglePair={pair => togglePair(TYPE, this.props, pair)}
        />
      </Fragment>
    )

    const renderButtonGroup = (
      <ButtonGroup>
        <Button active>{t('positions.closed')}</Button>
        <Button onClick={this.jumpToActivePositions}>{t('positions.active')}</Button>
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
            {' '}
            <TimeRange />
            {renderPairSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
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
            <TimeRange />
            {renderPairSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <ExportButton handleClickExport={handleClickExport} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          {renderButtonGroup}
          {renderPagination}
          <DataTable
            numRows={numRows}
            tableColumns={tableColumns}
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

Positions.propTypes = propTypes
Positions.defaultProps = defaultProps

export default withTranslation('translations')(Positions)
