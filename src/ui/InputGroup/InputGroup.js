import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { InputGroup as BlueprintInputGroup } from '@blueprintjs/core'

export const InputGroup = ({
  name,
  type,
  label,
  value,
  onChange,
}) => (
  <div className='input-group'>
    {label && <div className='input-group-label'>{label}</div>}
    <BlueprintInputGroup
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
)

InputGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
}

InputGroup.defaultProps = {
  label: '',
  type: 'password',
}

export default memo(InputGroup)
