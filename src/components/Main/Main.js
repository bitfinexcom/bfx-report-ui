import React, { Fragment } from 'react'
import Status from 'components/Status'
import { propTypes, defaultProps } from './Main.props'
import ContentContainer from './ContentContainer'

function Main({ authStatus, authIsShown }) {
  return authStatus && !authIsShown ? (
    <Fragment>
      <div className='row'>
        <Status />
      </div>
      <ContentContainer />
    </Fragment>
  ) : ''
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

export default Main
