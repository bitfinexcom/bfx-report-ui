import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'

import DataTable from 'ui/DataTable'

import { getColumns } from './AccountSummary.paidFees'

const AccountSummaryFeeTierVolume = ({ data, t }) => {
  const lastVolumeItem = _get(data, [data.length - 1], {})
  const { curr, vol_safe: amount } = lastVolumeItem

  const columns = getColumns({ data: [{ curr, amount }] })

  return (
    <div className='section-account-summary-data-item'>
      <div>{t('accountsummary.fee_tier_volume')}</div>
      <DataTable
        numRows={1}
        tableColumns={columns}
      />
    </div>
  )
}

AccountSummaryFeeTierVolume.propTypes = {
  t: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    curr: PropTypes.string,
  })).isRequired,
}

export default memo(AccountSummaryFeeTierVolume)
