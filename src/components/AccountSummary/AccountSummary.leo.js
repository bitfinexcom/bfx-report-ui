import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { fixedFloat, formatAmount } from 'ui/utils'

const getColumns = (props) => {
  const { leoLevel, leoAmountAvg } = props

  const formattedLeoAmountAvg = fixedFloat(leoAmountAvg)

  return [
    {
      id: 'leo_level',
      name: 'accountsummary.leo_level',
      width: 100,
      renderer: () => (
        <Cell tooltip={leoLevel}>
          {leoLevel}
        </Cell>
      ),
      copyText: () => leoLevel,
    },
    {
      id: 'leo_average_amount',
      name: 'accountsummary.average_amount',
      width: 120,
      renderer: () => (
        <Cell tooltip={formattedLeoAmountAvg}>
          {formatAmount(formattedLeoAmountAvg)}
        </Cell>
      ),
      copyText: () => leoAmountAvg,
    },
  ]
}

const AccountSummaryLeo = (props) => {
  const { data } = props
  const { leo_lev: leoLevel, leo_amount_avg: leoAmountAvg } = data

  const columns = getColumns({ leoLevel, leoAmountAvg })

  return (
    <div className='section-account-summary-data-item'>
      <DataTable
        numRows={1}
        tableColumns={columns}
      />
    </div>
  )
}

AccountSummaryLeo.propTypes = {
  data: PropTypes.shape({
    leo_lev: PropTypes.number.isRequired,
    leo_amount_avg: PropTypes.number.isRequired,
  }).isRequired,
}

export default withTranslation('translations')(AccountSummaryLeo)
