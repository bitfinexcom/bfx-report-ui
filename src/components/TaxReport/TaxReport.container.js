import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { refresh } from 'state/taxReport/actions'

import TaxReport from './TaxReport'

const mapDispatchToProps = {
  refresh,
}

export default compose(
  connect(null, mapDispatchToProps),
  withTranslation('translations'),
  withRouter,
)(TaxReport)
