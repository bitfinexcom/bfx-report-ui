import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'

import InputKey from '../InputKey'

export const LoginEmail = ({
  userName,
  onChange,
  onSignUp,
  userPassword,
}) => {
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event?.key === 'Enter') {
        event.preventDefault()
        onSignUp()
      }
    }
    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
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
}

LoginEmail.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userPassword: PropTypes.string.isRequired,
}

export default memo(LoginEmail)
