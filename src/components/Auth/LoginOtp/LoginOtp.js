import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'
import _isEmpty from 'lodash/isEmpty'

import InputKey from '../InputKey'

export const LoginOtp = ({
  otp,
  handle2FACancel,
  handleInputChange,
  handleOneTimePassword,
}) => {
  const { t } = useTranslation()
  return (
    <div className='sign-in--otp'>
      <InputKey
        name='otp'
        type='text'
        value={otp}
        label='auth.2FA.GAToken'
        onChange={handleInputChange}
        placeholder={t('auth.2FA.sixDigits')}
      />
      <div className='buttons-row'>
        <Button
          name='cancel'
          intent={Intent.NONE}
          onClick={handle2FACancel}
          className='bitfinex-auth-check'
        >
          {t('auth.2FA.cancel')}
        </Button>
        <Button
          name='auth'
          intent={Intent.SUCCESS}
          disabled={_isEmpty(otp)}
          className='bitfinex-auth-check'
          onClick={handleOneTimePassword}
        >
          {t('auth.2FA.auth')}
        </Button>
      </div>
    </div>
  )
}

LoginOtp.propTypes = {
  otp: PropTypes.string.isRequired,
  handle2FACancel: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleOneTimePassword: PropTypes.func.isRequired,
}

export default memo(LoginOtp)
