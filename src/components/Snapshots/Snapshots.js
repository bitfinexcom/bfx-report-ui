import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderTitle,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import DateInput from 'ui/DateInput'
import QueryButton from 'ui/QueryButton'
import RefreshButton from 'ui/RefreshButton'
import NavSwitcher from 'ui/NavSwitcher/NavSwitcher'
import { isValidTimeStamp } from 'state/query/utils'
import queryConstants from 'state/query/constants'

import WalletsSnapshot from './WalletsSnapshot'
import TickersSnapshot from './TickersSnapshot'
import PositionsSnapshot from './PositionsSnapshot'

const {
  MENU_POSITIONS,
  MENU_TICKERS,
  MENU_WALLETS,
} = queryConstants

class Snapshots extends PureComponent {
  static propTypes = {
    currentTime: PropTypes.number,
    dataReceived: PropTypes.bool.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    positionsTotalPlUsd: PropTypes.number,
    positionsEntries: PropTypes.arrayOf(PropTypes.shape({
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
    positionsTickersEntries: PropTypes.arrayOf(
      PropTypes.shape({
        pair: PropTypes.string,
        amount: PropTypes.number,
      }),
    ),
    walletsTotalBalanceUsd: PropTypes.number,
    walletsTickersEntries: PropTypes.arrayOf(
      PropTypes.shape({
        walletType: PropTypes.string,
        pair: PropTypes.string,
        amount: PropTypes.number,
      }),
    ),
    walletsEntries: PropTypes.arrayOf(PropTypes.shape({
      currency: PropTypes.string,
      balance: PropTypes.number,
      unsettledInterest: PropTypes.number,
      balanceAvailable: PropTypes.number,
    })),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      location: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    fetchData: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    currentTime: null,
    walletsEntries: [],
    positionsEntries: [],
    positionsTickersEntries: [],
    walletsTickersEntries: [],
    positionsTotalPlUsd: null,
    walletsTotalBalanceUsd: null,
  }

  constructor(props) {
    super(props)
    const { currentTime } = props

    this.state = {
      timestamp: currentTime ? new Date(currentTime) : null,
    }
  }

  componentDidMount() {
    const { dataReceived, pageLoading, fetchData } = this.props
    if (!dataReceived && !pageLoading) {
      fetchData()
    }
  }

  handleDateChange = (time) => {
    const end = time && time.getTime()
    if (isValidTimeStamp(end) || time === null) {
      this.setState({ timestamp: time })
    }
  }

  handleQuery = () => {
    const { fetchData } = this.props
    const { timestamp } = this.state
    const time = timestamp ? timestamp.getTime() : null
    fetchData(time)
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
      refresh,
      currentTime,
      pageLoading,
      dataReceived,
      walletsEntries,
      positionsEntries,
      positionsTotalPlUsd,
      walletsTickersEntries,
      walletsTotalBalanceUsd,
      positionsTickersEntries,
    } = this.props
    const { timestamp } = this.state

    const section = this.getCurrentSection()
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp

    const isEmpty = (section === MENU_POSITIONS && !positionsEntries.length)
      || (section === MENU_TICKERS && !positionsTickersEntries.length && !walletsTickersEntries.length)
      || (section === MENU_WALLETS && !walletsEntries.length)

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (isEmpty) {
      showContent = <NoData />
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
      <Card
        elevation={Elevation.ZERO}
        className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader>
          <SectionHeaderTitle>
            {t('snapshots.title')}
          </SectionHeaderTitle>
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('query.endTime')}
              </SectionHeaderItemLabel>
              <DateInput
                defaultValue={timestamp}
                onChange={this.handleDateChange}
              />
            </SectionHeaderItem>

            <QueryButton
              disabled={!hasNewTime}
              onClick={this.handleQuery}
            />
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>

        <NavSwitcher
          items={[
            { value: MENU_POSITIONS, label: t('positions.title') },
            { value: MENU_TICKERS, label: t('tickers.title') },
            { value: MENU_WALLETS, label: t('wallets.title') },
          ]}
          onChange={this.switchSection}
          value={section}
        />

        {showContent}
      </Card>
    )
  }
}

export default withTranslation('translations')(Snapshots)
