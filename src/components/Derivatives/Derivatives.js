import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import memoizeOne from 'memoize-one'
import { Card, Elevation } from '@blueprintjs/core'

import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import SectionHeader from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import { checkInit, checkFetch, togglePair } from 'state/utils'

import getColumns from './Derivatives.columns'
import { propTypes, defaultProps } from './Derivatives.props'

const TYPE = queryConstants.MENU_DERIVATIVES

class Derivatives extends PureComponent {
  constructor() {
    super()

    this.getFilteredPairs = memoizeOne(this.getFilteredPairs)
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  getFilteredPairs = pairs => pairs.filter(pair => pair.includes('F0'))

  togglePair = pair => togglePair(TYPE, this.props, pair)

  render() {
    const {
      columns,
      pairs,
      existingPairs,
      getFullTime,
      entries,
      dataReceived,
      pageLoading,
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
    }).filter(({ id }) => columns[id])

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (numRows === 0) {
      showContent = <NoData />
    } else {
      showContent = (
        <Fragment>
          <DataTable
            numRows={numRows}
            tableColumns={tableColumns}
          />
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader
          pairsSelectorProps={{
            currentFilters: targetPairs,
            existingPairs,
            pairs: this.getFilteredPairs(pairs),
            togglePair: this.togglePair,
          }}
          refresh={refresh}
          target={TYPE}
          timeframe={false}
          title='derivatives.title'
        />
        {showContent}
      </Card>
    )
  }
}

Derivatives.propTypes = propTypes
Derivatives.defaultProps = defaultProps

export default withTranslation('translations')(Derivatives)
