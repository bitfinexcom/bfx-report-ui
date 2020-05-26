import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getWindowWidth } from 'state/ui/selectors'

import NavMenu from './NavMenu'

const mapStateToProps = state => ({
  windowWidth: getWindowWidth(state),
})


const NavMenuContainer = connect(mapStateToProps)(withRouter(NavMenu))

export default NavMenuContainer
