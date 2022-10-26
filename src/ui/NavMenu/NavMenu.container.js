import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { getWindowWidth } from 'state/ui/selectors'
import { getIsTurkishSite } from 'state/base/selectors'

import NavMenu from './NavMenu'

const mapStateToProps = state => ({
  windowWidth: getWindowWidth(state),
  isTurkishSite: getIsTurkishSite(state),
})

export default compose(
  withTranslation('translations'),
  connect(mapStateToProps),
  withRouter,
)(NavMenu)
