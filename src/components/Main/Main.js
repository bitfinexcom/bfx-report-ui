import React from 'react'
import { propTypes, defaultProps } from './Main.props'
import ContentContainer from './ContentContainer'

function Main(props) {
  return props.authStatus && !props.authIsShown ? (<ContentContainer />) : ''
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

export default Main
