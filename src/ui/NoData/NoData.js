import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'

import Icon from 'icons'

const NoData = ({ refresh, t, title }) => (
  <div className='no-data'>
    <div className='no-data-wrapper'>
      <Icon.WARNING />
      <div>{t(title || 'nodata')}</div>
      {refresh && (
      <Button
        onClick={refresh}
        className='no-data-update button--large'
        intent={Intent.PRIMARY}
      >
        {t('update')}
      </Button>
      )}
    </div>
  </div>
)

NoData.propTypes = {
  refresh: PropTypes.func,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
}
NoData.defaultProps = {
  title: undefined,
  refresh: () => {},
}

export default withTranslation('translations')(memo(NoData))
