import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from 'state/accountBalance/actions'
import {
  getDataReceived,
  getEntries,
  getParams,
} from 'state/accountBalance/selectors'
import { getTimezone } from 'state/base/selectors'

import AccountBalance from './AccountBalance'

const mapStateToProps = (state = {}) => ({
  entries: getEntries(state),
  params: getParams(state),
  loading: !getDataReceived(state),
  timezone: getTimezone(state),
})

const mapDispatchToProps = dispatch => ({
  fetchBalance: params => dispatch(actions.fetchBalance(params)),
  refresh: () => dispatch(actions.refresh()),
})

const AccountBalanceContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountBalance))

export default AccountBalanceContainer
