import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'
import Tooltip from 'ui/Tooltip'

import constants from './constants'

const ReportTypeItem = ({
  t,
  type,
  showIcon,
}) => (
  <>
    <span>
      {t(`${type}.title`)}
    </span>
    {showIcon && (
      <Tooltip
        usePortal
        placement='bottom'
        targetClassName='report_type_icon'
        content={t(`${type}.description`)}
      >
        <Icon.INFO_CIRCLE />
      </Tooltip>
    )}
  </>

)

ReportTypeItem.propTypes = {
  t: PropTypes.func.isRequired,
  type: PropTypes.string,
  showIcon: PropTypes.bool,
}

ReportTypeItem.defaultProps = {
  showIcon: false,
  type: constants.WIN_LOSS,
}

export default withTranslation('translations')(memo(ReportTypeItem))
