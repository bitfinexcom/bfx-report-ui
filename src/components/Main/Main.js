import React, { PureComponent, Fragment } from 'react'
import { injectIntl } from 'react-intl'
import {
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import Trades from 'components/Trades'
import Timeframe from 'components/Timeframe'
import queryType from 'state/query/constants'
import { propTypes, defaultProps } from './Main.props'
import CustomDialog from './CustomDialog'

const {
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
} = queryType

const ICON = {
  ledgers: 'book',
  orders: 'flows',
  trades: 'exchange',
  deposits: 'add-to-folder',
  withdrawals: 'folder-shared-open',
}

class Main extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClickLedgers = this.handleClick.bind(this, MENU_LEDGERS)
    this.handleClickOrders = this.handleClick.bind(this, MENU_ORDERS)
    this.handleClickTrades = this.handleClick.bind(this, MENU_TRADES)
    this.handleClickDeposits = this.handleClick.bind(this, MENU_DEPOSITS)
    this.handleClickWithdrawals = this.handleClick.bind(this, MENU_WITHDRAWALS)
    this.handleClickCustom = this.handleClickCustom.bind(this)
    this.handleCustomDialogClose = this.handleCustomDialogClose.bind(this)
    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.startQuery = this.startQuery.bind(this)
  }

  state = {
    target: MENU_LEDGERS,
    isCustomOpen: false,
    startDate: null,
    endDate: new Date(),
  }

  handleClick(target) {
    this.setState({ target })
  }

  handleClickCustom(e) {
    e.preventDefault()
    this.setState({ isCustomOpen: true })
  }

  handleCustomDialogClose(e) {
    e.preventDefault()
    this.setState({ isCustomOpen: false })
  }

  handleRangeChange(range) {
    this.setState({
      startDate: range[0],
      endDate: range[1],
    })
  }

  startQuery() {
    const { startDate, endDate } = this.state
    const { setTimeRange } = this.props
    if (startDate !== null && endDate !== null) {
      setTimeRange(queryType.TIME_RANGE_CUSTOM, startDate.getTime(), endDate.getTime())
    }
    this.setState({ isCustomOpen: false })
  }

  render() {
    const { authStatus, authIsShown, intl } = this.props
    const {
      endDate,
      isCustomOpen,
      startDate,
      target,
    } = this.state
    let content
    switch (target) {
      case MENU_TRADES:
        content = (<Trades />)
        break
      case MENU_ORDERS:
        content = (<Orders />)
        break
      case MENU_DEPOSITS:
        content = (<Movements type={MENU_DEPOSITS} />)
        break
      case MENU_WITHDRAWALS:
        content = (<Movements type={MENU_WITHDRAWALS} />)
        break
      case MENU_LEDGERS:
      default:
        content = (<Ledgers />)
        break
    }
    const sideMenuItems = (
      <Fragment>
        <MenuItem
          icon={ICON[MENU_LEDGERS]}
          text={intl.formatMessage({ id: 'ledgers.title' })}
          onClick={this.handleClickLedgers}
          active={target === MENU_LEDGERS}
        />
        <MenuItem
          icon={ICON[MENU_TRADES]}
          text={intl.formatMessage({ id: 'trades.title' })}
          onClick={this.handleClickTrades}
          active={target === MENU_TRADES}
        />
        <MenuItem
          icon={ICON[MENU_ORDERS]}
          text={intl.formatMessage({ id: 'orders.title' })}
          onClick={this.handleClickOrders}
          active={target === MENU_ORDERS}
        />
        <MenuItem
          icon={ICON[MENU_DEPOSITS]}
          text={intl.formatMessage({ id: 'deposits.title' })}
          onClick={this.handleClickDeposits}
          active={target === MENU_DEPOSITS}
        />
        <MenuItem
          icon={ICON[MENU_WITHDRAWALS]}
          text={intl.formatMessage({ id: 'withdrawals.title' })}
          onClick={this.handleClickWithdrawals}
          active={target === MENU_WITHDRAWALS}
        />
      </Fragment>
    )

    return authStatus && !authIsShown ? (
      <div className='row'>
        <Menu large className='hidden-xs hidden-sm hidden-md col-lg-1 col-xl-2'>
          <Timeframe handleClickCustom={this.handleClickCustom} />
          <MenuDivider />
          {sideMenuItems}
        </Menu>
        <Menu large className='col-xs-12 col-sm-12 col-md-12 hidden-lg hidden-xl'>
          <Timeframe handleClickCustom={this.handleClickCustom} />
          <MenuDivider />
          <MenuItem
            icon={ICON[target]}
            text={intl.formatMessage({ id: `${target}.title` })}
            className='bitfinex-dropdown'
          >
            {sideMenuItems}
          </MenuItem>
        </Menu>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-10'>
          {content}
        </div>
        <CustomDialog
          type={target}
          isCustomOpen={isCustomOpen}
          handleCustomDialogClose={this.handleCustomDialogClose}
          handleRangeChange={this.handleRangeChange}
          startQuery={this.startQuery}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    ) : ''
  }
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

export default injectIntl(Main)
