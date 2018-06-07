import React from 'react';
import PropTypes from 'prop-types'

export const Movements = props => (
  <div className='box movements'>
    <h5>Movements</h5>
    <div>{JSON.stringify(props.entries)}</div>
  </div>
)

Movements.propTypes = {
  entries: PropTypes.array.isRequired,
}

export default Movements;
