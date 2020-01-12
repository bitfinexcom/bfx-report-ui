import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import AccountBalance from 'components/AccountBalance'
import AffiliatesEarnings from 'components/AffiliatesEarnings'
import AverageWinLoss from 'components/AverageWinLoss'
import ConcentrationRisk from 'components/ConcentrationRisk'
import Derivatives from 'components/Derivatives'
import FeesReport from 'components/FeesReport'
import FrameworkDialog from 'components/FrameworkDialog'
import FundingCreditHistory from 'components/FundingCreditHistory'
import FundingLoanHistory from 'components/FundingLoanHistory'
import FundingOfferHistory from 'components/FundingOfferHistory'
import FundingPayment from 'components/FundingPayment'
import Ledgers from 'components/Ledgers'
import LoanReport from 'components/LoanReport'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import OrderTrades from 'components/OrderTrades'
import PaginationDialog from 'components/PaginationDialog'
import Positions from 'components/Positions'
import PositionsActive from 'components/PositionsActive'
import PositionsAudit from 'components/PositionsAudit'
import PositionsAuditNoId from 'components/PositionsAudit/PositionsAudit.NoId'
import PublicFunding from 'components/PublicFunding'
import PublicTrades from 'components/PublicTrades'
import Snapshots from 'components/Snapshots'
import TaxReport from 'components/TaxReport'
import Tickers from 'components/Tickers'
import TradedVolume from 'components/TradedVolume'
import Trades from 'components/Trades'
import Wallets from 'components/Wallets'
import ExportDialog from 'components/ExportDialog'
import queryType from 'state/query/constants'
import { getPath, getTarget } from 'state/query/utils'
import ToggleMenu from 'ui/ToggleMenu'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './Main.props'
import CustomDialog from './CustomDialog'

const {
  MENU_ACCOUNT_BALANCE,
  MENU_AFFILIATES_EARNINGS,
  MENU_CONCENTRATION_RISK,
  MENU_DERIVATIVES,
  MENU_FCREDIT,
  MENU_FEES_REPORT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_LOAN_REPORT,
  MENU_ORDERS,
  MENU_ORDER_TRADES,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_TAX_REPORT,
  MENU_TICKERS,
  MENU_TRADED_VOLUME,
  MENU_WALLETS,
  MENU_WIN_LOSS,
} = queryType

const PATHS = {
  MENU_LEDGERS: [...getPath(MENU_LEDGERS), `${getPath(MENU_LEDGERS)[0]}/:symbol`],
  MENU_TRADES: [getPath(MENU_TRADES), `${getPath(MENU_TRADES)}/:pair`],
  MENU_ORDERS: [getPath(MENU_ORDERS), `${getPath(MENU_ORDERS)}/:pair`],
  MENU_ORDER_TRADES: [getPath(MENU_ORDER_TRADES), `${getPath(MENU_ORDER_TRADES)}/:pair`],
  MENU_DEPOSITS: [getPath(MENU_DEPOSITS), `${getPath(MENU_DEPOSITS)}/:symbol`],
  MENU_WITHDRAWALS: [getPath(MENU_WITHDRAWALS), `${getPath(MENU_WITHDRAWALS)}/:symbol`],
  MENU_FCREDIT: [getPath(MENU_FCREDIT), `${getPath(MENU_FCREDIT)}/:symbol`],
  MENU_FLOAN: [getPath(MENU_FLOAN), `${getPath(MENU_FLOAN)}/:symbol`],
  MENU_FOFFER: [getPath(MENU_FOFFER), `${getPath(MENU_FOFFER)}/:symbol`],
  MENU_FPAYMENT: [getPath(MENU_FPAYMENT), `${getPath(MENU_FPAYMENT)}/:symbol`],
  MENU_AFFILIATES_EARNINGS: [getPath(MENU_AFFILIATES_EARNINGS), `${getPath(MENU_AFFILIATES_EARNINGS)}/:symbol`],
  MENU_PUBLIC_FUNDING: [getPath(MENU_PUBLIC_FUNDING), `${getPath(MENU_PUBLIC_FUNDING)}/:symbol`],
  MENU_PUBLIC_TRADES: [getPath(MENU_PUBLIC_TRADES), `${getPath(MENU_PUBLIC_TRADES)}/:pair`],
  MENU_TICKERS: [getPath(MENU_TICKERS), `${getPath(MENU_TICKERS)}/:pair`],
  MENU_DERIVATIVES: [getPath(MENU_DERIVATIVES), `${getPath(MENU_DERIVATIVES)}/:pair`],
  MENU_POSITIONS: [getPath(MENU_POSITIONS), `${getPath(MENU_POSITIONS)}/:pair`],
  MENU_FEES_REPORT: [getPath(MENU_FEES_REPORT), `${getPath(MENU_FEES_REPORT)}/:pair`],
  MENU_LOAN_REPORT: [getPath(MENU_LOAN_REPORT), `${getPath(MENU_LOAN_REPORT)}/:symbol`],
  MENU_TRADED_VOLUME: [getPath(MENU_TRADED_VOLUME), `${getPath(MENU_TRADED_VOLUME)}/:pair`],
  MENU_TAX_REPORT: [
    getPath(MENU_TAX_REPORT),
    `${getPath(MENU_TAX_REPORT)}/:section(result)`,
    `${getPath(MENU_TAX_REPORT)}/:section(start_snapshot|end_snapshot|result)/:subsection(positions|tickers|wallets)`],
}

class Main extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClickCustom = this.handleCustomDialog.bind(this, true)
    this.handleCustomDialogClose = this.handleCustomDialog.bind(this, false)
  }

  state = {
    startDate: null,
    endDate: new Date(),
  }

  handleCustomDialog = (show, e) => {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.showCustomDialog(show)
  }

  handleRangeChange = (range) => {
    const [startDate, endDate] = range
    this.setState({
      startDate,
      endDate,
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
      startDate,
    } = this.state
    const target = getTarget(location.pathname)

    return authStatus && !authIsShown ? (
      <div className='row'>
        <ToggleMenu
          target={target}
          handleClickCustom={this.handleClickCustom}
          history={history}
          menuMode={menuMode}
        />
        <div className='bitfinex-dataset'>
          <Switch>
            <Route
              exact
              path={PATHS.MENU_LEDGERS}
              component={Ledgers}
            />
            <Route
              exact
              path={PATHS.MENU_TRADES}
              component={Trades}
            />
            <Route
              exact
              path={PATHS.MENU_ORDERS}
              component={Orders}
            />
            <Route
              exact
              path={PATHS.MENU_ORDER_TRADES}
              component={OrderTrades}
            />
            <Route
              exact
              path={PATHS.MENU_DEPOSITS}
              render={() => <Movements type={MENU_DEPOSITS} />}
            />
            <Route
              exact
              path={PATHS.MENU_WITHDRAWALS}
              render={() => <Movements type={MENU_WITHDRAWALS} />}
            />
            <Route
              exact
              path={PATHS.MENU_FCREDIT}
              component={FundingCreditHistory}
            />
            <Route
              exact
              path={PATHS.MENU_FLOAN}
              component={FundingLoanHistory}
            />
            <Route
              exact
              path={PATHS.MENU_FOFFER}
              component={FundingOfferHistory}
            />
            <Route
              exact
              path={PATHS.MENU_FPAYMENT}
              component={FundingPayment}
            />
            <Route
              exact
              path={PATHS.MENU_AFFILIATES_EARNINGS}
              component={AffiliatesEarnings}
            />
            <Route
              exact
              path={PATHS.MENU_PUBLIC_FUNDING}
              component={PublicFunding}
            />
            <Route
              exact
              path={PATHS.MENU_PUBLIC_TRADES}
              component={PublicTrades}
            />
            <Route
              exact
              path={PATHS.MENU_TICKERS}
              component={Tickers}
            />
            <Route
              exact
              path={PATHS.MENU_DERIVATIVES}
              component={Derivatives}
            />
            <Route
              exact
              path={getPath(MENU_POSITIONS_AUDIT)}
              component={PositionsAuditNoId}
            />
            <Route
              exact
              path={`${getPath(MENU_POSITIONS_AUDIT)}/:id`}
              component={PositionsAudit}
            />
            <Route
              exact
              path={getPath(MENU_POSITIONS_ACTIVE)}
              component={PositionsActive}
            />
            <Route
              exact
              path={PATHS.MENU_POSITIONS}
              component={Positions}
            />
            <Route
              exact
              path={getPath(MENU_WALLETS)}
              component={Wallets}
            />
            {platform.showFrameworkMode && (
              [
                <Route
                  exact
                  path={getPath(MENU_ACCOUNT_BALANCE)}
                  component={AccountBalance}
                  key={MENU_ACCOUNT_BALANCE}
                />,
                <Route
                  exact
                  path={PATHS.MENU_LOAN_REPORT}
                  component={LoanReport}
                  key={MENU_LOAN_REPORT}
                />,
                <Route
                  exact
                  path={PATHS.MENU_TRADED_VOLUME}
                  component={TradedVolume}
                  key={MENU_TRADED_VOLUME}
                />,
                <Route
                  exact
                  path={PATHS.MENU_FEES_REPORT}
                  component={FeesReport}
                  key={MENU_FEES_REPORT}
                />,
                <Route
                  exact
                  path={getPath(MENU_WIN_LOSS)}
                  component={AverageWinLoss}
                  key={MENU_WIN_LOSS}
                />,
                <Route
                  exact
                  path={getPath(MENU_CONCENTRATION_RISK)}
                  component={ConcentrationRisk}
                  key={MENU_CONCENTRATION_RISK}
                />,
                <Route
                  exact
                  path={getPath(MENU_SNAPSHOTS)}
                  component={Snapshots}
                  key={MENU_SNAPSHOTS}
                />,
                <Route
                  exact
                  path={PATHS.MENU_TAX_REPORT}
                  component={TaxReport}
                  key={MENU_TAX_REPORT}
                />,
              ]
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
        />
        <ExportDialog />
        {platform.showFrameworkMode && <FrameworkDialog />}
        <PaginationDialog />
      </div>
    ) : ''
  }
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

export default Main
