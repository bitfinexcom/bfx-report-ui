import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'
import _map from 'lodash/map'

import { getPath } from 'state/query/utils'

import { FUNDING_SECTIONS } from './SectionSwitch.constants'

const SectionSwitch = ({
  t,
  target,
  history,
}) => {
  const switchSection = (e) => {
    const { value } = e.currentTarget
    if (value === target) {
      return
    }

    history.push({
      pathname: getPath(value),
      search: history.location.search,
    })
  }

  return (
    <ButtonGroup className='section-switch'>
      {_map(FUNDING_SECTIONS, ({ targetSection, description }) => (
        <Button
          value={targetSection}
          onClick={switchSection}
          intent={target === targetSection ? Intent.PRIMARY : undefined}
        >
          {t(description)}
        </Button>

      ))}
    </ButtonGroup>
  )
}

SectionSwitch.propTypes = {
  target: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default SectionSwitch
