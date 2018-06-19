import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import {
  Button,
  Card,
  Elevation,
  Icon,
  Intent,
  Label,
} from '@blueprintjs/core'
import { platform } from 'var/config'

class Auth extends PureComponent {
  static propTypes = {
    authStatus: PropTypes.bool,
    apiKey: PropTypes.string,
    apiSecret: PropTypes.string,
    checkAuth: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    isShown: PropTypes.bool.isRequired,
    setKey: PropTypes.func.isRequired,
    setSecret: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick() {
    this.props.checkAuth()
  }

  handleChange(event) {
    if (event.target.name === 'key') {
      this.props.setKey(event.target.value)
    } else if (event.target.name === 'secret') {
      this.props.setSecret(event.target.value)
    }
  }

  render() {
    const { intl } = this.props
    let showValid = ''
    if (this.props.authStatus === true) {
      showValid = (<Icon iconSize={21} icon='tick' intent={Intent.SUCCESS} />)
    } else if (this.props.authStatus === false) {
      showValid = (<Icon iconSize={21} icon='cross' intent={Intent.DANGER} />)
    }

    return this.props.isShown ? (
      <div className='row'>
        <Card interactive elevation={Elevation.ZERO} className='bitfinex-auth col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6'>
          <h5>{intl.formatMessage({ id: 'Auth' })} {showValid}</h5>
          <blockquote>Visit <a href={platform.KEY_URL} target='_blank' rel='noopener noreferrer'>{platform.KEY_URL}</a> to get the readonly API key and secret pair.</blockquote>
          <p><Label text={intl.formatMessage({ id: 'EnterAPIKey' })} />
            <input type='text' required minLength='10' className='pt-input' dir='auto' name='key' placeholder='API Key' value={this.props.apiKey} onChange={this.handleChange} />
          </p>
          <p><Label text={intl.formatMessage({ id: 'EnterAPISecret' })} />
            <input type='text' required minLength='10' className='pt-input' dir='auto' name='secret' placeholder='API Secret' value={this.props.apiSecret} onChange={this.handleChange} />
          </p>
          <p><Button name='check' intent={Intent.PRIMARY} onClick={this.handleClick}>{intl.formatMessage({ id: 'CheckAuth' })}</Button></p>
        </Card>
      </div>
    ) : ''
  }
}

export default injectIntl(Auth)
