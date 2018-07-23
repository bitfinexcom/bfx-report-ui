import React, { Fragment } from 'react'
import { injectIntl } from 'react-intl'
import {
  FormGroup,
  InputGroup,
} from '@blueprintjs/core'
import { inputKeyPropTypes, inputKeyDefaultProps } from './Auth.props'

export const InputKey = ({
  intl, label, onChange, name, placeholder, value,
}) => (
  <Fragment>
    <FormGroup
      label={intl.formatMessage({ id: label })}
      labelFor={name}
      labelInfo={intl.formatMessage({ id: 'auth.required' })}
    />
    <InputGroup
      id={name}
      type='text'
      name={name}
      placeholder={intl.formatMessage({ id: placeholder })}
      value={value}
      onChange={onChange}
    />
    <br />
  </Fragment>
)

InputKey.propTypes = inputKeyPropTypes
InputKey.defaultProps = inputKeyDefaultProps

export default injectIntl(InputKey)
