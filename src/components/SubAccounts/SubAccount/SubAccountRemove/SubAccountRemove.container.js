import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { removeSubAccount } from 'state/subAccounts/actions'

import SubAccountRemove from './SubAccountRemove'

const mapDispatchToProps = {
  removeSubAccount,
}

export default compose(
  connect(null, mapDispatchToProps),
  withTranslation('translations'),
)(SubAccountRemove)
