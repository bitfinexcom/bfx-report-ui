import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { IconNames } from '@blueprintjs/icons'
import { Button, Intent, NonIdealState } from '@blueprintjs/core'

import { getPath } from 'state/query/utils'
import queryConstants from 'state/query/constants'

const OrderTradesNoData = (props) => {
  const { t, history } = props

  const jumpToOrders = () => {
    history.push(`${getPath(queryConstants.MENU_ORDERS)}${window.location.search}`)
  }

  return (
    <NonIdealState
      className='bitfinex-nonideal'
      icon={IconNames.NUMBERED_LIST}
      title={t('ordertrades.noid.title')}
      description={t('ordertrades.noid.description')}
    >
      <Button
        intent={Intent.PRIMARY}
        onClick={jumpToOrders}
      >
        {t('orders.title')}
      </Button>
    </NonIdealState>
  )
}

OrderTradesNoData.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default withTranslation('translations')(withRouter(OrderTradesNoData))
