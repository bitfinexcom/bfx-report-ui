import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button, ButtonGroup,
  Card,
  Elevation,
  Intent,
  Position,
  Tooltip,
} from '@blueprintjs/core'

import DateInput from 'ui/DateInput'
import ExportButton from 'ui/ExportButton'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import RefreshButton from 'ui/RefreshButton'
import DataTable from 'ui/DataTable'
import { isValidTimeStamp } from 'state/query/utils'
import queryConstants from 'state/query/constants'

import getPositionsColumns from './Positions.columns'
import getWalletsColumns from './Wallets.columns'
import { propTypes, defaultProps } from './Snapshots.props'

const {
  MENU_POSITIONS,
  MENU_WALLETS,
  WALLET_EXCHANGE,
  WALLET_MARGIN,
  WALLET_FUNDING,
} = queryConstants

class Snapshots extends PureComponent {
  constructor(props) {
    super(props)
    const { currentTime } = props

    this.state = {
      timestamp: currentTime ? new Date(currentTime) : null,
    }
  }

  componentDidMount() {
    const { loading, fetchSnapshots } = this.props
    if (loading) {
      fetchSnapshots()
    }
  }

  handleDateChange = (time) => {
    const end = time && time.getTime()
    if (isValidTimeStamp(end) || time === null) {
      this.setState({ timestamp: time })
    }
  }

  handleQuery = (e) => {
    e.preventDefault()
    const { fetchSnapshots } = this.props
    const { timestamp } = this.state
    const time = timestamp ? timestamp.getTime() : null
    fetchSnapshots(time)
  }

  getCurrentSection = () => {
    const { history } = this.props

    switch (history.location.pathname) {
      case '/snapshots_positions':
        return MENU_POSITIONS
      case '/snapshots_wallets':
        return MENU_WALLETS
      default:
        return ''
    }
  }

  switchSection = (section) => {
    const { history } = this.props

    const path = (section === MENU_POSITIONS)
      ? '/snapshots_positions'
      : '/snapshots_wallets'

    history.push(`${path}${history.location.search}`)
  }

  render() {
    const {
      currentTime,
      getFullTime,
      timeOffset,
      positionsEntries,
      walletsEntries,
      handleClickExport,
      loading,
      refresh,
      t,
    } = this.props
    const { timestamp } = this.state

    const section = this.getCurrentSection()
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp

    const positionsColumns = getPositionsColumns({
      filteredData: positionsEntries,
      getFullTime,
      t,
      timeOffset,
    })


    const renderTimeSelection = (
      <Fragment>
        <Tooltip
          content={(
            <span>
              {t('snapshots.query.tooltip')}
            </span>
          )}
          position={Position.TOP}
          usePortal
        >
          <DateInput onChange={this.handleDateChange} value={timestamp} daysOnly />
        </Tooltip>
        <Button
          onClick={this.handleQuery}
          intent={hasNewTime ? Intent.PRIMARY : null}
          disabled={!hasNewTime}
        >
          {t('snapshots.query.title')}
        </Button>
      </Fragment>
    )

    const renderButtonGroup = (
      <ButtonGroup>
        <Button
          active={section === MENU_POSITIONS}
          onClick={() => this.switchSection(MENU_POSITIONS)}
        >
          {t('positions.title')}
        </Button>
        <Button
          active={section === MENU_WALLETS}
          onClick={() => this.switchSection(MENU_WALLETS)}
        >
          {t('wallets.title')}
        </Button>
      </ButtonGroup>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='snapshots.title' />
      )
    } else if ((section === MENU_POSITIONS && !positionsEntries.length)
      || (section === MENU_WALLETS && !walletsEntries.length)) {
      showContent = (
        <Fragment>
          <h4>
            {t('snapshots.title')}
            {' '}
            {renderTimeSelection}
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          {renderButtonGroup}
          <br />
          <br />
          <NoData descId='snapshots.nodata' />
        </Fragment>
      )
    } else if (section === MENU_WALLETS) {
      const exchangeData = walletsEntries.filter(entry => entry.type === WALLET_EXCHANGE)
      const marginData = walletsEntries.filter(entry => entry.type === WALLET_MARGIN)
      const fundingData = walletsEntries.filter(entry => entry.type === WALLET_FUNDING)
      const exchangeColums = getWalletsColumns({ filteredData: exchangeData, t })
      const marginColums = getWalletsColumns({ filteredData: marginData, t })
      const fundingColums = getWalletsColumns({ filteredData: fundingData, t })
      const exchangeRows = exchangeData.length
      const marginRows = marginData.length
      const fundingRows = fundingData.length

      showContent = (
        <Fragment>
          <h4>
            {t('snapshots.title')}
            {' '}
            {renderTimeSelection}
            {' '}
            <ExportButton handleClickExport={handleClickExport} timestamp={timestamp} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          {renderButtonGroup}
          <br />
          <h4>
            {t('wallets.header.exchange')}
          </h4>
          <DataTable
            numRows={exchangeRows}
            tableColums={exchangeColums}
          />
          <h4>
            {t('wallets.header.margin')}
          </h4>
          <DataTable
            numRows={marginRows}
            tableColums={marginColums}
          />
          <h4>
            {t('wallets.header.funding')}
          </h4>
          <DataTable
            numRows={fundingRows}
            tableColums={fundingColums}
          />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          <h4>
            {t('snapshots.title')}
            {' '}
            {renderTimeSelection}
            {' '}
            <ExportButton handleClickExport={handleClickExport} timestamp={timestamp} />
            {' '}
            <RefreshButton handleClickRefresh={refresh} />
          </h4>
          {renderButtonGroup}
          <br />
          <br />
          <DataTable
            numRows={positionsEntries.length}
            tableColums={positionsColumns}
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

Snapshots.propTypes = propTypes
Snapshots.defaultProps = defaultProps

export default withTranslation('translations')(Snapshots)
