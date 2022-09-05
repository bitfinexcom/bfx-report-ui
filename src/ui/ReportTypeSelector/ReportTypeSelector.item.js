import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'
import Tooltip from 'ui/Tooltip'

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
        placement='top'
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
}

export default withTranslation('translations')(ReportTypeItem)
