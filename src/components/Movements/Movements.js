import React from 'react';
import PropTypes from 'prop-types'

export const Movements = props => (
  <div className='box movements'>
    <h5>Movements</h5>
    <div>{JSON.stringify(props.movements)}</div>
  </div>
)

Movements.propTypes = {
  movements: PropTypes.array.isRequired,
}

export default Movements;
