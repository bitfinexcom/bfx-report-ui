import React, { PureComponent } from 'react'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'

import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import WalletsSnapshot from 'components/Snapshots/WalletsSnapshot'
import TickersSnapshot from 'components/Snapshots/TickersSnapshot'
import PositionsSnapshot from 'components/Snapshots/PositionsSnapshot'
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
      t,
      data,
      match,
      refresh,
      pageLoading,
      dataReceived,
    } = this.props
    const {
      walletsEntries,
      positionsEntries,
      positionsTotalPlUsd,
      walletsTickersEntries,
      walletsTotalBalanceUsd,
      positionsTickersEntries,
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
          entries={walletsEntries}
          totalBalanceUsd={walletsTotalBalanceUsd}
        />
      )
    } else if (subsection === MENU_POSITIONS) {
      showContent = (
        <PositionsSnapshot
          entries={positionsEntries}
          totalPlUsd={positionsTotalPlUsd}
        />
      )
    } else {
      showContent = (
        <TickersSnapshot
          walletsTickersEntries={walletsTickersEntries}
          positionsTickersEntries={positionsTickersEntries}
        />
      )
    }

    return (
      <div className='snapshot'>
        <ButtonGroup>
          <Button
            onClick={() => this.switchSection(MENU_POSITIONS)}
            intent={subsection === MENU_POSITIONS ? Intent.PRIMARY : undefined}
          >
            {t('positions.title')}
          </Button>
          <Button
            onClick={() => this.switchSection(MENU_TICKERS)}
            intent={subsection === MENU_TICKERS ? Intent.PRIMARY : undefined}
          >
            {t('tickers.title')}
          </Button>
          <Button
            onClick={() => this.switchSection(MENU_WALLETS)}
            intent={subsection === MENU_WALLETS ? Intent.PRIMARY : undefined}
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
