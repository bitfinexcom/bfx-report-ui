import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'

import {
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'

import Timeframe from 'components/Timeframe'
import queryType from 'state/query/constants'
import baseType from 'state/base/constants'
import { getIcon, getPath } from 'state/query/utils'
import { getNoAuthTokenUrlString } from 'state/utils'

const {
  MENU_DEPOSITS,
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TICKERS,
  MENU_TRADES,
  MENU_POSITIONS,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_TRADES,
  MENU_WITHDRAWALS,
  MENU_WALLETS,
} = queryType

class ToggleMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClickFCredit = this.handleClick.bind(this, MENU_FCREDIT)
    this.handleClickFLoan = this.handleClick.bind(this, MENU_FLOAN)
    this.handleClickFOffer = this.handleClick.bind(this, MENU_FOFFER)
    this.handleClickLedgers = this.handleClick.bind(this, MENU_LEDGERS)
    this.handleClickOrders = this.handleClick.bind(this, MENU_ORDERS)
    this.handleClickTrades = this.handleClick.bind(this, MENU_TRADES)
    this.handleClickDeposits = this.handleClick.bind(this, MENU_DEPOSITS)
    this.handleClickWithdrawals = this.handleClick.bind(this, MENU_WITHDRAWALS)
    this.handleClickPublicTrades = this.handleClick.bind(this, MENU_PUBLIC_TRADES)
    this.handleClickPositions = this.handleClick.bind(this, MENU_POSITIONS)
    this.handleClickPositionsAudit = this.handleClick.bind(this, MENU_POSITIONS_AUDIT)
    this.handleClickTickers = this.handleClick.bind(this, MENU_TICKERS)
    this.handleClickWallets = this.handleClick.bind(this, MENU_WALLETS)
  }

  handleClick(target) {
    const { history } = this.props
    history.push(`${getPath(target)}${getNoAuthTokenUrlString(history.location.search)}`)
  }

  render() {
    const {
      handleClickCustom,
      menuMode,
      target,
      t,
    } = this.props

    const renderNormalMenu = (
      <Fragment>
        <Timeframe
          handleClickCustom={handleClickCustom}
          menuMode={menuMode}
        />
        <MenuDivider />
        <MenuItem
          icon={getIcon(MENU_LEDGERS)}
          text={t('ledgers.title')}
          onClick={this.handleClickLedgers}
          active={target === MENU_LEDGERS}
        />
        <MenuItem
          icon={getIcon(MENU_TRADES)}
          text={t('trades.title')}
          onClick={this.handleClickTrades}
          active={target === MENU_TRADES}
        />
        <MenuItem
          icon={getIcon(MENU_ORDERS)}
          text={t('orders.title')}
          onClick={this.handleClickOrders}
          active={target === MENU_ORDERS}
        />
        <MenuItem
          icon={getIcon(MENU_DEPOSITS)}
          text={t('deposits.title')}
          onClick={this.handleClickDeposits}
          active={target === MENU_DEPOSITS}
        />
        <MenuItem
          icon={getIcon(MENU_WITHDRAWALS)}
          text={t('withdrawals.title')}
          onClick={this.handleClickWithdrawals}
          active={target === MENU_WITHDRAWALS}
        />
        <MenuItem
          icon={getIcon(MENU_POSITIONS)}
          text={t('positions.title')}
          onClick={this.handleClickPositions}
          active={target === MENU_POSITIONS}
        />
        <MenuItem
          icon={getIcon(MENU_POSITIONS_AUDIT)}
          text={t('paudit.title')}
          onClick={this.handleClickPositionsAudit}
          active={target === MENU_POSITIONS_AUDIT}
        />
        <MenuItem
          icon={getIcon(MENU_WALLETS)}
          text={t('wallets.title')}
          onClick={this.handleClickWallets}
          active={target === MENU_WALLETS}
        />
        <MenuDivider />
        <MenuItem
          icon={getIcon(MENU_FOFFER)}
          text={t('foffer.title')}
          onClick={this.handleClickFOffer}
          active={target === MENU_FOFFER}
        />
        <MenuItem
          icon={getIcon(MENU_FLOAN)}
          text={t('floan.title')}
          onClick={this.handleClickFLoan}
          active={target === MENU_FLOAN}
        />
        <MenuItem
          icon={getIcon(MENU_FCREDIT)}
          text={t('fcredit.title')}
          onClick={this.handleClickFCredit}
          active={target === MENU_FCREDIT}
        />
        <MenuDivider />
        <MenuItem
          icon={getIcon(MENU_PUBLIC_TRADES)}
          text={t('publictrades.title')}
          onClick={this.handleClickPublicTrades}
          active={target === MENU_PUBLIC_TRADES}
        />
        <MenuItem
          icon={getIcon(MENU_TICKERS)}
          text={t('tickers.title')}
          onClick={this.handleClickTickers}
          active={target === MENU_TICKERS}
        />
      </Fragment>
    )

    let content

    if (menuMode === baseType.MENU_MODE_HOVER) {
      content = (
        <Menu large>
          {renderNormalMenu}
        </Menu>
      )
    } else if (menuMode === baseType.MENU_MODE_ICON) {
      content = (
        <Menu large className='bitfinex-compact-menu hidden-xs hidden-sm hidden-md'>
          <Timeframe
            handleClickCustom={handleClickCustom}
            menuMode={menuMode}
          />
          <MenuDivider />
          <MenuItem
            icon={getIcon(MENU_LEDGERS)}
            text=''
            title={t('ledgers.title')}
            onClick={this.handleClickLedgers}
            active={target === MENU_LEDGERS}
          />
          <MenuItem
            icon={getIcon(MENU_TRADES)}
            text=''
            title={t('trades.title')}
            onClick={this.handleClickTrades}
            active={target === MENU_TRADES}
          />
          <MenuItem
            icon={getIcon(MENU_ORDERS)}
            text=''
            title={t('orders.title')}
            onClick={this.handleClickOrders}
            active={target === MENU_ORDERS}
          />
          <MenuItem
            icon={getIcon(MENU_DEPOSITS)}
            text=''
            title={t('deposits.title')}
            onClick={this.handleClickDeposits}
            active={target === MENU_DEPOSITS}
          />
          <MenuItem
            icon={getIcon(MENU_WITHDRAWALS)}
            text=''
            title={t('withdrawals.title')}
            onClick={this.handleClickWithdrawals}
            active={target === MENU_WITHDRAWALS}
          />
          <MenuItem
            icon={getIcon(MENU_POSITIONS)}
            text=''
            title={t('positions.title')}
            onClick={this.handleClickPositions}
            active={target === MENU_POSITIONS}
          />
          <MenuItem
            icon={getIcon(MENU_POSITIONS_AUDIT)}
            text=''
            title={t('paudit.title')}
            onClick={this.handleClickPositionsAudit}
            active={target === MENU_POSITIONS_AUDIT}
          />
          <MenuItem
            icon={getIcon(MENU_WALLETS)}
            text=''
            title={t('wallets.title')}
            onClick={this.handleClickWallets}
            active={target === MENU_WALLETS}
          />
          <MenuDivider />
          <MenuItem
            icon={getIcon(MENU_FOFFER)}
            text=''
            title={t('foffer.title')}
            onClick={this.handleClickFOffer}
            active={target === MENU_FOFFER}
          />
          <MenuItem
            icon={getIcon(MENU_FLOAN)}
            text=''
            title={t('floan.title')}
            onClick={this.handleClickFLoan}
            active={target === MENU_FLOAN}
          />
          <MenuItem
            icon={getIcon(MENU_FCREDIT)}
            text=''
            title={t('fcredit.title')}
            onClick={this.handleClickFCredit}
            active={target === MENU_FCREDIT}
          />
          <MenuDivider />
          <MenuItem
            icon={getIcon(MENU_PUBLIC_TRADES)}
            text=''
            title={t('publictrades.title')}
            onClick={this.handleClickPublicTrades}
            active={target === MENU_PUBLIC_TRADES}
          />
          <MenuItem
            icon={getIcon(MENU_TICKERS)}
            text=''
            title={t('tickers.title')}
            onClick={this.handleClickTickers}
            active={target === MENU_TICKERS}
          />
        </Menu>
      )
    } else {
      content = (
        <Menu large className='hidden-xs hidden-sm hidden-md col-lg-1 col-xl-2'>
          {renderNormalMenu}
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

export default withNamespaces('translations')(ToggleMenu)
