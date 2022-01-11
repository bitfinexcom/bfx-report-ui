import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import NavSwitcher from 'ui/NavSwitcher/NavSwitcher'

import { AUTH_TYPES } from '../Auth'

const AuthTypeSelector = ({ authType, t, switchAuthType }) => {
  const { SIMPLE_ACCOUNTS, MULTIPLE_ACCOUNTS } = AUTH_TYPES

  return (
    <div className='auth-type-selector'>
      <NavSwitcher
        items={[
          { value: SIMPLE_ACCOUNTS, label: t('auth.simpleAccounts') },
          { value: MULTIPLE_ACCOUNTS, label: t('auth.multipleAccounts') },
        ]}
        onChange={switchAuthType}
        value={authType}
      />
    </div>
  )
}

AuthTypeSelector.propTypes = {
  authType: PropTypes.string.isRequired,
  switchAuthType: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(AuthTypeSelector)
