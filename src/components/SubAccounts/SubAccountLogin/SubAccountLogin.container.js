import { connect } from 'react-redux'

import { logout, signIn } from 'state/auth/actions'

import SubAccountLogin from './SubAccountLogin'

const mapDispatchToProps = {
  logout,
  signIn,
}

const SubAccountLoginContainer = connect(null, mapDispatchToProps)(SubAccountLogin)

export default SubAccountLoginContainer
