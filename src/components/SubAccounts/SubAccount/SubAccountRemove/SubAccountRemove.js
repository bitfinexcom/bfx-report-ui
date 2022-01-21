import React from 'react'
import PropTypes from 'prop-types'
import { Button, Intent } from '@blueprintjs/core'
import _isEmpty from 'lodash/isEmpty'

const SubAccountRemove = ({
  t,
  subUsers,
  masterAccount,
  removeSubAccount,
}) => {
  const onRemoveSubAccount = () => {
    removeSubAccount(masterAccount)
  }

  return (
    <Button
      intent={Intent.PRIMARY}
      disabled={_isEmpty(subUsers)}
      onClick={onRemoveSubAccount}
      className='section-sub-accounts-remove mt20'
    >
      {t('subaccounts.remove')}
    </Button>
  )
}

SubAccountRemove.propTypes = {
  t: PropTypes.func.isRequired,
  masterAccount: PropTypes.string,
  removeSubAccount: PropTypes.func.isRequired,
  subUsers: PropTypes.arrayOf(PropTypes.object),
}
SubAccountRemove.defaultProps = {
  subUsers: [],
  masterAccount: undefined,
}

export default SubAccountRemove
