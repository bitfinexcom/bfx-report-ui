import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import {
  getAuthData,
  getIsLoading,
  getUsers,
} from 'state/auth/selectors'

import RegisterSubAccounts from './RegisterSubAccounts'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  loading: getIsLoading(state),
  users: getUsers(state),
})

export default compose(
  withTranslation('translations'),
  connect(mapStateToProps),
)(RegisterSubAccounts)
