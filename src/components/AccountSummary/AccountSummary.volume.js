import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Cell } from '@blueprintjs/table'

import DataTable from 'ui/DataTable'
import { fixedFloat } from 'ui/utils'
import { COLUMN_WIDTHS } from 'utils/columns'

const getColumns = (props) => {
  const { data } = props

  return [
    {
      id: 'currency',
      name: 'column.currency',
      width: 250,
      renderer: (rowIndex) => {
        const { curr } = data[rowIndex]
        return (
          <Cell tooltip={curr}>
            {curr}
          </Cell>
        )
      },
      copyText: rowIndex => data[rowIndex].curr,
    },
    {
      id: 'volume',
      name: 'column.volume',
      width: COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { vol } = data[rowIndex]
        const fixedVolume = fixedFloat(vol)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedVolume}
          >
            {fixedVolume}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(data[rowIndex].vol),
    },
  ]
}

const AccountSummaryVolume = (props) => {
  const { data, t } = props

  if (!data.length) {
    return null
  }

  const columns = getColumns({ data })

  return (
    <Fragment>
      <h4>{t('accountsummary.30dVolume')}</h4>
      <DataTable
        numRows={data.length}
        tableColumns={columns}
      />
    </Fragment>
  )
}

const VOLUME_ENTRIES_PROPS = PropTypes.shape({
  curr: PropTypes.string.isRequired,
  vol: PropTypes.number.isRequired,
})

AccountSummaryVolume.propTypes = {
  data: PropTypes.arrayOf(VOLUME_ENTRIES_PROPS).isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(AccountSummaryVolume)
