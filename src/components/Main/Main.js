import React, { PureComponent, Fragment } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Classes,
  Dialog,
  Intent,
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'
import { DateRangeInput } from '@blueprintjs/datetime'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import Trades from 'components/Trades'
import Timeframe from 'components/Timeframe'
import { momentFormatter } from 'state/utils'
import queryType from 'state/query/constants'
import { propTypes, defaultProps } from './Main.props'

const MENU_LEDGERS = 'ledgers'
const MENU_ORDERS = 'orders'
const MENU_TRADES = 'trades'
const MENU_DEPOSITS = 'deposits'
const MENU_WITHDRAWALS = 'withdrawals'
const ICON = {
  ledgers: 'book',
  orders: 'flows',
  trades: 'exchange',
  deposits: 'add-to-folder',
  withdrawals: 'folder-shared-open',
}

const DATE_FORMAT = momentFormatter('YYYY-MM-DD HH:mm:ss')

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
      case MENU_LEDGERS:
        content = (<Ledgers />)
        break
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
        <Dialog
          icon='calendar'
          onClose={this.handleCustomDialogClose}
          title={intl.formatMessage({ id: 'timeframe.custom.title' })}
          autoFocus
          canEscapeKeyClose
          canOutsideClickClose
          enforceFocus
          usePortal
          isOpen={isCustomOpen}
        >
          <div className={Classes.DIALOG_BODY}>
            <DateRangeInput
              allowSingleDayRange
              closeOnSelection
              formatDate={DATE_FORMAT.formatDate}
              parseDate={DATE_FORMAT.parseDate}
              onChange={this.handleRangeChange}
              value={[startDate, endDate]}
              maxDate={new Date()}
            />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button
                intent={Intent.PRIMARY}
                onClick={this.startQuery}
                disabled={!startDate || !endDate}
              >
                {intl.formatMessage({ id: 'timeframe.custom.view' })}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    ) : ''
  }
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

export default injectIntl(Main)
