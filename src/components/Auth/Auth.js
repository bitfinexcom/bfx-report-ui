import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Callout,
  Card,
  Elevation,
  Icon,
  Intent,
  Label,
} from '@blueprintjs/core'
import { platform } from 'var/config'
import { propTypes, defaultProps } from './Auth.props'

class Auth extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

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
    const {
      apiKey, apiSecret, authStatus, intl, isShown,
    } = this.props
    let showValid = ''
    if (authStatus === true) {
      showValid = (<Icon iconSize={21} icon='tick' intent={Intent.SUCCESS} />)
    } else if (authStatus === false) {
      showValid = (<Icon iconSize={21} icon='cross' intent={Intent.DANGER} />)
    }

    return isShown ? (
      <div className='row'>
        <Card interactive elevation={Elevation.ZERO} className='bitfinex-auth col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6'>
          <h5>{intl.formatMessage({ id: 'auth.auth' })} {showValid}</h5>
          <Callout>Visit <a href={platform.KEY_URL} target='_blank' rel='noopener noreferrer'>{platform.KEY_URL}</a> to get the readonly API key and secret pair.</Callout>
          <br />
          <p><Label text={intl.formatMessage({ id: 'auth.enterAPIKey' })} />
            <input type='text' required minLength='10' className='pt-input' dir='auto' name='key' placeholder='API Key' value={apiKey} onChange={this.handleChange} />
          </p>
          <p><Label text={intl.formatMessage({ id: 'auth.enterAPISecret' })} />
            <input type='text' required minLength='10' className='pt-input' dir='auto' name='secret' placeholder='API Secret' value={apiSecret} onChange={this.handleChange} />
          </p>
          <p><Button name='check' intent={Intent.PRIMARY} onClick={this.handleClick}>{intl.formatMessage({ id: 'auth.checkAuth' })}</Button></p>
        </Card>
      </div>
    ) : ''
  }
}

export default injectIntl(Auth)
