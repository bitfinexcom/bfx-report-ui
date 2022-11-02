import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import PositionsSwitch from './PositionsSwitch'

export default compose(
  withTranslation('translations'),
  withRouter,
)(PositionsSwitch)
