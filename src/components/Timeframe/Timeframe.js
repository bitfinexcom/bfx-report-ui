import React from 'react'
// import PropTypes from 'prop-types'
import {
  Card,
  Elevation,
} from '@blueprintjs/core'

function Timeframe() {
  return (
    <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      <h5>Timeframe</h5>
      <p>
        Last 24 hours | Yesterday |
        Last 2 weeks | Month to date |
        Past month | Past 3 months |
        Custom (max range 3 months)
      </p>
      <div>View | Download</div>
    </Card>
  )
}

export default Timeframe
