import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import {
  FormGroup,
  InputGroup,
} from '@blueprintjs/core'

import { inputKeyPropTypes, inputKeyDefaultProps } from './Auth.props'

export const InputKey = ({
  t, label, onChange, name, placeholder, value,
}) => (
  <Fragment>
    <FormGroup
      label={t(label)}
      labelFor={name}
    />
    <InputGroup
      id={name}
      type='password'
      name={name}
      placeholder={t(placeholder)}
      value={value}
      onChange={onChange}
    />
    <br />
  </Fragment>
)

InputKey.propTypes = inputKeyPropTypes
InputKey.defaultProps = inputKeyDefaultProps

export default withTranslation('translations')(InputKey)
