import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import DataTable from 'ui/DataTable'
import Pagination from 'ui/Pagination'
import SectionHeader from 'ui/SectionHeader'
import queryConstants from 'state/query/constants'
import { getPath } from 'state/query/utils'
import {
  checkInit,
  checkFetch,
  togglePair,
  clearAllPairs,
} from 'state/utils'

import getColumns from './Positions.columns'
import PositionsSwitch from './PositionsSwitch'

const TYPE = queryConstants.MENU_POSITIONS

class Positions extends PureComponent {
  static propTypes = {
    columns: PropTypes.shape({
      amount: PropTypes.bool,
      basePrice: PropTypes.bool,
      id: PropTypes.bool,
      marginFunding: PropTypes.bool,
      marginFundingType: PropTypes.bool,
      mtsUpdate: PropTypes.bool,
      pair: PropTypes.bool,
      status: PropTypes.bool,
    }),
    entries: PropTypes.arrayOf(PropTypes.shape({
      amount: PropTypes.number,
      basePrice: PropTypes.number,
      liquidationPrice: PropTypes.number,
      marginFunding: PropTypes.number,
      marginFundingType: PropTypes.number,
      mtsUpdate: PropTypes.number,
      pair: PropTypes.string.isRequired,
      pl: PropTypes.number,
      plPerc: PropTypes.number,
    })),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    existingPairs: PropTypes.arrayOf(PropTypes.string),
    getFullTime: PropTypes.func.isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    targetPairs: PropTypes.arrayOf(PropTypes.string),
    timeOffset: PropTypes.string.isRequired,
  }

  static defaultProps = {
    columns: {},
    entries: [],
    targetPairs: [],
    existingPairs: [],
  }

  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  jumpToPositionsAudit = (e) => {
    e.preventDefault()
    const { history } = this.props
    const id = e.target.getAttribute('value')
    history.push(`${getPath(queryConstants.MENU_POSITIONS_AUDIT)}/${id}${window.location.search}`)
  }

  togglePair = pair => togglePair(TYPE, this.props, pair)

  clearPairs = () => clearAllPairs(TYPE, this.props)

  render() {
    const {
      t,
      columns,
      columnsWidth,
      getFullTime,
      refresh,
      entries,
      timeOffset,
      pageLoading,
      targetPairs,
      dataReceived,
      existingPairs,
    } = this.props
    const tableColumns = getColumns({
      columnsWidth,
      t,
      timeOffset,
      getFullTime,
      target: TYPE,
      filteredData: entries,
      onIdClick: this.jumpToPositionsAudit,
    }).filter(({ id }) => columns[id])

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <>
          <DataTable
            section={TYPE}
            numRows={entries.length}
            tableColumns={tableColumns}
          />
          <Pagination
            target={TYPE}
            loading={pageLoading}
          />
        </>
      )
    }

    return (
      <Card
        elevation={Elevation.ZERO}
        className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader
          title='positions.title'
          target={TYPE}
          pairsSelectorProps={{
            existingPairs,
            currentFilters: targetPairs,
            togglePair: this.togglePair,
          }}
          refresh={refresh}
          clearTargetPairs={this.clearPairs}
        />
        <PositionsSwitch target={TYPE} />
        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(Positions)
