import React from 'react';
import PropTypes from 'prop-types'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'

export const Trades = props => (
  <Card interactive={true} elevation={Elevation.ZERO} className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
    <h5>Trades</h5>
    <div>{JSON.stringify(props.entries)}</div>
  </Card>
)

Trades.propTypes = {
  entries: PropTypes.array.isRequired,
}

export default Trades;
