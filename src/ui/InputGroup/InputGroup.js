import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { InputGroup as BlueprintInputGroup } from '@blueprintjs/core'

export const InputGroup = ({
  label,
  name,
  type,
  value,
  onChange,
  onRemove,
  linkLabel,
  showRemoveLink,
}) => (
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

InputGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  linkLabel: PropTypes.string,
  showRemoveLink: PropTypes.bool,
}

InputGroup.defaultProps = {
  label: '',
  linkLabel: '',
  type: 'password',
  onRemove: () => {},
  showRemoveLink: false,
}

export default memo(InputGroup)
