import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, ButtonGroup } from '@blueprintjs/core'

import PositionsSnapshot from 'components/Snapshots/PositionsSnapshot'
import TickersSnapshot from 'components/Snapshots/TickersSnapshot'
import WalletsSnapshot from 'components/Snapshots/WalletsSnapshot'
import NoData from 'ui/NoData'
import Loading from 'ui/Loading'
import queryConstants from 'state/query/constants'

import { propTypes, defaultProps } from './Snapshots.props'

const {
  MENU_POSITIONS,
  MENU_TICKERS,
  MENU_WALLETS,
} = queryConstants

class Snapshot extends PureComponent {
  componentDidMount() {
    const { loading, match, fetchSnapshot } = this.props

    if (loading) {
      fetchSnapshot(match.params.section)
    }
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

    history.push(`${path}${history.location.search}`)
  }

  render() {
    const {
      data,
      loading,
      match,
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

    if (loading) {
      return <Loading />
    }

    const { subsection } = match.params

    const isNotEmpty = !!(positionsEntries.length || positionsTickersEntries.length
      || walletsTickersEntries.length || walletsEntries.length)

    if (!isNotEmpty) {
      return <NoData />
    }

    const renderButtonGroup = (
      <ButtonGroup>
        <Button
          active={subsection === MENU_POSITIONS}
          onClick={() => this.switchSection(MENU_POSITIONS)}
        >
          {t('positions.title')}
        </Button>
        <Button
          active={subsection === MENU_TICKERS}
          onClick={() => this.switchSection(MENU_TICKERS)}
        >
          {t('tickers.title')}
        </Button>
        <Button
          active={subsection === MENU_WALLETS}
          onClick={() => this.switchSection(MENU_WALLETS)}
        >
          {t('wallets.title')}
        </Button>
      </ButtonGroup>
    )

    const isEmpty = (subsection === MENU_POSITIONS && !positionsEntries.length)
      || (subsection === MENU_TICKERS && !positionsTickersEntries.length && !walletsTickersEntries)
      || (subsection === MENU_WALLETS && !walletsEntries.length)

    let showContent
    if (isEmpty) {
      showContent = (
        <Fragment>
          <br />
          <NoData descId='snapshots.nodata' />
        </Fragment>
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
      <div>
        {renderButtonGroup}
        <br />
        {showContent}
      </div>
    )
  }
}

Snapshot.propTypes = propTypes
Snapshot.defaultProps = defaultProps

export default withTranslation('translations')(Snapshot)
