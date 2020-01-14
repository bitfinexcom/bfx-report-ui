import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setCustomTimeRange } from 'state/query/actions'
import { showCustomDialog } from 'state/ui/actions'
import { getAuthStatus, getIsShown } from 'state/auth/selectors'
import { getMenuMode } from 'state/base/selectors'
import { getIsCustomDialogOpen } from 'state/ui/selectors'

import Main from './Main'

const mapStateToProps = state => ({
  authIsShown: getIsShown(state),
  authStatus: getAuthStatus(state),
  menuMode: getMenuMode(state),
  isCustomOpen: getIsCustomDialogOpen(state),
})

const mapDispatchToProps = {
  setCustomTimeRange,
  showCustomDialog,
}

const MainContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

export default MainContainer
