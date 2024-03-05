import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import { fixedFloat } from 'ui/utils'
import WalletsData from 'components/Wallets/Wallets.data'

import { propTypes, defaultProps } from './WalletsSnapshot.props'

const WalletsSnapshot = ({
  entries,
  isLoading,
  totalBalanceUsd,
}) => {
  const { t } = useTranslation()
  return (
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
      <WalletsData
        entries={entries}
        isLoading={isLoading}
      />
    </>
  )
}

WalletsSnapshot.propTypes = propTypes
WalletsSnapshot.defaultProps = defaultProps

export default memo(WalletsSnapshot)
