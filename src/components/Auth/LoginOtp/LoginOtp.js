import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import useKeyDown from 'hooks/useKeyDown'
import { getIsAuthBtnDisabled } from 'state/auth/selectors'

import InputKey from '../InputKey'

export const LoginOtp = ({
  otp,
  handle2FACancel,
  handleInputChange,
  handleOneTimePassword,
}) => {
  const { t } = useTranslation()
  const isAuthBtnDisabled = useSelector(getIsAuthBtnDisabled)

  useKeyDown(() => {
    if (!isAuthBtnDisabled) {
      handleOneTimePassword()
    }
  }, ['Enter'])

  useEffect(() => {
    if (otp?.length === 6) {
      handleOneTimePassword()
    }
  }, [otp])

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
          className='bitfinex-auth-check'
          onClick={handleOneTimePassword}
          disabled={isEmpty(otp || isAuthBtnDisabled)}
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
