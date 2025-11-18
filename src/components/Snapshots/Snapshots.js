import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
import { isEqual } from '@bitfinex/lib-js-util-base'

import {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import DateInput from 'ui/DateInput'
import InitSyncNote from 'ui/InitSyncNote'
import NavSwitcher from 'ui/NavSwitcher/NavSwitcher'
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
    const {
      dataReceived, pageLoading, fetchData, isSyncRequired,
    } = this.props
    if (!isSyncRequired && !dataReceived && !pageLoading) {
      fetchData()
    }
  }

  componentDidUpdate(prevProps) {
    const {
      refresh, isSyncRequired, shouldRefreshAfterSync, setShouldRefreshAfterSync, currentTime,
    } = this.props
    const { isSyncRequired: prevIsSyncRequired, currentTime: prevTime } = prevProps
    const shouldRefresh = !isEqual(prevIsSyncRequired, isSyncRequired) || !isEqual(prevTime, currentTime)
    if (shouldRefresh) {
      refresh()
    }
    if (shouldRefreshAfterSync && !isSyncRequired) {
      refresh()
      setShouldRefreshAfterSync(false)
    }
  }

  handleDateChange = (time) => {
    const { setTimestamp } = this.props
    const end = time && time.getTime()
    if (isValidTimeStamp(end) || time === null) {
      this.setState({ timestamp: time })
      setTimestamp(end)
    }
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
    history.push(`${path}${window.location.search}`)
  }

  render() {
    const {
      t,
      pageLoading,
      dataReceived,
      walletsEntries,
      isFirstSyncing,
      positionsEntries,
      positionsTotalPlUsd,
      walletsTickersEntries,
      walletsTotalBalanceUsd,
      positionsTickersEntries,
    } = this.props
    const { timestamp } = this.state
    const isLoading = !dataReceived && pageLoading
    const section = this.getCurrentSection()
    const isNoData = (section === MENU_POSITIONS && !positionsEntries.length)
      || (section === MENU_TICKERS && !positionsTickersEntries.length && !walletsTickersEntries.length)
      || (section === MENU_WALLETS && !walletsEntries.length)

    let showContent
    if (isFirstSyncing) {
      showContent = <InitSyncNote />
    } else if (section === MENU_WALLETS) {
      showContent = (
        <WalletsSnapshot
          isLoading={isLoading}
          entries={walletsEntries}
          totalBalanceUsd={walletsTotalBalanceUsd}
        />
      )
    } else if (section === MENU_POSITIONS) {
      showContent = (
        <PositionsSnapshot
          isNoData={isNoData}
          isLoading={isLoading}
          entries={positionsEntries}
          totalPlUsd={positionsTotalPlUsd}
        />
      )
    } else {
      showContent = (
        <TickersSnapshot
          isLoading={isLoading}
          walletsTickersEntries={walletsTickersEntries}
          positionsTickersEntries={positionsTickersEntries}
        />
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='snapshots col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('snapshots.title')}</SectionHeaderTitle>
          <NavSwitcher
            items={[
              { value: MENU_POSITIONS, label: t('positions.title') },
              { value: MENU_TICKERS, label: t('tickers.title') },
              { value: MENU_WALLETS, label: t('wallets.title') },
            ]}
            onChange={this.switchSection}
            value={section}
          />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('query.endTime')}
              </SectionHeaderItemLabel>
              <DateInput
                defaultValue={timestamp}
                onChange={this.handleDateChange}
                isDisabled={isFirstSyncing || isLoading}
              />
            </SectionHeaderItem>
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

Snapshots.propTypes = propTypes
Snapshots.defaultProps = defaultProps

export default withTranslation('translations')(Snapshots)
