import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { NonIdealState } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import SyncPrefButton from 'ui/SyncPrefButton'
import SyncSymbolPrefButton from 'ui/SyncSymbolPrefButton'

class SyncNotSetYet extends PureComponent {
  render() {
    const { t, acceptSymbol } = this.props
    return (
      <NonIdealState
        className='bitfinex-nonideal'
        icon={IconNames.ISSUE_NEW}
        title={t('preferences.sync.notset')}
        description={acceptSymbol ? t('preferences.sync.symbol-description') : t('preferences.sync.description')}
      >
        {acceptSymbol ? <SyncSymbolPrefButton textOnly /> : <SyncPrefButton textOnly />}
      </NonIdealState>
    )
  }
}

SyncNotSetYet.propTypes = {
  t: PropTypes.func.isRequired,
  acceptSymbol: PropTypes.bool,
}

SyncNotSetYet.defaultProps = {
  acceptSymbol: false,
}

export default withTranslation('translations')(SyncNotSetYet)
