import React from 'react'
import PropTypes from 'prop-types'

export const Ledgers = props => (
  <div className='box ledgers'>
    <h5>Ledgers</h5>
    <div>{JSON.stringify(props.entries)}</div>
  </div>
)

Ledgers.propTypes = {
  entries: PropTypes.array.isRequired,
}

export default Ledgers
