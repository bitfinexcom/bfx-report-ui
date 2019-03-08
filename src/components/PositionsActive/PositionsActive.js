import React, { Fragment, PureComponent } from 'react'
import { withNamespaces } from 'react-i18next'
import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
} from '@blueprintjs/core'

import Pagination from 'ui/Pagination'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import MultiPairSelector from 'ui/MultiPairSelector'
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
  getNoAuthTokenUrlString,
  handleAddPairFilter,
  handleRemovePairFilter,
} from 'state/utils'

import getColumns from 'components/Positions/Positions.columns'
import { propTypes, defaultProps } from 'components/Positions/Positions.props'

const TYPE = queryConstants.MENU_POSITIONS_ACTIVE
const LIMIT = getQueryLimit(TYPE)
const PAGE_SIZE = getPageSize(TYPE)

class PositionsActive extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
    this.handleTagRemove = this.handleTagRemove.bind(this)
    this.jumpToPositionsAudit = this.jumpToPositionsAudit.bind(this)
    this.jumpToPositions = this.jumpToPositions.bind(this)
  }

  componentDidMount() {
    const { loading, fetchPositions, match } = this.props
    if (loading) {
      const pair = (match.params && match.params.pair) || ''
      fetchPositions(pair)
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  handleClick(pair) {
    if (!this.handlers[pair]) {
      this.handlers[pair] = () => handleAddPairFilter(TYPE, pair, this.props)
    }
    return this.handlers[pair]
  }

  handleTagRemove(tag) {
    handleRemovePairFilter(TYPE, tag, this.props)
  }

  jumpToPositionsAudit(e) {
    e.preventDefault()
    const { history } = this.props
    const id = e.target.getAttribute('value')
    history.push(`${getPath(queryConstants.MENU_POSITIONS_AUDIT)}/`
      + `${id}${getNoAuthTokenUrlString(history.location.search)}`)
  }

  jumpToPositions(e) {
    e.preventDefault()
    const { history } = this.props
    history.push(`${getPath(queryConstants.MENU_POSITIONS)}/`
      + `${getNoAuthTokenUrlString(history.location.search)}`)
  }

  render() {
    const {
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

    const renderPairSelector = (
      <Fragment>
          &nbsp;
        <MultiPairSelector
          currentFilters={targetPairs}
          existingPairs={existingPairs}
          onPairSelect={this.handleClick}
          handleTagRemove={this.handleTagRemove}
        />
      </Fragment>
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
            &nbsp;
            <TimeRange />
            {renderPairSelector}
          </h4>
          {renderButtonGroup}
          <NoData />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('positions.title')}
            &nbsp;
            <TimeRange />
            {renderPairSelector}
            &nbsp;
            <ExportButton handleClickExport={handleClickExport} />
            &nbsp;
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

export default withNamespaces('translations')(PositionsActive)
