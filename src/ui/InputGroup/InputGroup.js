import React from 'react'
import { InputGroup as BlueprintInputGroup } from '@blueprintjs/core'

import { propTypes, defaultProps } from './InputGroup.props'

export const InputGroup = (props) => {
  const {
    label,
    name,
    onChange,
    type,
    value,
  } = props

  return (
    <div className='input-group'>
      {label && <div className='input-group-label'>{label}</div>}
      <BlueprintInputGroup
        id={name}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />
    </div>
  )
}

InputGroup.propTypes = propTypes
InputGroup.defaultProps = defaultProps

export default InputGroup
