import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'
import _map from 'lodash/map'
import _isEqual from 'lodash/isEqual'

import { getPath } from 'state/query/utils'

import getSections from './SectionSwitch.helpers'

const SectionSwitch = ({
  t,
  target,
  history,
}) => {
  const switchSection = (e) => {
    const { value } = e.currentTarget
    if (_isEqual(value, target)) {
      return
    }

    history.push({
      pathname: getPath(value),
      search: history.location.search,
    })
  }

  const sections = useMemo(() => getSections(target), [target])

  return (
    <ButtonGroup className='section-switch'>
      {_map(sections, ({ targetSection, description }) => (
        <Button
          key={description}
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
