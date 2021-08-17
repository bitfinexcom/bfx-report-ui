import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { fetchTaxReport, refresh } from 'state/taxReport/actions'
import {
  getData,
  getDataReceived,
  getPageLoading,
} from 'state/taxReport/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'

import Result from './Result'

const mapStateToProps = state => ({
  data: getData(state),
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
  pageLoading: getPageLoading(state),
  dataReceived: getDataReceived(state),
})

const mapDispatchToProps = {
  fetchData: fetchTaxReport,
  refresh,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(Result)
