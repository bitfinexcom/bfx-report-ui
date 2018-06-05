import React from 'react'
import PropTypes from 'prop-types'

export const Ledgers = props => (
  <div className='box ledgers'>
    <h5>Ledgers</h5>
    <div>{JSON.stringify(props.balances)}</div>
  </div>
)

Ledgers.propTypes = {
  balances: PropTypes.array.isRequired,
}

export default Ledgers
