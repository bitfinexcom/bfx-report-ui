import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  FormGroup,
  InputGroup,
} from '@blueprintjs/core'

export const InputKey = ({
  name,
  type,
  label,
  value,
  onChange,
  disabled,
  placeholder,
}) => {
  const { t } = useTranslation()
  return (
    <div className='bitfinex-auth-form-input'>
      <FormGroup
        label={label ? t(label) : ''}
        labelFor={name}
      />
      <InputGroup
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder && t(placeholder)}
      />
    </div>
  )
}

InputKey.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

InputKey.defaultProps = {
  name: '',
  value: '',
  label: '',
  placeholder: '',
  disabled: false,
  type: 'password',
  onChange: () => {},
}

export default memo(InputKey)
