import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import {
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'
import _castArray from 'lodash/castArray'

import Timeframe from 'components/Timeframe'
import queryType from 'state/query/constants'
import baseType from 'state/base/constants'
import { getIcon, getPath } from 'state/query/utils'
import { getNoAuthUrlString } from 'state/utils'
import { platform } from 'var/config'

const {
  MENU_ACCOUNT_BALANCE,
  MENU_CONCENTRATION_RISK,
  MENU_DEPOSITS,
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TICKERS,
  MENU_TRADES,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_WIN_LOSS,
  MENU_WITHDRAWALS,
  MENU_WALLETS,
} = queryType

class ToggleMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClickFCredit = this.handleClick.bind(this, MENU_FCREDIT)
    this.handleClickFLoan = this.handleClick.bind(this, MENU_FLOAN)
    this.handleClickFOffer = this.handleClick.bind(this, MENU_FOFFER)
    this.handleClickFPayment = this.handleClick.bind(this, MENU_FPAYMENT)
    this.handleClickLedgers = this.handleClick.bind(this, MENU_LEDGERS)
    this.handleClickOrders = this.handleClick.bind(this, MENU_ORDERS)
    this.handleClickTrades = this.handleClick.bind(this, MENU_TRADES)
    this.handleClickDeposits = this.handleClick.bind(this, MENU_DEPOSITS)
    this.handleClickWithdrawals = this.handleClick.bind(this, MENU_WITHDRAWALS)
    this.handleClickPublicFunding = this.handleClick.bind(this, MENU_PUBLIC_FUNDING)
    this.handleClickPublicTrades = this.handleClick.bind(this, MENU_PUBLIC_TRADES)
    this.handleClickPositions = this.handleClick.bind(this, MENU_POSITIONS)
    this.handleClickTickers = this.handleClick.bind(this, MENU_TICKERS)
    this.handleClickWallets = this.handleClick.bind(this, MENU_WALLETS)
    this.handleClickAccountBalance = this.handleClick.bind(this, MENU_ACCOUNT_BALANCE)
    this.handleClickWinLoss = this.handleClick.bind(this, MENU_WIN_LOSS)
    this.handleClickConcentrationRisk = this.handleClick.bind(this, MENU_CONCENTRATION_RISK)
    this.handleClickSnapshots = this.handleClick.bind(this, MENU_SNAPSHOTS)
  }

  handleClick(target) {
    const { history } = this.props
    const path = _castArray(getPath(target))[0]
    history.push(`${path}${getNoAuthUrlString(history.location.search)}`)
  }

  render() {
    const {
      handleClickCustom,
      menuMode,
      target,
      t,
    } = this.props
    const isIconMode = menuMode === baseType.MENU_MODE_ICON
    const walletsTitle = platform.showFrameworkMode ? 'wallets.title' : 'wallets.title_beta'

    const renderMenu = (
      <Fragment>
        <Timeframe
          handleClickCustom={handleClickCustom}
          menuMode={menuMode}
        />
        <MenuDivider />
        <MenuItem
          icon={getIcon(MENU_LEDGERS)}
          text={isIconMode ? '' : t('ledgers.title')}
          title={isIconMode ? t('ledgers.title') : ''}
          onClick={this.handleClickLedgers}
          active={target === MENU_LEDGERS}
        />
        <MenuItem
          icon={getIcon(MENU_TRADES)}
          text={isIconMode ? '' : t('trades.title')}
          title={isIconMode ? t('trades.title') : ''}
          onClick={this.handleClickTrades}
          active={target === MENU_TRADES}
        />
        <MenuItem
          icon={getIcon(MENU_ORDERS)}
          text={isIconMode ? '' : t('orders.title')}
          title={isIconMode ? t('orders.title') : ''}
          onClick={this.handleClickOrders}
          active={target === MENU_ORDERS}
        />
        <MenuItem
          icon={getIcon(MENU_DEPOSITS)}
          text={isIconMode ? '' : t('deposits.title')}
          title={isIconMode ? t('deposits.title') : ''}
          onClick={this.handleClickDeposits}
          active={target === MENU_DEPOSITS}
        />
        <MenuItem
          icon={getIcon(MENU_WITHDRAWALS)}
          text={isIconMode ? '' : t('withdrawals.title')}
          title={isIconMode ? t('withdrawals.title') : ''}
          onClick={this.handleClickWithdrawals}
          active={target === MENU_WITHDRAWALS}
        />
        <MenuItem
          icon={getIcon(MENU_POSITIONS)}
          text={isIconMode ? '' : t('positions.title')}
          title={isIconMode ? t('positions.title') : ''}
          onClick={this.handleClickPositions}
          active={target === MENU_POSITIONS
            || target === MENU_POSITIONS_AUDIT
            || target === MENU_POSITIONS_ACTIVE}
        />
        <MenuItem
          icon={getIcon(MENU_WALLETS)}
          text={isIconMode ? '' : t(walletsTitle)}
          title={isIconMode ? t(walletsTitle) : ''}
          onClick={this.handleClickWallets}
          active={target === MENU_WALLETS}
        />
        <MenuDivider />
        <MenuItem
          icon={getIcon(MENU_FOFFER)}
          text={isIconMode ? '' : t('foffer.title')}
          title={isIconMode ? t('foffer.title') : ''}
          onClick={this.handleClickFOffer}
          active={target === MENU_FOFFER}
        />
        <MenuItem
          icon={getIcon(MENU_FLOAN)}
          text={isIconMode ? '' : t('floan.title')}
          title={isIconMode ? t('floan.title') : ''}
          onClick={this.handleClickFLoan}
          active={target === MENU_FLOAN}
        />
        <MenuItem
          icon={getIcon(MENU_FCREDIT)}
          text={isIconMode ? '' : t('fcredit.title')}
          title={isIconMode ? t('fcredit.title') : ''}
          onClick={this.handleClickFCredit}
          active={target === MENU_FCREDIT}
        />
        {platform.showFrameworkMode ? (
          <MenuItem
            icon={getIcon(MENU_FPAYMENT)}
            text={isIconMode ? '' : t('fpayment.title')}
            title={isIconMode ? t('fpayment.title') : ''}
            onClick={this.handleClickFPayment}
            active={target === MENU_FPAYMENT}
          />
        ) : undefined}
        <MenuDivider />
        <MenuItem
          icon={getIcon(MENU_PUBLIC_TRADES)}
          text={isIconMode ? '' : t('publictrades.title')}
          title={isIconMode ? t('publictrades.title') : ''}
          onClick={this.handleClickPublicTrades}
          active={target === MENU_PUBLIC_TRADES}
        />
        <MenuItem
          icon={getIcon(MENU_PUBLIC_FUNDING)}
          text={isIconMode ? '' : t('publicfunding.title')}
          title={isIconMode ? t('publicfunding.title') : ''}
          onClick={this.handleClickPublicFunding}
          active={target === MENU_PUBLIC_FUNDING}
        />
        <MenuItem
          icon={getIcon(MENU_TICKERS)}
          text={isIconMode ? '' : t('tickers.title')}
          title={isIconMode ? t('tickers.title') : ''}
          onClick={this.handleClickTickers}
          active={target === MENU_TICKERS}
        />
        {platform.showFrameworkMode ? (
          <Fragment>
            <MenuDivider />
            <MenuItem
              icon={getIcon(MENU_ACCOUNT_BALANCE)}
              text={isIconMode ? '' : t('accountbalance.title')}
              title={isIconMode ? t('accountbalance.title') : ''}
              onClick={this.handleClickAccountBalance}
              active={target === MENU_ACCOUNT_BALANCE}
            />
            <MenuItem
              icon={getIcon(MENU_WIN_LOSS)}
              text={isIconMode ? '' : t('averagewinloss.title')}
              title={isIconMode ? t('averagewinloss.title') : ''}
              onClick={this.handleClickWinLoss}
              active={target === MENU_WIN_LOSS}
            />
            <MenuItem
              icon={getIcon(MENU_CONCENTRATION_RISK)}
              text={isIconMode ? '' : t('concentrationrisk.title')}
              title={isIconMode ? t('concentrationrisk.title') : ''}
              onClick={this.handleClickConcentrationRisk}
              active={target === MENU_CONCENTRATION_RISK}
            />
            <MenuItem
              icon={getIcon(MENU_SNAPSHOTS)}
              text={isIconMode ? '' : t('snapshots.title')}
              title={isIconMode ? t('snapshots.title') : ''}
              onClick={this.handleClickSnapshots}
              active={target === MENU_SNAPSHOTS}
            />
          </Fragment>
        ) : undefined}
      </Fragment>
    )

    let content

    if (menuMode === baseType.MENU_MODE_HOVER) {
      content = (
        <Menu large>
          {renderMenu}
        </Menu>
      )
    } else if (menuMode === baseType.MENU_MODE_ICON) {
      content = (
        <Menu large className='bitfinex-compact-menu hidden-xs hidden-sm hidden-md'>
          {renderMenu}
        </Menu>
      )
    } else {
      content = (
        <Menu large className='hidden-xs hidden-sm hidden-md col-lg-1 col-xl-2'>
          {renderMenu}
        </Menu>
      )
    }

    return content
  }
}

ToggleMenu.propTypes = {
  handleClickCustom: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  menuMode: PropTypes.string,
  t: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
}

ToggleMenu.defaultProps = {
  menuMode: '',
}

export default withTranslation('translations')(ToggleMenu)
