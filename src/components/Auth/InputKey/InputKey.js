import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import {
  FormGroup,
  InputGroup,
} from '@blueprintjs/core'

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
      name={name}
      value={value}
      type='password'
      onChange={onChange}
      placeholder={placeholder && t(placeholder)}
    />
  </div>
)

InputKey.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  t: PropTypes.func.isRequired,
}

InputKey.defaultProps = {
  name: '',
  value: '',
  label: '',
  placeholder: '',
  onChange: () => {},
}

export default withTranslation('translations')(memo(InputKey))
