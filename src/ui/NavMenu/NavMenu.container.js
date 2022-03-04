import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getWindowWidth } from 'state/ui/selectors'

import NavMenu from './NavMenu'

const mapStateToProps = state => ({
  windowWidth: getWindowWidth(state),
})

export default compose(
  connect(mapStateToProps),
  withRouter,
)(NavMenu)
