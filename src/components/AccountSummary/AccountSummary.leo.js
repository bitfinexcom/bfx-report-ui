import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { fixedFloat, formatAmount } from 'ui/utils'

const getColumns = (props) => {
  const { leoLev, leoAmountAvg } = props

  const formattedLeoAmountAvg = fixedFloat(leoAmountAvg)

  return [
    {
      id: 'leo_level',
      name: 'accountsummary.leo_level',
      width: 100,
      renderer: () => (
        <Cell tooltip={leoLev}>
          {leoLev}
        </Cell>
      ),
      copyText: () => leoLev,
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
  const { leoLev, leoAmountAvg } = data

  const columns = getColumns({ leoLev, leoAmountAvg })

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
    leoLev: PropTypes.number.isRequired,
    leoAmountAvg: PropTypes.number.isRequired,
  }).isRequired,
}

export default withTranslation('translations')(AccountSummaryLeo)
