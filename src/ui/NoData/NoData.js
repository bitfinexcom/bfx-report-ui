import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'

import Icon from 'icons'

const NoData = (props) => {
  const { refresh, t, title } = props

  return (
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
}

NoData.propTypes = {
  title: PropTypes.string,
  refresh: PropTypes.func,
  t: PropTypes.func.isRequired,
}

NoData.defaultProps = {
  title: null,
  refresh: () => {},
}

export default withTranslation('translations')(NoData)
