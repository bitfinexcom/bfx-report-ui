import React, { Fragment } from 'react'
import Timeframe from 'components/Timeframe'
import Status from 'components/Status'
import { propTypes, defaultProps } from './Main.props'
import ContentContainer from './ContentContainer'

function Main(props) {
  return props.authStatus && !props.authIsShown ? (
    <Fragment>
      <div className='row'>
        <Status />
        <Timeframe />
      </div>
      <ContentContainer />
    </Fragment>
  ) : ''
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

export default Main
