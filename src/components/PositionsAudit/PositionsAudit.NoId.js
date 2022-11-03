import React, { memo } from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/fp/compose'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { IconNames } from '@blueprintjs/icons'
import { Button, Intent, NonIdealState } from '@blueprintjs/core'

import { getPath } from 'state/query/utils'
import queryConstants from 'state/query/constants'

const PositionsAuditNoId = ({ t, history }) => {
  const jumpToPositions = (e) => {
    e.preventDefault()
    history.push(`${getPath(queryConstants.MENU_POSITIONS)}${window.location.search}`)
  }

  return (
    <NonIdealState
      className='bitfinex-nonideal'
      title={t('paudit.noid.title')}
      icon={IconNames.NUMBERED_LIST}
      description={t('paudit.noid.description')}
    >
      <Button
        intent={Intent.PRIMARY}
        onClick={jumpToPositions}
      >
        {t('positions.title')}
      </Button>
    </NonIdealState>
  )
}

PositionsAuditNoId.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default compose(
  withTranslation('translations'),
  withRouter,
  memo,
)(PositionsAuditNoId)
