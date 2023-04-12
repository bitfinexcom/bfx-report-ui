import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Callout } from '@blueprintjs/core'

import config from 'config'
import InputKey from '../InputKey'

export const LoginApiKey = ({
  apiKey,
  apiSecret,
  handleInputChange,
}) => {
  const { t } = useTranslation()
  return (
    <>
      <Callout>
        {t('auth.note1')}
        <a href={config.KEY_URL} target='_blank' rel='noopener noreferrer'>
          {config.KEY_URL.split('https://')[1]}
        </a>
        {t('auth.note2')}
      </Callout>
      <InputKey
        name='apiKey'
        value={apiKey}
        label='auth.enterAPIKey'
        onChange={handleInputChange}
      />
      <InputKey
        name='apiSecret'
        value={apiSecret}
        label='auth.enterAPISecret'
        onChange={handleInputChange}
      />
    </>
  )
}

LoginApiKey.propTypes = {
  apiKey: PropTypes.string.isRequired,
  apiSecret: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default memo(LoginApiKey)
