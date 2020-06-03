import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { refresh } from 'state/taxReport/actions'

import TaxReport from './TaxReport'

const mapDispatchToProps = {
  refresh,
}

const TaxReportContainer = withRouter(connect(null, mapDispatchToProps)(TaxReport))

export default TaxReportContainer
