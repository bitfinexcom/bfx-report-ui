import React, { PureComponent } from 'react'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'

import PositionsSnapshot from 'components/Snapshots/PositionsSnapshot'
import TickersSnapshot from 'components/Snapshots/TickersSnapshot'
import WalletsSnapshot from 'components/Snapshots/WalletsSnapshot'
import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import queryConstants from 'state/query/constants'
import { checkFetch, checkInit } from 'state/utils'

import { propTypes, defaultProps } from './Snapshots.props'

const {
  MENU_TAX_REPORT,
  MENU_POSITIONS,
  MENU_TICKERS,
  MENU_WALLETS,
} = queryConstants

class Snapshot extends PureComponent {
  componentDidMount() {
    checkInit(this.props, MENU_TAX_REPORT)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, MENU_TAX_REPORT)
  }

  getSectionURL = (subsection) => {
    const { match } = this.props
    const { section } = match.params

    switch (subsection) {
      case MENU_POSITIONS:
        return `/tax_report/${section}/positions`
      case MENU_TICKERS:
        return `/tax_report/${section}/tickers`
      case MENU_WALLETS:
        return `/tax_report/${section}/wallets`
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
      data,
      dataReceived,
      pageLoading,
      match,
      refresh,
      t,
    } = this.props
    const {
      positionsTotalPlUsd,
      positionsEntries,
      positionsTickersEntries,
      walletsTotalBalanceUsd,
      walletsTickersEntries,
      walletsEntries,
    } = data

    if (!dataReceived && pageLoading) {
      return <Loading />
    }

    const { subsection } = match.params

    const isNotEmpty = !!(positionsEntries.length || positionsTickersEntries.length
      || walletsTickersEntries.length || walletsEntries.length)

    if (!isNotEmpty) {
      return <NoData refresh={refresh} />
    }

    const isEmpty = (subsection === MENU_POSITIONS && !positionsEntries.length)
      || (subsection === MENU_TICKERS && !positionsTickersEntries.length && !walletsTickersEntries)
      || (subsection === MENU_WALLETS && !walletsEntries.length)

    let showContent
    if (isEmpty) {
      showContent = (
        <>
          <br />
          <NoData refresh={refresh} />
        </>
      )
    } else if (subsection === MENU_WALLETS) {
      showContent = (
        <WalletsSnapshot
          totalBalanceUsd={walletsTotalBalanceUsd}
          entries={walletsEntries}
        />
      )
    } else if (subsection === MENU_POSITIONS) {
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
      <div className='snapshot'>
        <ButtonGroup>
          <Button
            intent={subsection === MENU_POSITIONS ? Intent.PRIMARY : undefined}
            onClick={() => this.switchSection(MENU_POSITIONS)}
          >
            {t('positions.title')}
          </Button>
          <Button
            intent={subsection === MENU_TICKERS ? Intent.PRIMARY : undefined}
            onClick={() => this.switchSection(MENU_TICKERS)}
          >
            {t('tickers.title')}
          </Button>
          <Button
            intent={subsection === MENU_WALLETS ? Intent.PRIMARY : undefined}
            onClick={() => this.switchSection(MENU_WALLETS)}
          >
            {t('wallets.title')}
          </Button>
        </ButtonGroup>
        {showContent}
      </div>
    )
  }
}

Snapshot.propTypes = propTypes
Snapshot.defaultProps = defaultProps

export default Snapshot
