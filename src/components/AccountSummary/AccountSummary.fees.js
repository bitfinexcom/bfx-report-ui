import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { fixedFloat } from 'ui/utils'

const getColumns = (props) => {
  const { makerFee, takerFee } = props
  const formattedMakerFee = `${fixedFloat(makerFee * 100, 2)}%`
  const formattedTakerFee = `${fixedFloat(takerFee * 100, 2)}%`

  return [
    {
      id: 'makerFee',
      name: makerFee > 0 ? 'column.maker_fees' : 'column.maker_rebate',
      width: 185,
      renderer: () => (
        <Cell tooltip={formattedMakerFee}>
          {formattedMakerFee}
        </Cell>
      ),
      copyText: () => formattedMakerFee,
    },
    {
      id: 'takerFee',
      name: takerFee > 0 ? 'column.taker_fees' : 'column.taker_rebate',
      width: 185,
      renderer: () => (
        <Cell tooltip={formattedTakerFee}>
          {formattedTakerFee}
        </Cell>
      ),
      copyText: () => formattedTakerFee,
    },
  ]
}

const AccountSummaryFees = (props) => {
  const {
    title,
    makerFee,
    takerFee,
    t,
  } = props

  const columns = getColumns({ makerFee, takerFee })

  return (
    <Fragment>
      <h4>{t(title)}</h4>
      <DataTable
        numRows={1}
        tableColumns={columns}
      />
    </Fragment>
  )
}

AccountSummaryFees.propTypes = {
  title: PropTypes.string.isRequired,
  makerFee: PropTypes.number.isRequired,
  takerFee: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(AccountSummaryFees)
