import React, { memo } from 'react'
import PropTypes from 'prop-types'

import InputKey from '../InputKey'
import ErrorLabel from '../ErrorLabel'

export const DeleteAccount = ({
  onChange,
  password,
  passwordError,
  passwordLabel,
  passwordRepeat,
  passwordRepeatLabel,
  passwordRepeatError,
}) => (
  <>
    <InputKey
      name='password'
      value={password}
      onChange={onChange}
      label={passwordLabel}
    />
    <ErrorLabel text={passwordError} />
    <InputKey
      onChange={onChange}
      name='passwordRepeat'
      value={passwordRepeat}
      label={passwordRepeatLabel}
    />
    <ErrorLabel text={passwordRepeatError} />
  </>
)

DeleteAccount.propTypes = {
  onChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
  passwordLabel: PropTypes.string.isRequired,
  passwordRepeat: PropTypes.string.isRequired,
  passwordRepeatLabel: PropTypes.string.isRequired,
  passwordRepeatError: PropTypes.string.isRequired,
}

export default memo(DeleteAccount)
