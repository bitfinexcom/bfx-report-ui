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
    linkLabel,
    onRemove,
    showRemoveLink,
  } = props


  return (
    <div className='input-group'>
      {label && !showRemoveLink && (
        <div className='input-group-label'>{label}</div>
      )}
      {label && showRemoveLink && (
        <div className='account-title'>
          <div className='account-title--label'>
            {label}
          </div>
          <div
            onClick={() => onRemove()}
            className='account-title--remove'
          >
            {linkLabel}
          </div>
        </div>
      )}
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
