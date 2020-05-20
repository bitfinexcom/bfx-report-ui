import { connect } from 'react-redux'

import { getTheme } from 'state/base/selectors'

import PlatformLogo from './PlatformLogo'

const mapStateToProps = (state, ownProps) => ({
  theme: ownProps.theme || getTheme(state),
})

const PlatformLogoContainer = connect(mapStateToProps)(PlatformLogo)

export default PlatformLogoContainer
