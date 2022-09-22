import React, { Fragment, PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import AccountBalance from 'components/AccountBalance'
import AccountSummary from 'components/AccountSummary'
import AffiliatesEarnings from 'components/AffiliatesEarnings'
import AverageWinLoss from 'components/AverageWinLoss'
import Candles from 'components/Candles'
import ChangeLogs from 'components/ChangeLogs'
import ConcentrationRisk from 'components/ConcentrationRisk'
import Derivatives from 'components/Derivatives'
import FeesReport from 'components/FeesReport'
import ErrorDialog from 'components/ErrorDialog'
import FundingCreditHistory from 'components/FundingCreditHistory'
import FundingLoanHistory from 'components/FundingLoanHistory'
import FundingOfferHistory from 'components/FundingOfferHistory'
import FundingPayment from 'components/FundingPayment'
import GoToRangeDialog from 'components/GoToRangeDialog'
import Invoices from 'components/Invoices'
import Ledgers from 'components/Ledgers'
import LoanReport from 'components/LoanReport'
import Logins from 'components/Logins'
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
import StakingPayments from 'components/StakingPayments'
import SubAccounts from 'components/SubAccounts'
import TaxReport from 'components/TaxReport'
import Tickers from 'components/Tickers'
import TradedVolume from 'components/TradedVolume'
import Trades from 'components/Trades'
import Wallets from 'components/Wallets'
import ExportDialog from 'components/ExportDialog'
import ExportSuccessDialog from 'components/ExportSuccessDialog'
import Preferences from 'components/Preferences'
import TimeFrameDialog from 'components/TimeFrameDialog'
import queryType from 'state/query/constants'
import { getPath } from 'state/query/utils'
import NavMenu from 'ui/NavMenu'
import config from 'config'

import { propTypes, defaultProps } from './Main.props'

const {
  MENU_ACCOUNT_BALANCE,
  MENU_ACCOUNT_SUMMARY,
  MENU_AFFILIATES_EARNINGS,
  MENU_CANDLES,
  MENU_CHANGE_LOGS,
  MENU_CONCENTRATION_RISK,
  MENU_DERIVATIVES,
  MENU_FCREDIT,
  MENU_FEES_REPORT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_INVOICES,
  MENU_LEDGERS,
  MENU_LOAN_REPORT,
  MENU_LOGINS,
  MENU_ORDERS,
  MENU_ORDER_TRADES,
  MENU_TRADES,
  MENU_MOVEMENTS,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_SPAYMENTS,
  MENU_SUB_ACCOUNTS,
  MENU_TAX_REPORT,
  MENU_TICKERS,
  MENU_TRADED_VOLUME,
  MENU_WALLETS,
  MENU_WIN_LOSS,
} = queryType

const PATHS = {
  MENU_LEDGERS: [getPath(MENU_LEDGERS), `${getPath(MENU_LEDGERS)}/:symbol`],
  MENU_INVOICES: [getPath(MENU_INVOICES), `${getPath(MENU_INVOICES)}/:symbol`],
  MENU_CANDLES: [getPath(MENU_CANDLES)],
  MENU_TRADES: [getPath(MENU_TRADES), `${getPath(MENU_TRADES)}/:pair`],
  MENU_ORDERS: [getPath(MENU_ORDERS), `${getPath(MENU_ORDERS)}/:pair`],
  MENU_ORDER_TRADES: [getPath(MENU_ORDER_TRADES), `${getPath(MENU_ORDER_TRADES)}/:pair`],
  MENU_MOVEMENTS: [getPath(MENU_MOVEMENTS), `${getPath(MENU_MOVEMENTS)}/:symbol`],
  MENU_FCREDIT: [getPath(MENU_FCREDIT), `${getPath(MENU_FCREDIT)}/:symbol`],
  MENU_FLOAN: [getPath(MENU_FLOAN), `${getPath(MENU_FLOAN)}/:symbol`],
  MENU_FOFFER: [getPath(MENU_FOFFER), `${getPath(MENU_FOFFER)}/:symbol`],
  MENU_FPAYMENT: [getPath(MENU_FPAYMENT), `${getPath(MENU_FPAYMENT)}/:symbol`],
  MENU_SPAYMENTS: [getPath(MENU_SPAYMENTS), `${getPath(MENU_SPAYMENTS)}/:symbol`],
  MENU_AFFILIATES_EARNINGS: [getPath(MENU_AFFILIATES_EARNINGS), `${getPath(MENU_AFFILIATES_EARNINGS)}/:symbol`],
  MENU_PUBLIC_FUNDING: [getPath(MENU_PUBLIC_FUNDING), `${getPath(MENU_PUBLIC_FUNDING)}/:symbol`],
  MENU_PUBLIC_TRADES: [getPath(MENU_PUBLIC_TRADES), `${getPath(MENU_PUBLIC_TRADES)}/:pair`],
  MENU_TICKERS: [getPath(MENU_TICKERS), `${getPath(MENU_TICKERS)}/:pair`],
  MENU_DERIVATIVES: [getPath(MENU_DERIVATIVES), `${getPath(MENU_DERIVATIVES)}/:pair`],
  MENU_POSITIONS: [getPath(MENU_POSITIONS), `${getPath(MENU_POSITIONS)}/:pair`],
  MENU_FEES_REPORT: [getPath(MENU_FEES_REPORT), `${getPath(MENU_FEES_REPORT)}/:symbol`],
  MENU_LOAN_REPORT: [getPath(MENU_LOAN_REPORT), `${getPath(MENU_LOAN_REPORT)}/:symbol`],
  MENU_TRADED_VOLUME: [getPath(MENU_TRADED_VOLUME), `${getPath(MENU_TRADED_VOLUME)}/:pair`],
  MENU_TAX_REPORT: [
    getPath(MENU_TAX_REPORT),
    `${getPath(MENU_TAX_REPORT)}/:section(result)`,
    `${getPath(MENU_TAX_REPORT)}/:section(start_snapshot|end_snapshot|result)/:subsection(positions|tickers|wallets)`],
  MENU_ACCOUNT_SUMMARY: [...getPath(MENU_ACCOUNT_SUMMARY)],
  MENU_LOGINS: [getPath(MENU_LOGINS)],
  MENU_CHANGE_LOGS: [getPath(MENU_CHANGE_LOGS)],
  MENU_SUB_ACCOUNTS: [getPath(MENU_SUB_ACCOUNTS)],
}

class Main extends PureComponent {
  render() {
    const {
      authStatus,
      authIsShown,
      errorDialogDisabled,
    } = this.props

    return authStatus && !authIsShown ? (
      <Fragment>
        <NavMenu className='bitfinex-nav-menu--main' />
        <div className='bitfinex-dataset'>
          <Switch>
            <Route
              exact
              path={PATHS.MENU_LEDGERS}
              component={Ledgers}
            />
            <Route
              exact
              path={PATHS.MENU_INVOICES}
              component={Invoices}
            />
            <Route
              exact
              path={PATHS.MENU_CANDLES}
              component={Candles}
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
              path={PATHS.MENU_MOVEMENTS}
              component={Movements}
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
              path={PATHS.MENU_SPAYMENTS}
              component={StakingPayments}
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
            {config.showFrameworkMode && (
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
            <Route
              exact
              path={PATHS.MENU_ACCOUNT_SUMMARY}
              component={AccountSummary}
            />
            <Route
              exact
              path={PATHS.MENU_LOGINS}
              component={Logins}
            />
            <Route
              exact
              path={PATHS.MENU_CHANGE_LOGS}
              component={ChangeLogs}
            />
            {config.showFrameworkMode && (
              <Route
                exact
                path={PATHS.MENU_SUB_ACCOUNTS}
                component={SubAccounts}
              />
            )}
          </Switch>
        </div>
        <ExportDialog />
        <ExportSuccessDialog />
        {config.showFrameworkMode && !errorDialogDisabled && <ErrorDialog />}
        <PaginationDialog />
        <Preferences />
        <TimeFrameDialog />
        <GoToRangeDialog />
      </Fragment>
    ) : ''
  }
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

export default Main
