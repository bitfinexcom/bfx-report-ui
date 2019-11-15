import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import memoizeOne from 'memoize-one'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'

import ColumnsFilter from 'ui/ColumnsFilter'
import DataTable from 'ui/DataTable'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import MultiPairSelector from 'ui/MultiPairSelector'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import {
  checkFetch,
  togglePair,
} from 'state/utils'

import getColumns from './Derivatives.columns'
import { propTypes, defaultProps } from './Derivatives.props'

const TYPE = queryConstants.MENU_DERIVATIVES

class Derivatives extends PureComponent {
  constructor() {
    super()

    this.getFilteredPairs = memoizeOne(this.getFilteredPairs)
  }

  componentDidMount() {
    const { loading, fetchDerivatives, match } = this.props
    if (loading) {
      const pair = (match.params && match.params.pair) || ''
      fetchDerivatives(pair)
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  getFilteredPairs = pairs => pairs.filter(pair => pair.includes('F0'))

  render() {
    const {
      pairs,
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
    const numRows = entries.length
    const tableColumns = getColumns({
      filteredData: entries,
      getFullTime,
      t,
      timeOffset,
    })

    const renderPairSelector = (
      <Fragment>
        {' '}
        <MultiPairSelector
          currentFilters={targetPairs}
          pairs={this.getFilteredPairs(pairs)}
          existingPairs={existingPairs}
          togglePair={pair => togglePair(TYPE, this.props, pair)}
        />
      </Fragment>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='derivatives.title' />
      )
    } else if (numRows === 0) {
      showContent = (
        <Fragment>
          <h4>
            {t('derivatives.title')}
            {' '}
            {renderPairSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
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
            {t('derivatives.title')}
            {' '}
            {renderPairSelector}
            {' '}
            <ColumnsFilter target={TYPE} />
            {' '}
            <ExportButton handleClickExport={handleClickExport} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          <DataTable
            numRows={numRows}
            tableColums={tableColumns}
          />
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

Derivatives.propTypes = propTypes
Derivatives.defaultProps = defaultProps

export default withTranslation('translations')(Derivatives)
