import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import {
  refresh,
  fetchData,
} from 'state/accountSummary/actions'
import {
  getData,
  getPageLoading,
  getDataReceived,
} from 'state/accountSummary/selectors'

import AccountSummary from './AccountSummary'

const mapStateToProps = state => ({
  data: getData(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
})

const mapDispatchToProps = {
  refresh,
  fetchData,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(AccountSummary)
