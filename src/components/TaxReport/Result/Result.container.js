import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchTaxReport } from 'state/taxReport/actions'
import {
  getDataReceived,
  getData,
  getPageLoading,
} from 'state/taxReport/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'

import TaxReportResult from './Result'

const mapStateToProps = state => ({
  data: getData(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchData: fetchTaxReport,
}

const TaxReportResultContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TaxReportResult))

export default TaxReportResultContainer
