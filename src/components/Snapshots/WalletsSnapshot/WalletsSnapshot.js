import React, { memo } from 'react'
import compose from 'lodash/fp/compose'
import { withTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import { fixedFloat } from 'ui/utils'
import WalletsData from 'components/Wallets/Wallets.data'

import { propTypes, defaultProps } from './WalletsSnapshot.props'

const WalletsSnapshot = ({
  t,
  entries,
  totalBalanceUsd,
}) => (
  <>
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
  </>
)

WalletsSnapshot.propTypes = propTypes
WalletsSnapshot.defaultProps = defaultProps

export default compose(
  withTranslation('translations'),
  memo,
)(WalletsSnapshot)
