import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
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
      intl,
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
          text={intl.formatMessage({ id: 'orders.title' })}
          onClick={this.handleClickOrders}
          active={target === MENU_ORDERS}
        />
        <MenuItem
          icon={getIcon(MENU_DEPOSITS)}
          text={intl.formatMessage({ id: 'deposits.title' })}
          onClick={this.handleClickDeposits}
          active={target === MENU_DEPOSITS}
        />
        <MenuItem
          icon={getIcon(MENU_WITHDRAWALS)}
          text={intl.formatMessage({ id: 'withdrawals.title' })}
          onClick={this.handleClickWithdrawals}
          active={target === MENU_WITHDRAWALS}
        />
        <MenuItem
          icon={getIcon(MENU_POSITIONS)}
          text={intl.formatMessage({ id: 'positions.title' })}
          onClick={this.handleClickPositions}
          active={target === MENU_POSITIONS}
        />
        <MenuItem
          icon={getIcon(MENU_POSITIONS_AUDIT)}
          text={intl.formatMessage({ id: 'paudit.title' })}
          onClick={this.handleClickPositionsAudit}
          active={target === MENU_POSITIONS_AUDIT}
        />
        <MenuItem
          icon={getIcon(MENU_WALLETS)}
          text={intl.formatMessage({ id: 'wallets.title' })}
          onClick={this.handleClickWallets}
          active={target === MENU_WALLETS}
        />
        <MenuDivider />
        <MenuItem
          icon={getIcon(MENU_FOFFER)}
          text={intl.formatMessage({ id: 'foffer.title' })}
          onClick={this.handleClickFOffer}
          active={target === MENU_FOFFER}
        />
        <MenuItem
          icon={getIcon(MENU_FLOAN)}
          text={intl.formatMessage({ id: 'floan.title' })}
          onClick={this.handleClickFLoan}
          active={target === MENU_FLOAN}
        />
        <MenuItem
          icon={getIcon(MENU_FCREDIT)}
          text={intl.formatMessage({ id: 'fcredit.title' })}
          onClick={this.handleClickFCredit}
          active={target === MENU_FCREDIT}
        />
        <MenuDivider />
        <MenuItem
          icon={getIcon(MENU_PUBLIC_TRADES)}
          text={intl.formatMessage({ id: 'publictrades.title' })}
          onClick={this.handleClickPublicTrades}
          active={target === MENU_PUBLIC_TRADES}
        />
        <MenuItem
          icon={getIcon(MENU_TICKERS)}
          text={intl.formatMessage({ id: 'tickers.title' })}
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
            title={intl.formatMessage({ id: 'ledgers.title' })}
            onClick={this.handleClickLedgers}
            active={target === MENU_LEDGERS}
          />
          <MenuItem
            icon={getIcon(MENU_TRADES)}
            text=''
            title={intl.formatMessage({ id: 'trades.title' })}
            onClick={this.handleClickTrades}
            active={target === MENU_TRADES}
          />
          <MenuItem
            icon={getIcon(MENU_ORDERS)}
            text=''
            title={intl.formatMessage({ id: 'orders.title' })}
            onClick={this.handleClickOrders}
            active={target === MENU_ORDERS}
          />
          <MenuItem
            icon={getIcon(MENU_DEPOSITS)}
            text=''
            title={intl.formatMessage({ id: 'deposits.title' })}
            onClick={this.handleClickDeposits}
            active={target === MENU_DEPOSITS}
          />
          <MenuItem
            icon={getIcon(MENU_WITHDRAWALS)}
            text=''
            title={intl.formatMessage({ id: 'withdrawals.title' })}
            onClick={this.handleClickWithdrawals}
            active={target === MENU_WITHDRAWALS}
          />
          <MenuItem
            icon={getIcon(MENU_POSITIONS)}
            text=''
            title={intl.formatMessage({ id: 'positions.title' })}
            onClick={this.handleClickPositions}
            active={target === MENU_POSITIONS}
          />
          <MenuItem
            icon={getIcon(MENU_POSITIONS_AUDIT)}
            text=''
            title={intl.formatMessage({ id: 'paudit.title' })}
            onClick={this.handleClickPositionsAudit}
            active={target === MENU_POSITIONS_AUDIT}
          />
          <MenuItem
            icon={getIcon(MENU_WALLETS)}
            text=''
            title={intl.formatMessage({ id: 'wallets.title' })}
            onClick={this.handleClickWallets}
            active={target === MENU_WALLETS}
          />
          <MenuDivider />
          <MenuItem
            icon={getIcon(MENU_FOFFER)}
            text=''
            title={intl.formatMessage({ id: 'foffer.title' })}
            onClick={this.handleClickFOffer}
            active={target === MENU_FOFFER}
          />
          <MenuItem
            icon={getIcon(MENU_FLOAN)}
            text=''
            title={intl.formatMessage({ id: 'floan.title' })}
            onClick={this.handleClickFLoan}
            active={target === MENU_FLOAN}
          />
          <MenuItem
            icon={getIcon(MENU_FCREDIT)}
            text=''
            title={intl.formatMessage({ id: 'fcredit.title' })}
            onClick={this.handleClickFCredit}
            active={target === MENU_FCREDIT}
          />
          <MenuDivider />
          <MenuItem
            icon={getIcon(MENU_PUBLIC_TRADES)}
            text=''
            title={intl.formatMessage({ id: 'publictrades.title' })}
            onClick={this.handleClickPublicTrades}
            active={target === MENU_PUBLIC_TRADES}
          />
          <MenuItem
            icon={getIcon(MENU_TICKERS)}
            text=''
            title={intl.formatMessage({ id: 'tickers.title' })}
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
  intl: intlShape.isRequired,
  menuMode: PropTypes.string,
  t: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
}

ToggleMenu.defaultProps = {
  menuMode: '',
}

export default injectIntl(withNamespaces('translations')(ToggleMenu))
