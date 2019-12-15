import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
} from '@blueprintjs/core'

import ColumnsFilter from 'ui/ColumnsFilter'
import Pagination from 'ui/Pagination2'
import TimeRange from 'ui/TimeRange'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import MultiPairSelector from 'ui/MultiPairSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getMappedSymbolsFromUrl } from 'state/symbols/utils'
import { getPath } from 'state/query/utils'
import { checkFetch, togglePair } from 'state/utils'

import getColumns from './Positions.columns'
import { propTypes, defaultProps } from './Positions.props'

const TYPE = queryConstants.MENU_POSITIONS

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
      getFullTime,
      entries,
      handleClickExport,
      loading,
      refresh,
      t,
      targetPairs,
      timeOffset,
    } = this.props
    const tableColumns = getColumns({
      target: TYPE,
      filteredData: entries,
      getFullTime,
      t,
      onIdClick: this.jumpToPositionsAudit,
      timeOffset,
    }).filter(({ id }) => columns[id])

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
    } else if (!entries.length) {
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
          <Pagination target={TYPE} loading={loading} />
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination target={TYPE} loading={loading} />
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
