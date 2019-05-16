import React, { Fragment, PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import classNames from 'classnames'

import AccountBalance from 'components/AccountBalance'
import AverageWinLoss from 'components/AverageWinLoss'
import ConcentrationRisk from 'components/ConcentrationRisk'
import FrameworkDialog from 'components/FrameworkDialog'
import FundingCreditHistory from 'components/FundingCreditHistory'
import FundingLoanHistory from 'components/FundingLoanHistory'
import FundingOfferHistory from 'components/FundingOfferHistory'
import FundingPayment from 'components/FundingPayment'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import Positions from 'components/Positions'
import PositionsActive from 'components/PositionsActive'
import PositionsAudit from 'components/PositionsAudit'
import PublicFunding from 'components/PublicFunding'
import PublicTrades from 'components/PublicTrades'
import Tickers from 'components/Tickers'
import Trades from 'components/Trades'
import Wallets from 'components/Wallets'
import ExportDialog from 'components/ExportDialog'
import queryType from 'state/query/constants'
import baseType from 'state/base/constants'
import { getPath, getTarget } from 'state/query/utils'
import ToggleMenu from 'ui/ToggleMenu'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './Main.props'
import CustomDialog from './CustomDialog'

const {
  MENU_ACCOUNT_BALANCE,
  MENU_CONCENTRATION_RISK,
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
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_TICKERS,
  MENU_WALLETS,
  MENU_WIN_LOSS,
} = queryType

class Main extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClickCustom = this.handleCustomDialog.bind(this, true)
    this.handleCustomDialogClose = this.handleCustomDialog.bind(this, false)
    this.handleClickExport = this.handleExportDialog.bind(this, true)
    this.handleExportDialogClose = this.handleExportDialog.bind(this, false)
  }

  state = {
    isExportOpen: false,
    startDate: null,
    endDate: new Date(),
  }

  handleClick = (target) => {
    const { history } = this.props
    // remove url params
    history.push(`${getPath(target)}${history.location.search}`)
  }

  handleCustomDialog = (show, e) => {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.showCustomDialog(show)
  }

  handleRangeChange = (range) => {
    this.setState({
      startDate: range[0],
      endDate: range[1],
    })
  }

  startQuery = () => {
    const { startDate, endDate } = this.state
    const { setCustomTimeRange, showCustomDialog } = this.props
    if (startDate !== null && endDate !== null) {
      setCustomTimeRange(startDate.getTime(), endDate.getTime())
    }
    showCustomDialog(false)
  }

  handleExportDialog = (show, e) => {
    e.preventDefault()
    if (show) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.prepareExport()
    }
    this.setState({ isExportOpen: show })
  }

  startExport = (currentTargets) => {
    const { exportCsv } = this.props
    return () => {
      exportCsv(currentTargets)
      this.setState({ isExportOpen: false })
    }
  }

  render() {
    const {
      authStatus,
      authIsShown,
      history,
      isCustomOpen,
      isFrameworkOpen,
      location,
      menuMode,
      timezone,
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
              render={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_LEDGERS)}
              render={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_LEDGERS)}/:symbol`}
              render={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_TRADES)}
              render={() => <Trades handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_TRADES)}/:pair`}
              render={() => <Trades handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_ORDERS)}
              render={() => <Orders handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_ORDERS)}/:pair`}
              render={() => <Orders handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_DEPOSITS)}
              render={() => <Movements type={MENU_DEPOSITS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_DEPOSITS)}/:symbol`}
              render={() => <Movements type={MENU_DEPOSITS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_WITHDRAWALS)}
              render={() => <Movements type={MENU_WITHDRAWALS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_WITHDRAWALS)}/:symbol`}
              render={() => <Movements type={MENU_WITHDRAWALS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FCREDIT)}
              render={() => <FundingCreditHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FCREDIT)}/:symbol`}
              render={() => <FundingCreditHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FLOAN)}
              render={() => <FundingLoanHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FLOAN)}/:symbol`}
              render={() => <FundingLoanHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FOFFER)}
              render={() => <FundingOfferHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FOFFER)}/:symbol`}
              render={() => <FundingOfferHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path='/'
              render={() => <FundingPayment handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FPAYMENT)}
              render={() => <FundingPayment handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FPAYMENT)}/:symbol`}
              render={() => <FundingPayment handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_PUBLIC_FUNDING)}
              render={() => <PublicFunding handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_PUBLIC_FUNDING)}/:symbol`}
              render={() => <PublicFunding handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_PUBLIC_TRADES)}
              render={() => <PublicTrades handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_PUBLIC_TRADES)}/:pair`}
              render={() => <PublicTrades handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_TICKERS)}
              render={() => <Tickers handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_TICKERS)}/:pair`}
              render={() => <Tickers handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_POSITIONS_AUDIT)}
              render={() => <PositionsAudit handleClickExport={this.handleClickExport} noid />}
            />
            <Route
              path={`${getPath(MENU_POSITIONS_AUDIT)}/:id`}
              render={() => <PositionsAudit handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={getPath(MENU_POSITIONS_ACTIVE)}
              render={() => <PositionsActive handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_POSITIONS)}
              render={() => <Positions handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_POSITIONS)}/:pair`}
              render={() => <Positions handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_WALLETS)}
              render={() => <Wallets handleClickExport={this.handleClickExport} />}
            />
            {platform.showFrameworkMode && (
              <Fragment>
                <Route
                  exact
                  path={getPath(MENU_ACCOUNT_BALANCE)}
                  component={AccountBalance}
                />
                <Route
                  exact
                  path={getPath(MENU_WIN_LOSS)}
                  component={AverageWinLoss}
                />
                <Route
                  exact
                  path={getPath(MENU_CONCENTRATION_RISK)}
                  component={ConcentrationRisk}
                />
              </Fragment>
            )}
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
          timezone={timezone}
        />
        <ExportDialog
          type={target}
          isExportOpen={isExportOpen}
          handleExportDialogClose={this.handleExportDialogClose}
          startExport={this.startExport}
        />
        <FrameworkDialog isFrameworkOpen={isFrameworkOpen} />
      </div>
    ) : ''
  }
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

export default Main
