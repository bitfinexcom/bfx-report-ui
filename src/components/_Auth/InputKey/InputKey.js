import React from 'react'
import { withTranslation } from 'react-i18next'
import {
  FormGroup,
  InputGroup,
} from '@blueprintjs/core'

import { propTypes, defaultProps } from './InputKey.props'

export const InputKey = ({
  t, label, onChange, name, placeholder, value,
}) => (
  <div className='bitfinex-auth-form-input'>
    <FormGroup
      label={t(label)}
      labelFor={name}
    />
    <InputGroup
      id={name}
      type='password'
      name={name}
      placeholder={placeholder && t(placeholder)}
      value={value}
      onChange={onChange}
    />
  </div>
)

InputKey.propTypes = propTypes
InputKey.defaultProps = defaultProps

export default withTranslation('translations')(InputKey)
