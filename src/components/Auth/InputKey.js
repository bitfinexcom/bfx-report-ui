import React from 'react'
import { injectIntl } from 'react-intl'
import { Label } from '@blueprintjs/core'
import { inputKeyPropTypes, inputKeyDefaultProps } from './Auth.props'

export const InputKey = ({
  intl, label, onChange, name, placeholder, value,
}) => (
  <p>
    <Label text={intl.formatMessage({ id: label })} />
    <input
      type='text'
      required
      minLength='10'
      className='pt-input'
      dir='auto'
      name={name}
      placeholder={intl.formatMessage({ id: placeholder })}
      value={value}
      onChange={onChange}
    />
  </p>
)

InputKey.propTypes = inputKeyPropTypes
InputKey.defaultProps = inputKeyDefaultProps

export default injectIntl(InputKey)
