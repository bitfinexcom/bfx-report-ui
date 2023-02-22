import { memo } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import SectionSwitch from './SectionSwitch'

export default compose(
  withTranslation('translations'),
  withRouter,
  memo,
)(SectionSwitch)
