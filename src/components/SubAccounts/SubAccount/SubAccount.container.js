import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getSubAccountsLoading } from 'state/auth/selectors'
import { addSubAccount, updateSubAccount } from 'state/subAccounts/actions'

import SubAccount from './SubAccount'

const mapStateToProps = state => ({
  isSubAccountsLoading: getSubAccountsLoading(state),
})

const mapDispatchToProps = {
  addSubAccount,
  updateSubAccount,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(SubAccount)
