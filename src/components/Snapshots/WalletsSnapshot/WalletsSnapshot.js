import React, { memo } from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/fp/compose'
import { withTranslation } from 'react-i18next'
import _isNumber from 'lodash/isNumber'

import { fixedFloat } from 'ui/utils'
import WalletsData from 'components/Wallets/Wallets.data'

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

WalletsSnapshot.propTypes = {
  totalBalanceUsd: PropTypes.number,
  entries: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
    balance: PropTypes.number,
    unsettledInterest: PropTypes.number,
    balanceAvailable: PropTypes.number,
  })),
  t: PropTypes.func.isRequired,
}

WalletsSnapshot.defaultProps = {
  totalBalanceUsd: null,
  entries: [],
}

export default compose(
  withTranslation('translations'),
  memo,
)(WalletsSnapshot)
