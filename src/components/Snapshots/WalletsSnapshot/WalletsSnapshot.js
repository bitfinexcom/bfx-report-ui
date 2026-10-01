import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import { fixedFloat } from 'ui/utils'
import WalletsData from 'components/Wallets/Wallets.data'

const WALLETS_ENTRIES_PROPS = PropTypes.shape({
  balanceUsd: PropTypes.number,
  type: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
})

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

WalletsSnapshot.propTypes = {
  totalBalanceUsd: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  entries: PropTypes.arrayOf(WALLETS_ENTRIES_PROPS).isRequired,
}

WalletsSnapshot.defaultProps = {
  totalBalanceUsd: null,
}

export default memo(WalletsSnapshot)
