import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import { fixedFloat } from 'ui/utils'
import WalletsData from 'components/Wallets/Wallets.data'

import { propTypes, defaultProps } from './WalletsSnapshot.props'

class WalletsSnapshot extends PureComponent {
  render() {
    const {
      entries,
      t,
      totalBalanceUsd,
    } = this.props

    return (
      <Fragment>
        {_isNumber(totalBalanceUsd) && (
          <div className='total-stats'>
            <div className='total-stats-item'>
              <div className='color--active'>
                {t('column.walletsTotal')}
              </div>
              <span>{fixedFloat(totalBalanceUsd)}</span>
            </div>
          </div>
        ) }

        <WalletsData entries={entries} />
      </Fragment>
    )
  }
}

WalletsSnapshot.propTypes = propTypes
WalletsSnapshot.defaultProps = defaultProps

export default withTranslation('translations')(WalletsSnapshot)
