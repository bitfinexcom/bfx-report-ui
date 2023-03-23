import { connect } from 'react-redux'

import { getIsTurkishSite } from 'state/base/selectors'
import { getIsErrorDialogDisabled } from 'state/ui/selectors'
import { getAuthStatus, getIsShown, getIsSubAccsRestricted } from 'state/auth/selectors'

import Main from './Main'

const mapStateToProps = state => ({
  authIsShown: getIsShown(state),
  authStatus: getAuthStatus(state),
  isTurkishSite: getIsTurkishSite(state),
  isSubAccsRestricted: getIsSubAccsRestricted(state),
  errorDialogDisabled: getIsErrorDialogDisabled(state),
})

const MainContainer = connect(mapStateToProps)(Main)

export default MainContainer
