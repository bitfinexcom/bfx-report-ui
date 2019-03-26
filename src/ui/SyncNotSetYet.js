import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { NonIdealState } from '@blueprintjs/core'

import SyncPrefButton from 'ui/SyncPrefButton'

class SyncNotSetYet extends PureComponent {
  render() {
    const { t } = this.props
    return (
      <NonIdealState
        className='bitfinex-nonideal'
        icon='issue-new'
        title={t('preferences.sync.notset')}
        description={t('preferences.sync.description')}
      >
        <SyncPrefButton textOnly />
      </NonIdealState>
    )
  }
}

SyncNotSetYet.propTypes = {
  t: PropTypes.func.isRequired,
}
SyncNotSetYet.defaultProps = {}

export default withTranslation('translations')(SyncNotSetYet)
