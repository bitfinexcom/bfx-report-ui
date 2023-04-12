import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import _split from 'lodash/split'

import config from 'config'
import InputKey from '../InputKey'

const { KEY_URL } = config

export const LoginApiKey = ({
  apiKey,
  onChange,
  apiSecret,
}) => {
  const { t } = useTranslation()
  return (
    <>
      <div className='api-key-note'>
        {t('auth.note1')}
        <a
          href={KEY_URL}
          target='_blank'
          rel='noopener noreferrer'
        >
          {_split(KEY_URL, 'https://')[1]}
        </a>
        {t('auth.note2')}
      </div>
      <InputKey
        name='apiKey'
        value={apiKey}
        label='auth.enterAPIKey'
        onChange={onChange}
      />
      <InputKey
        name='apiSecret'
        value={apiSecret}
        label='auth.enterAPISecret'
        onChange={onChange}
      />
    </>
  )
}

LoginApiKey.propTypes = {
  onChange: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
  apiSecret: PropTypes.string.isRequired,
}

export default memo(LoginApiKey)
