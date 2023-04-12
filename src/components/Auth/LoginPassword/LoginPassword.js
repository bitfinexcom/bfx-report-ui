import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import _split from 'lodash/split'

import config from 'config'
import InputKey from '../InputKey'

const { KEY_URL } = config

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
      label='auth.enterPassword'
      onChange={onChange}
    />
    <ErrorLabel text={passwordError} />
    <InputKey
      name='passwordRepeat'
      value={passwordRepeat}
      label='auth.repeatPassword'
      onChange={this.handleInputChange}
    />
    <ErrorLabel text={passwordRepeatError} />
  </>
)

LoginPassword.propTypes = {
  onChange: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
  apiSecret: PropTypes.string.isRequired,
}

export default memo(LoginPassword)
