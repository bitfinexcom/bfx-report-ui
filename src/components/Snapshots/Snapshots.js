import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button, ButtonGroup,
  Card,
  Elevation,
  Intent,
} from '@blueprintjs/core'

import {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import DateInput from 'ui/DateInput'
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

  handleQuery = (e) => {
    e.preventDefault()
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
      currentTime,
      dataReceived,
      pageLoading,
      positionsTotalPlUsd,
      positionsEntries,
      positionsTickersEntries,
      walletsTotalBalanceUsd,
      walletsTickersEntries,
      walletsEntries,
      refresh,
      t,
    } = this.props
    const { timestamp } = this.state

    const section = this.getCurrentSection()
    const hasNewTime = timestamp ? currentTime !== timestamp.getTime() : !!currentTime !== !!timestamp

    const isEmpty = (section === MENU_POSITIONS && !positionsEntries.length)
      || (section === MENU_TICKERS && !positionsTickersEntries.length && !walletsTickersEntries)
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
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('snapshots.title')}</SectionHeaderTitle>
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('query.endTime')}
              </SectionHeaderItemLabel>
              <DateInput
                onChange={this.handleDateChange}
                defaultValue={timestamp}
              />
            </SectionHeaderItem>

            <Button
              className='button--large'
              onClick={this.handleQuery}
              intent={Intent.PRIMARY}
              disabled={!hasNewTime}
            >
              {t('query.title')}
            </Button>
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>

        <ButtonGroup>
          <Button
            intent={section === MENU_POSITIONS ? Intent.PRIMARY : undefined}
            onClick={() => this.switchSection(MENU_POSITIONS)}
          >
            {t('positions.title')}
          </Button>
          <Button
            intent={section === MENU_TICKERS ? Intent.PRIMARY : undefined}
            onClick={() => this.switchSection(MENU_TICKERS)}
          >
            {t('tickers.title')}
          </Button>
          <Button
            intent={section === MENU_WALLETS ? Intent.PRIMARY : undefined}
            onClick={() => this.switchSection(MENU_WALLETS)}
          >
            {t('wallets.title')}
          </Button>
        </ButtonGroup>

        {showContent}
      </Card>
    )
  }
}

Snapshots.propTypes = propTypes
Snapshots.defaultProps = defaultProps

export default withTranslation('translations')(Snapshots)
