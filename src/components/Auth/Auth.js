import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  Elevation,
  Intent,
  Label,
} from '@blueprintjs/core'

class Auth extends PureComponent {
  static propTypes = {
    checkAuth: PropTypes.func.isRequired,
    isValid: PropTypes.bool,
    setKey: PropTypes.func.isRequired,
    setSecret: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(event) {
    if (event.target.name === 'check') {
      this.props.checkAuth();
    }
  }

  handleChange(event) {
    if (event.target.name === 'key') {
      this.props.setKey(event.target.value)
    } else if (event.target.name === 'secret') {
      this.props.setSecret(event.target.value)
    }
  }

  render() {
    let showValid = '';
    if (this.props.isValid === true) {
      showValid = (<blockquote>Auth Success</blockquote>);
    } else if (this.props.isValid === false) {
      showValid = (<blockquote>Auth Fail</blockquote>);
    }

    return (
      <div className='row'>
        <Card interactive elevation={Elevation.ZERO} className='bitfinex-auth col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4 '>
          <h5>Auth</h5>
          <blockquote>Visit <a href='https://dev-prdn.bitfinex.com:2998/api'>https://dev-prdn.bitfinex.com:2998/api</a> to get your readonly API key and secret.</blockquote>
          <p><Label text='Enter your API Key:' />
            <input type='text' required minLength='10' className='pt-input' dir='auto' name='key' placeholder='API Key' onChange={this.handleChange} />
          </p>
          <p><Label text='Enter your API Secret:' />
            <input type='text' required minLength='10' className='pt-input' dir='auto' name='secret' placeholder='API Secret' onChange={this.handleChange} />
          </p>
          <p><Button name='check' intent={Intent.PRIMARY} onClick={this.handleClick}>CheckAuth</Button></p>
          {showValid}
        </Card>
      </div>
    )
  }
}

export default Auth
