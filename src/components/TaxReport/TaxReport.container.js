import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchTaxReport,
  refresh,
} from 'state/taxReport/actions'
import {
  getDataReceived,
  getParams,
  getData,
} from 'state/taxReport/selectors'
import { getFullTime, getTimeOffset } from 'state/base/selectors'

import TaxReport from './TaxReport'

const mapStateToProps = (state = {}) => ({
  params: getParams(state),
  data: getData(state),
  loading: !getDataReceived(state),
  getFullTime: getFullTime(state),
  timeOffset: getTimeOffset(state),
})

const mapDispatchToProps = {
  fetchTaxReport,
  refresh,
}

const TaxReportContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TaxReport))

export default TaxReportContainer
