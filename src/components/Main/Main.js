import React, { PureComponent, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import {
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'

import FundingCreditHistory from 'components/FundingCreditHistory'
import FundingLoanHistory from 'components/FundingLoanHistory'
import FundingOfferHistory from 'components/FundingOfferHistory'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import Trades from 'components/Trades'
import Timeframe from 'components/Timeframe'
import ExportDialog from 'components/ExportDialog'
import queryType from 'state/query/constants'
import { MAPPING, PATHMAP } from 'state/query/utils'

import { propTypes, defaultProps } from './Main.props'
import CustomDialog from './CustomDialog'

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

class Main extends PureComponent {
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
    this.handleClickCustom = this.handleClickCustom.bind(this)
    this.handleCustomDialogClose = this.handleCustomDialogClose.bind(this)
    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.startQuery = this.startQuery.bind(this)
    this.handleClickExport = this.handleClickExport.bind(this)
    this.handleExportDialogClose = this.handleExportDialogClose.bind(this)
    this.startExport = this.startExport.bind(this)
  }

  state = {
    isCustomOpen: false,
    isExportOpen: false,
    startDate: null,
    endDate: new Date(),
  }

  handleClick(target) {
    const { history } = this.props
    // remove url params
    history.push(MAPPING[target].path + history.location.search)
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
    const { setCustomTimeRange } = this.props
    if (startDate !== null && endDate !== null) {
      setCustomTimeRange(startDate.getTime(), endDate.getTime())
    }
    this.setState({ isCustomOpen: false })
  }

  handleClickExport() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.prepareExport()
    this.setState({ isExportOpen: true })
  }

  handleExportDialogClose(e) {
    e.preventDefault()
    this.setState({ isExportOpen: false })
  }

  startExport() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.exportCsv(this.state.target)
    this.setState({ isExportOpen: false })
  }

  render() {
    const {
      authStatus,
      authIsShown,
      intl,
      location,
    } = this.props
    const {
      endDate,
      isCustomOpen,
      isExportOpen,
      startDate,
    } = this.state
    const target = PATHMAP[location.pathname] || MENU_LEDGERS

    const sideMenuItems = (
      <Fragment>
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
            icon={MAPPING[target].icon}
            text={intl.formatMessage({ id: `${target}.title` })}
            className='bitfinex-dropdown'
          >
            {sideMenuItems}
          </MenuItem>
        </Menu>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-10'>
          <Switch>
            <Route
              exact
              path='/'
              component={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_LEDGERS].path}
              component={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_TRADES].path}
              component={() => <Trades handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_ORDERS].path}
              component={() => <Orders handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_DEPOSITS].path}
              component={() => <Movements type={MENU_DEPOSITS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_WITHDRAWALS].path}
              component={() => <Movements type={MENU_WITHDRAWALS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_FCREDIT].path}
              component={() => <FundingCreditHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_FLOAN].path}
              component={() => <FundingLoanHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={MAPPING[MENU_FOFFER].path}
              component={() => <FundingOfferHistory handleClickExport={this.handleClickExport} />}
            />
          </Switch>
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
        <ExportDialog
          type={target}
          isExportOpen={isExportOpen}
          handleExportDialogClose={this.handleExportDialogClose}
          startExport={this.startExport}
        />
      </div>
    ) : ''
  }
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

export default injectIntl(Main)
