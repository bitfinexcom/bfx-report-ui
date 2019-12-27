import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { IconNames } from '@blueprintjs/icons'
import { Button, Intent, NonIdealState } from '@blueprintjs/core'

import { getPath } from 'state/query/utils'
import queryConstants from 'state/query/constants'

const PositionsAuditNoId = (props) => {
  const { t, history } = props

  const jumpToPositions = (e) => {
    e.preventDefault()
    history.push(`${getPath(queryConstants.MENU_POSITIONS)}${history.location.search}`)
  }

  return (
    <NonIdealState
      className='bitfinex-nonideal'
      icon={IconNames.NUMBERED_LIST}
      title={t('paudit.noid.title')}
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
    location: PropTypes.object.isRequired,
  }).isRequired,
}

export default withTranslation('translations')(withRouter(PositionsAuditNoId))
