import React, { PureComponent, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import {
  Button,
  Callout,
  Classes,
  Dialog,
  Intent,
  NonIdealState,
} from '@blueprintjs/core'

import { platform } from 'var/config'
// eslint-disable-next-line import/no-unresolved
import darkLogo from 'components/Header/logo3-dark-theme.svg'
import lightLogo from 'components/Header//logo3-light-theme.svg'

import { propTypes, defaultProps } from './Auth.props'
import InputKey from './InputKey'

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
      isShown,
      loading,
      t,
    } = this.props
    const renderAuth = platform.showAuthPage ? (
      <div className='row'>
        <Dialog
          title={t('auth.title')}
          isOpen
          isCloseButtonShown={false}
        >
          <div className={`${Classes.DIALOG_BODY} bitfinex-auth`}>
            <img
              alt={platform.Name}
              src={darkLogo}
              className='bitfinex-logo-dark'
            />
            <img
              alt={platform.Name}
              src={lightLogo}
              className='bitfinex-logo-light'
            />
            <Callout>
              {t('auth.note1')}
              <a href={platform.KEY_URL} target='_blank' rel='noopener noreferrer'>
                {platform.KEY_URL}
              </a>
              {t('auth.note2')}
            </Callout>
            <InputKey
              label='auth.enterAPIKey'
              name='key'
              placeholder='auth.enterAPIKey'
              value={apiKey}
              onChange={this.handleChange}
            />
            <InputKey
              label='auth.enterAPISecret'
              name='secret'
              placeholder='auth.enterAPISecret'
              value={apiSecret}
              onChange={this.handleChange}
            />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button
                name='check'
                icon='key'
                intent={Intent.SUCCESS}
                onClick={this.handleClick}
                disabled={!apiKey || !apiSecret || loading}
                loading={loading}
              >
                {t('auth.checkAuth')}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    ) : (
      <NonIdealState
        className='bitfinex-nonideal'
        icon='key'
        title={t('auth.nonideal.title')}
        description={t('auth.nonideal.description')}
      />
    )
    return isShown ? (
      <Fragment>
        {renderAuth}
      </Fragment>
    ) : null
  }
}

export default withNamespaces('translations')(Auth)
