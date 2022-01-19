import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'
import _isEmpty from 'lodash/isEmpty'

import { propTypes, defaultProps } from './SubAccountRemove.props'

class SubAccountRemove extends PureComponent {
  removeSubAccount = () => {
    const { masterAccount, removeSubAccount } = this.props
    removeSubAccount(masterAccount)
  }

  render() {
    const { t, subUsers } = this.props

    return (
      <Button
        intent={Intent.PRIMARY}
        disabled={_isEmpty(subUsers)}
        onClick={this.removeSubAccount}
        className='section-sub-accounts-remove mt20'
      >
        {t('subaccounts.remove')}
      </Button>
    )
  }
}

SubAccountRemove.propTypes = propTypes
SubAccountRemove.defaultProps = defaultProps

export default withTranslation('translations')(SubAccountRemove)
