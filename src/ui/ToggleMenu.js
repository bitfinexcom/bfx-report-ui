import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import {
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'

import Timeframe from 'components/Timeframe'
import queryType from 'state/query/constants'
import baseType from 'state/base/constants'
import { MAPPING } from 'state/query/utils'

const {
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
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
  }

  handleClick(target) {
    const { history } = this.props
    history.push(MAPPING[target].path)
  }

  render() {
    const {
      handleClickCustom,
      intl,
      menuMode,
      target,
    } = this.props

    const renderNormalMenu = (
      <Fragment>
        <Timeframe
          handleClickCustom={handleClickCustom}
          menuMode={menuMode}
        />
        <MenuDivider />
        <MenuItem
          icon={MAPPING[MENU_LEDGERS].icon}
          text={intl.formatMessage({ id: 'ledgers.title' })}
          onClick={this.handleClickLedgers}
          active={target === MENU_LEDGERS}
        />
        <MenuItem
          icon={MAPPING[MENU_TRADES].icon}
          text={intl.formatMessage({ id: 'trades.title' })}
          onClick={this.handleClickTrades}
          active={target === MENU_TRADES}
        />
        <MenuItem
          icon={MAPPING[MENU_ORDERS].icon}
          text={intl.formatMessage({ id: 'orders.title' })}
          onClick={this.handleClickOrders}
          active={target === MENU_ORDERS}
        />
        <MenuItem
          icon={MAPPING[MENU_DEPOSITS].icon}
          text={intl.formatMessage({ id: 'deposits.title' })}
          onClick={this.handleClickDeposits}
          active={target === MENU_DEPOSITS}
        />
        <MenuItem
          icon={MAPPING[MENU_WITHDRAWALS].icon}
          text={intl.formatMessage({ id: 'withdrawals.title' })}
          onClick={this.handleClickWithdrawals}
          active={target === MENU_WITHDRAWALS}
        />
        <MenuDivider />
        <MenuItem
          icon={MAPPING[MENU_FOFFER].icon}
          text={intl.formatMessage({ id: 'foffer.title' })}
          onClick={this.handleClickFOffer}
          active={target === MENU_FOFFER}
        />
        <MenuItem
          icon={MAPPING[MENU_FLOAN].icon}
          text={intl.formatMessage({ id: 'floan.title' })}
          onClick={this.handleClickFLoan}
          active={target === MENU_FLOAN}
        />
        <MenuItem
          icon={MAPPING[MENU_FCREDIT].icon}
          text={intl.formatMessage({ id: 'fcredit.title' })}
          onClick={this.handleClickFCredit}
          active={target === MENU_FCREDIT}
        />
      </Fragment>
    )

    if (menuMode === baseType.MENU_MODE_HOVER) {
      return (
        <Menu large>
          {renderNormalMenu}
        </Menu>
      )
    } if (menuMode === baseType.MENU_MODE_ICON) {
      return (
        <Menu large className='bitfinex-compact-menu hidden-xs hidden-sm hidden-md'>
          <Timeframe
            handleClickCustom={handleClickCustom}
            menuMode={menuMode}
          />
          <MenuDivider />
          <MenuItem
            icon={MAPPING[MENU_LEDGERS].icon}
            text=''
            title={intl.formatMessage({ id: 'ledgers.title' })}
            onClick={this.handleClickLedgers}
            active={target === MENU_LEDGERS}
          />
          <MenuItem
            icon={MAPPING[MENU_TRADES].icon}
            text=''
            title={intl.formatMessage({ id: 'trades.title' })}
            onClick={this.handleClickTrades}
            active={target === MENU_TRADES}
          />
          <MenuItem
            icon={MAPPING[MENU_ORDERS].icon}
            text=''
            title={intl.formatMessage({ id: 'orders.title' })}
            onClick={this.handleClickOrders}
            active={target === MENU_ORDERS}
          />
          <MenuItem
            icon={MAPPING[MENU_DEPOSITS].icon}
            text=''
            title={intl.formatMessage({ id: 'deposits.title' })}
            onClick={this.handleClickDeposits}
            active={target === MENU_DEPOSITS}
          />
          <MenuItem
            icon={MAPPING[MENU_WITHDRAWALS].icon}
            text=''
            title={intl.formatMessage({ id: 'withdrawals.title' })}
            onClick={this.handleClickWithdrawals}
            active={target === MENU_WITHDRAWALS}
          />
          <MenuDivider />
          <MenuItem
            icon={MAPPING[MENU_FOFFER].icon}
            text=''
            title={intl.formatMessage({ id: 'foffer.title' })}
            onClick={this.handleClickFOffer}
            active={target === MENU_FOFFER}
          />
          <MenuItem
            icon={MAPPING[MENU_FLOAN].icon}
            text=''
            title={intl.formatMessage({ id: 'floan.title' })}
            onClick={this.handleClickFLoan}
            active={target === MENU_FLOAN}
          />
          <MenuItem
            icon={MAPPING[MENU_FCREDIT].icon}
            text=''
            title={intl.formatMessage({ id: 'fcredit.title' })}
            onClick={this.handleClickFCredit}
            active={target === MENU_FCREDIT}
          />
        </Menu>
      )
    }
    return (
      <Menu large className='hidden-xs hidden-sm hidden-md col-lg-1 col-xl-2'>
        {renderNormalMenu}
      </Menu>
    )
  }
}

ToggleMenu.propTypes = {
  handleClickCustom: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  intl: intlShape.isRequired,
  menuMode: PropTypes.string,
  target: PropTypes.string.isRequired,
}

ToggleMenu.defaultProps = {
  menuMode: '',
}

export default injectIntl(ToggleMenu)
