import React, { memo } from 'react'
import PropTypes from 'prop-types'

import InputKey from '../InputKey'
import ErrorLabel from '../ErrorLabel'

export const LoginPassword = ({
  onChange,
  password,
  passwordError,
  passwordRepeat,
  passwordRepeatError,
}) => (
  <>
    <InputKey
      name='password'
      value={password}
      onChange={onChange}
      label='auth.enterPassword'
    />
    <ErrorLabel text={passwordError} />
    <InputKey
      onChange={onChange}
      name='passwordRepeat'
      value={passwordRepeat}
      label='auth.repeatPassword'
    />
    <ErrorLabel text={passwordRepeatError} />
  </>
)

LoginPassword.propTypes = {
  onChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
  passwordRepeat: PropTypes.string.isRequired,
  passwordRepeatError: PropTypes.string.isRequired,
}

export default memo(LoginPassword)
