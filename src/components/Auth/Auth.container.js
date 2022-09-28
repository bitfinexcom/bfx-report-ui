import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import {
  getAuthData,
  getIsShown,
  getUsers,
  getUsersLoaded,
} from 'state/auth/selectors'

import Auth from './Auth'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  isShown: getIsShown(state),
  isUsersLoaded: getUsersLoaded(state),
  users: getUsers(state),
})

export default compose(
  withTranslation('translations'),
  connect(mapStateToProps),
)(Auth)
