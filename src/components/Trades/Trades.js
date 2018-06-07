import React from 'react';
import PropTypes from 'prop-types'

export const Trades = props => (
  <div className='box trades'>
    <h5>Trades</h5>
    <div>{JSON.stringify(props.entries)}</div>
  </div>
)

Trades.propTypes = {
  entries: PropTypes.array.isRequired,
}

export default Trades;
