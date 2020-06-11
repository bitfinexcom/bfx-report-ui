import { connect } from 'react-redux'

import {
  getAuthData,
  getIsShown,
  getUsers,
  getUsersLoading,
} from 'state/auth/selectors'

import Auth from './Auth'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  isShown: getIsShown(state),
  users: getUsers(state),
  usersLoading: getUsersLoading(state),
})

const AuthContainer = connect(mapStateToProps, null)(Auth)

export default AuthContainer
