import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  fetchTaxReport,
  fetchTaxReportSnapshot,
  setParams,
  refresh,
} from 'state/taxReport/actions'
import { getParams } from 'state/taxReport/selectors'

import TaxReport from './TaxReport'

const mapStateToProps = (state = {}) => ({
  params: getParams(state),
})

const mapDispatchToProps = {
  fetchTaxReport,
  fetchSnapshot: fetchTaxReportSnapshot,
  setParams,
  refresh,
}

const TaxReportContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TaxReport))

export default TaxReportContainer
