import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  setParams,
  refresh,
} from 'state/taxReport/actions'
import { getParams } from 'state/taxReport/selectors'

import TaxReport from './TaxReport'

const mapStateToProps = (state = {}) => ({
  params: getParams(state),
})

const mapDispatchToProps = {
  setParams,
  refresh,
}

const TaxReportContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TaxReport))

export default TaxReportContainer
