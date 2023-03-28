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
  placeholder,
}) => {
  const { t } = useTranslation()
  return (
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
}

InputKey.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
}

InputKey.defaultProps = {
  name: '',
  value: '',
  label: '',
  placeholder: '',
  type: 'password',
  onChange: () => {},
}

export default memo(InputKey)
