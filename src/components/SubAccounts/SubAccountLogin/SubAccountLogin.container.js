import { connect } from 'react-redux'

import { logout, signIn } from 'state/auth/actions'

import RemoveSubAccount from './SubAccountLogin'

const mapDispatchToProps = {
  logout,
  signIn,
}

const SubAccountLoginContainer = connect(null, mapDispatchToProps)(RemoveSubAccount)

export default SubAccountLoginContainer
