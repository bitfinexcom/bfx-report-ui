import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import classNames from 'classnames'

import FundingCreditHistory from 'components/FundingCreditHistory'
import FundingLoanHistory from 'components/FundingLoanHistory'
import FundingOfferHistory from 'components/FundingOfferHistory'
import FundingPayment from 'components/FundingPayment'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import Positions from 'components/Positions'
import PositionsAudit from 'components/PositionsAudit'
import PublicTrades from 'components/PublicTrades'
import Tickers from 'components/Tickers'
import Trades from 'components/Trades'
import Wallets from 'components/Wallets'
import Withdrawals from 'components/Withdrawals'
import ExportDialog from 'components/ExportDialog'
import queryType from 'state/query/constants'
import baseType from 'state/base/constants'
import { getPath, getTarget } from 'state/query/utils'
import ToggleMenu from 'ui/ToggleMenu'

import { propTypes, defaultProps } from './Main.props'
import CustomDialog from './CustomDialog'

const {
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
  MENU_POSITIONS,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_TRADES,
  MENU_TICKERS,
  MENU_WALLETS,
} = queryType

class Main extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClickCustom = this.handleCustomDialog.bind(this, true)
    this.handleCustomDialogClose = this.handleCustomDialog.bind(this, false)
    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.startQuery = this.startQuery.bind(this)
    this.handleClickExport = this.handleExportDialog.bind(this, true)
    this.handleExportDialogClose = this.handleExportDialog.bind(this, false)
    this.startExport = this.startExport.bind(this)
  }

  state = {
    isExportOpen: false,
    startDate: null,
    endDate: new Date(),
  }

  handleClick(target) {
    const { history } = this.props
    // remove url params
    history.push(`${getPath(target)}${history.location.search}`)
  }

  handleCustomDialog(show, e) {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.showCustomDialog(show)
  }

  handleRangeChange(range) {
    this.setState({
      startDate: range[0],
      endDate: range[1],
    })
  }

  startQuery() {
    const { startDate, endDate } = this.state
    const { setCustomTimeRange, showCustomDialog } = this.props
    if (startDate !== null && endDate !== null) {
      setCustomTimeRange(startDate.getTime(), endDate.getTime())
    }
    showCustomDialog(false)
  }

  handleExportDialog(show, e) {
    e.preventDefault()
    if (show) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.prepareExport()
    }
    this.setState({ isExportOpen: show })
  }

  startExport() {
    const { location, exportCsv } = this.props
    const target = getTarget(location.pathname)
    exportCsv(target)
    this.setState({ isExportOpen: false })
  }

  render() {
    const {
      authStatus,
      authIsShown,
      history,
      isCustomOpen,
      location,
      menuMode,
    } = this.props
    const {
      endDate,
      isExportOpen,
      startDate,
    } = this.state
    const target = getTarget(location.pathname)

    const datasetClass = menuMode === baseType.MENU_MODE_ICON
      ? classNames(
        'col-xs-12',
        'col-sm-12',
        'col-md-12',
        'col-lg-11',
        'col-xl-11',
      ) : classNames(
        'col-xs-12',
        'col-sm-12',
        'col-md-12',
        'col-lg-9',
        'col-xl-10',
      )

    return authStatus && !authIsShown ? (
      <div className='row'>
        <ToggleMenu
          target={target}
          handleClickCustom={this.handleClickCustom}
          history={history}
          menuMode={menuMode}
        />
        <div className={datasetClass}>
          <Switch>
            <Route
              exact
              path='/'
              component={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_LEDGERS)}
              component={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_LEDGERS)}/:symbol`}
              component={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_TRADES)}
              component={() => <Trades handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_TRADES)}/:pair`}
              component={() => <Trades handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_ORDERS)}
              component={() => <Orders handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_ORDERS)}/:pair`}
              component={() => <Orders handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_DEPOSITS)}
              component={() => <Movements type={MENU_DEPOSITS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_DEPOSITS)}/:symbol`}
              component={() => <Movements type={MENU_DEPOSITS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_WITHDRAWALS)}
              component={() => <Withdrawals type={MENU_WITHDRAWALS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_WITHDRAWALS)}/:symbol`}
              component={() => <Withdrawals type={MENU_WITHDRAWALS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FCREDIT)}
              component={() => <FundingCreditHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FCREDIT)}/:symbol`}
              component={() => <FundingCreditHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FLOAN)}
              component={() => <FundingLoanHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FLOAN)}/:symbol`}
              component={() => <FundingLoanHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FOFFER)}
              component={() => <FundingOfferHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FOFFER)}/:symbol`}
              component={() => <FundingOfferHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path='/'
              component={() => <FundingPayment handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FPAYMENT)}
              component={() => <FundingPayment handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FPAYMENT)}/:symbol`}
              component={() => <FundingPayment handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_PUBLIC_TRADES)}
              component={() => <PublicTrades handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_PUBLIC_TRADES)}/:pair`}
              component={() => <PublicTrades handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_TICKERS)}
              component={() => <Tickers handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_TICKERS)}/:pair`}
              component={() => <Tickers handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_POSITIONS_AUDIT)}
              component={() => <PositionsAudit handleClickExport={this.handleClickExport} noid />}
            />
            <Route
              path={`${getPath(MENU_POSITIONS_AUDIT)}/:id`}
              component={() => <PositionsAudit handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_POSITIONS)}
              component={() => <Positions handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_POSITIONS)}/:pair`}
              component={() => <Positions handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_WALLETS)}
              component={() => <Wallets handleClickExport={this.handleClickExport} />}
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

export default Main
