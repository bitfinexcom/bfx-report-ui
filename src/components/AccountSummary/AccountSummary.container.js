import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchData,
  refresh,
} from 'state/accountSummary/actions'
import {
  getData,
  getDataReceived,
  getPageLoading,
} from 'state/accountSummary/selectors'

import AccountSummary from './AccountSummary'

const mapStateToProps = state => ({
  data: getData(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = {
  fetchData,
  refresh,
}

const AccountSummaryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountSummary))

export default AccountSummaryContainer
