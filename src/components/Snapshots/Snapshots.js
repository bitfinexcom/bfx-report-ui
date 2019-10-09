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
import { isValidTimeStamp } from 'state/query/utils'
import queryConstants from 'state/query/constants'

import PositionsSnapshot from './PositionsSnapshot'
import TickersSnapshot from './TickersSnapshot'
import WalletsSnapshot from './WalletsSnapshot'
import { propTypes, defaultProps } from './Snapshots.props'

const {
  MENU_POSITIONS,
  MENU_TICKERS,
  MENU_WALLETS,
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
      positionsTotalPlUsd,
      positionsEntries,
      positionsTickersEntries,
      walletsTotalBalanceUsd,
      walletsTickersEntries,
      walletsEntries,
      handleClickExport,
      loading,
      refresh,
      t,
    } = this.props
    const { timestamp } = this.state

    if (loading) {
      return (
        <Fragment>
          <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <Loading title='snapshots.title' />
          </Card>
        </Fragment>
      )
    }

    const section = this.getCurrentSection()
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp

    const isNotEmpty = !!(positionsEntries.length || positionsTickersEntries.length
      || walletsTickersEntries.length || walletsEntries.length)

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
          <DateInput onChange={this.handleDateChange} value={timestamp} />
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
              <ExportButton handleClickExport={handleClickExport} />
            </Fragment>
          )}
          {' '}
          <RefreshButton handleClickRefresh={refresh} />
        </h4>
        {renderButtonGroup}
        <br />
      </Fragment>
    )

    const isEmpty = (section === MENU_POSITIONS && !positionsEntries.length)
      || (section === MENU_TICKERS && !positionsTickersEntries.length && !walletsTickersEntries)
      || (section === MENU_WALLETS && !walletsEntries.length)

    let showContent
    if (isEmpty) {
      showContent = (
        <Fragment>
          <br />
          <NoData descId='snapshots.nodata' />
        </Fragment>
      )
    } else if (section === MENU_WALLETS) {
      showContent = (
        <WalletsSnapshot
          totalBalanceUsd={walletsTotalBalanceUsd}
          entries={walletsEntries}
        />
      )
    } else if (section === MENU_POSITIONS) {
      showContent = (
        <PositionsSnapshot
          totalPlUsd={positionsTotalPlUsd}
          entries={positionsEntries}
        />
      )
    } else {
      showContent = (
        <TickersSnapshot
          positionsTickersEntries={positionsTickersEntries}
          walletsTickersEntries={walletsTickersEntries}
        />
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        {renderTitle}
        <br />
        {showContent}
      </Card>
    )
  }
}

Snapshots.propTypes = propTypes
Snapshots.defaultProps = defaultProps

export default withTranslation('translations')(Snapshots)
