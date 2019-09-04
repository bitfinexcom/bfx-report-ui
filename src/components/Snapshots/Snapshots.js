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
import getPositionsTickersColumns from './PositionsTickers.columns'
import getWalletsTickersColumns from './WalletsTickers.columns'
import getWalletsColumns from './Wallets.columns'
import { propTypes, defaultProps } from './Snapshots.props'

const {
  MENU_POSITIONS,
  MENU_TICKERS,
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
      case '/snapshots_tickers':
        return MENU_TICKERS
      case '/snapshots_wallets':
        return MENU_WALLETS
      default:
        return ''
    }
  }

  getSectionURL = (section) => {
    switch (section) {
      case MENU_POSITIONS:
        return '/snapshots_positions'
      case MENU_TICKERS:
        return '/snapshots_tickers'
      case MENU_WALLETS:
        return '/snapshots_wallets'
      default:
        return ''
    }
  }

  switchSection = (section) => {
    const { history } = this.props

    const path = this.getSectionURL(section)

    history.push(`${path}${history.location.search}`)
  }

  render() {
    const {
      currentTime,
      getFullTime,
      timeOffset,
      positionsEntries,
      positionsTickersEntries,
      walletsTickersEntries,
      walletsEntries,
      handleClickExport,
      loading,
      refresh,
      t,
    } = this.props
    const { timestamp } = this.state

    const section = this.getCurrentSection()
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp

    const isNotEmpty = !!(positionsEntries.length || positionsTickersEntries.length
      || walletsTickersEntries || walletsEntries.length)

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
          active={section === MENU_TICKERS}
          onClick={() => this.switchSection(MENU_TICKERS)}
        >
          {t('tickers.title')}
        </Button>
        <Button
          active={section === MENU_WALLETS}
          onClick={() => this.switchSection(MENU_WALLETS)}
        >
          {t('wallets.title')}
        </Button>
      </ButtonGroup>
    )

    const renderTitle = (
      <Fragment>
        <h4>
          {t('snapshots.title')}
          {' '}
          {renderTimeSelection}
          {isNotEmpty && (
            <Fragment>
              {' '}
              <ExportButton handleClickExport={handleClickExport} timestamp={timestamp} />
            </Fragment>
          )}
          {' '}
          <RefreshButton handleClickRefresh={refresh} />
        </h4>
        {renderButtonGroup}
        <br />
      </Fragment>
    )

    let showContent
    if (loading) {
      showContent = (
        <Loading title='snapshots.title' />
      )
    } else if ((section === MENU_POSITIONS && !positionsEntries.length)
      || (section === MENU_TICKERS && (!positionsTickersEntries.length && !walletsTickersEntries))
      || (section === MENU_WALLETS && !walletsEntries.length)) {
      showContent = (
        <Fragment>
          {renderTitle}
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
          {renderTitle}
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
    } else if (section === MENU_POSITIONS) {
      const positionsColumns = getPositionsColumns({
        filteredData: positionsEntries,
        getFullTime,
        t,
        timeOffset,
      })

      showContent = (
        <Fragment>
          {renderTitle}
          <br />
          <DataTable
            numRows={positionsEntries.length}
            tableColums={positionsColumns}
          />
        </Fragment>
      )
    } else {
      const positionsTickersColumns = getPositionsTickersColumns({ filteredData: positionsTickersEntries })
      const walletsTickersColumns = getWalletsTickersColumns({ filteredData: walletsTickersEntries, t })

      showContent = (
        <Fragment>
          {renderTitle}
          <h4>{t('positions.title')}</h4>
          <DataTable
            numRows={positionsTickersEntries.length}
            tableColums={positionsTickersColumns}
          />
          <h4>{t('wallets.title')}</h4>
          <DataTable
            numRows={walletsTickersEntries.length}
            tableColums={walletsTickersColumns}
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
