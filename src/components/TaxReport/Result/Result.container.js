import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchTaxReport } from 'state/taxReport/actions'
import {
  getDataReceived,
  getData,
} from 'state/taxReport/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'

import TaxReportResult from './Result'

const mapStateToProps = state => ({
  data: getData(state),
  loading: !getDataReceived(state),
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchTaxReport,
}

const TaxReportResultContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TaxReportResult))

export default TaxReportResultContainer
