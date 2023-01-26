import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import FundingSwitch from './FundingSwitch'

export default compose(
  withTranslation('translations'),
  withRouter,
)(FundingSwitch)
