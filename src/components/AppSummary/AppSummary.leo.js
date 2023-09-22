import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import Icon from 'icons'
import { fixedFloat } from 'ui/utils'

const AccountSummaryLeo = ({ data, isLoading }) => {
  const { t } = useTranslation()
  const { leoLev = 0, leoAmountAvg = 0 } = data
  const formattedLeoAmount = fixedFloat(leoAmountAvg)

  return (
    <>
      {!isLoading && (
        <div className='leo-level'>
          <div className='leo-level--row'>
            <div className='leo-level--title'>
              <Icon.LEO />
              {`${t('summary.leo_level')} ${leoLev}`}
            </div>
          </div>
          <div className='leo-level--sub-title'>
            {`${t('summary.avg_amount')} ${formattedLeoAmount}`}
          </div>
        </div>
      )
    }
    </>
  )
}

AccountSummaryLeo.propTypes = {
  data: PropTypes.shape({
    leoLev: PropTypes.number,
    leoAmountAvg: PropTypes.number,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default memo(AccountSummaryLeo)
