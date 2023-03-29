import React, { memo } from 'react'
import PropTypes from 'prop-types'

import InputKey from '../InputKey'

export const LoginEmail = ({
  userName,
  onChange,
  userPassword,
}) => (
  <>
    <InputKey
      type='text'
      name='userName'
      value={userName}
      onChange={onChange}
      label='auth.loginEmail.emailOrUserName'
    />
    <InputKey
      name='userPassword'
      value={userPassword}
      onChange={onChange}
      label='auth.loginEmail.bfxAccPassword'
    />
  </>
)

LoginEmail.propTypes = {
  onChange: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userPassword: PropTypes.string.isRequired,
}

export default memo(LoginEmail)
