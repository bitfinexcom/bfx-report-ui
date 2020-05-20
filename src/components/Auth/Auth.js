import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Callout,
  Classes,
  Dialog,
  Intent,
  NonIdealState,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import Icon from 'icons'
import PlatformLogo from 'ui/PlatformLogo'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './Auth.props'
import InputKey from './InputKey'

class Auth extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  handleClick = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.checkAuth()
  }

  handleChange = (event) => {
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
      <div className='row bitfinex-auth'>
        <Dialog
          title={t('auth.title')}
          isOpen
          icon={<Icon.SIGN_IN />}
          isCloseButtonShown={false}
          usePortal={false}
        >
          <div className={Classes.DIALOG_BODY}>
            <PlatformLogo />
            <Callout>
              {t('auth.note1')}
              <a href={platform.KEY_URL} target='_blank' rel='noopener noreferrer'>
                {platform.KEY_URL.split('https://')[1]}
              </a>
              {t('auth.note2')}
            </Callout>
            <InputKey
              label='auth.enterAPIKey'
              name='key'
              value={apiKey}
              onChange={this.handleChange}
            />
            <InputKey
              label='auth.enterAPISecret'
              name='secret'
              value={apiSecret}
              onChange={this.handleChange}
            />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button
                className='bitfinex-auth-check'
                name='check'
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
        icon={IconNames.KEY}
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

export default withTranslation('translations')(Auth)
