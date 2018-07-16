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
    // eslint-disable-next-line react/destructuring-assignment
    this.props.checkAuth()
  }

  handleChange(event) {
    const { setKey, setSecret } = this.props
    const { name, value } = event.target
    if (name === 'key') {
      setKey(value)
    } else if (name === 'secret') {
      setSecret(value)
    }
  }

  render() {
    const {
      apiKey,
      apiSecret,
      authStatus,
      intl,
      isShown,
    } = this.props
    let showValid = ''
    if (authStatus === true) {
      showValid = (<Icon iconSize={21} icon='tick' intent={Intent.SUCCESS} />)
    } else if (authStatus === false) {
      showValid = (<Icon iconSize={21} icon='cross' intent={Intent.DANGER} />)
    }

    const classNames = [
      'bitfinex-auth',
      'col-xs-12',
      'col-sm-offset-1',
      'col-sm-10',
      'col-md-offset-2',
      'col-md-8',
      'col-lg-offset-3',
      'col-lg-6',
    ]

    return isShown ? (
      <div className='row'>
        <Card
          className={classNames.join(' ')}
          elevation={Elevation.ZERO}
          interactive
        >
          <h5>
            {intl.formatMessage({ id: 'auth.auth' })}
            &nbsp;
            {showValid}
          </h5>
          <Callout>
            {intl.formatMessage({ id: 'auth.auth.note1' })}
            <a href={platform.KEY_URL} target='_blank' rel='noopener noreferrer'>
              {platform.KEY_URL}
            </a>
            {intl.formatMessage({ id: 'auth.auth.note2' })}
          </Callout>
          <br />
          <p>
            <Label text={intl.formatMessage({ id: 'auth.enterAPIKey' })} />
            <input
              type='text'
              required
              minLength='10'
              className='pt-input'
              dir='auto'
              name='key'
              placeholder={intl.formatMessage({ id: 'auth.enterAPIKey' })}
              value={apiKey}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <Label text={intl.formatMessage({ id: 'auth.enterAPISecret' })} />
            <input
              type='text'
              required
              minLength='10'
              className='pt-input'
              dir='auto'
              name='secret'
              placeholder={intl.formatMessage({ id: 'auth.enterAPISecret' })}
              value={apiSecret}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <Button name='check' intent={Intent.PRIMARY} onClick={this.handleClick}>
              {intl.formatMessage({ id: 'auth.checkAuth' })}
            </Button>
          </p>
        </Card>
      </div>
    ) : ''
  }
}

export default injectIntl(Auth)
