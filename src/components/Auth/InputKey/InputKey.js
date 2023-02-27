import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import {
  FormGroup,
  InputGroup,
} from '@blueprintjs/core'

export const InputKey = ({
  t, label, onChange, name, placeholder, value, type,
}) => (
  <div className='bitfinex-auth-form-input'>
    <FormGroup
      label={t(label)}
      labelFor={name}
    />
    <InputGroup
      id={name}
      name={name}
      type={type}
      value={value}
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
  type: PropTypes.string,
  t: PropTypes.func.isRequired,
}

InputKey.defaultProps = {
  name: '',
  value: '',
  label: '',
  placeholder: '',
  type: 'password',
  onChange: () => {},
}

export default withTranslation('translations')(memo(InputKey))
