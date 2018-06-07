import React from 'react';
import PropTypes from 'prop-types'

export const Orders = props => (
  <div className='box orders'>
    <h5>Orders</h5>
    <div>{JSON.stringify(props.entries)}</div>
  </div>
)

Orders.propTypes = {
  entries: PropTypes.array.isRequired,
}

export default Orders;
