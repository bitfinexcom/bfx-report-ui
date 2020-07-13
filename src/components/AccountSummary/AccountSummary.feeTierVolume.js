import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import _get from 'lodash/get'

import DataTable from 'ui/DataTable'

import { getColumns } from './AccountSummary.marginFunds'

const AccountSummaryFeeTierVolume = (props) => {
  const { data, t } = props
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(AccountSummaryFeeTierVolume)
