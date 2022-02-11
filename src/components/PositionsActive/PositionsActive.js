import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import DataTable from 'ui/DataTable'
import SectionHeader from 'ui/SectionHeader'
import PositionsSwitch from 'components/Positions/PositionsSwitch'
import queryConstants from 'state/query/constants'
import { checkFetch } from 'state/utils'
import { getPath } from 'state/query/utils'

import getColumns from 'components/Positions/Positions.columns'

const TYPE = queryConstants.MENU_POSITIONS_ACTIVE

class PositionsActive extends PureComponent {
  static propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape({
      amount: PropTypes.number,
      basePrice: PropTypes.number,
      liquidationPrice: PropTypes.number,
      marginFunding: PropTypes.number,
      marginFundingType: PropTypes.number,
      mtsUpdate: PropTypes.number,
      pair: PropTypes.string,
      pl: PropTypes.number,
      plPerc: PropTypes.number,
    })),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    fetchData: PropTypes.func.isRequired,
    getFullTime: PropTypes.func.isRequired,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    timeOffset: PropTypes.string.isRequired,
  }

  static defaultProps = {
    entries: [],
  }

  componentDidMount() {
    const { dataReceived, pageLoading, fetchData } = this.props
    if (!dataReceived && !pageLoading) {
      fetchData()
    }
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

  render() {
    const {
      t,
      entries,
      refresh,
      timeOffset,
      pageLoading,
      getFullTime,
      dataReceived,
    } = this.props
    const tableColumns = getColumns({
      t,
      timeOffset,
      getFullTime,
      target: TYPE,
      filteredData: entries,
      onIdClick: this.jumpToPositionsAudit,
    })

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData title='positions.no_active' />
    } else {
      showContent = (
        <DataTable
          numRows={entries.length}
          tableColumns={tableColumns}
        />
      )
    }

    return (
      <Card
        elevation={Elevation.ZERO}
        className='section-positions-active col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader
          target={TYPE}
          filter={false}
          timeframe={false}
          title='activepositions.title'
        />
        <PositionsSwitch
          target={TYPE}
          refresh={refresh}
        />
        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(PositionsActive)
