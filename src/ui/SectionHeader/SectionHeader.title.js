import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Classes from './SectionHeader.classes'

const SectionHeaderTitle = ({ children, getTitleLink }) => (
  <div className={Classes.SECTION_HEADER_TITLE}>
    <span className='section-header-title--main'>{children}</span>
    {getTitleLink && <>{getTitleLink()}</>}
  </div>
)

SectionHeaderTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  getTitleLink: PropTypes.func,
}

SectionHeaderTitle.defaultProps = {
  getTitleLink: undefined,
}

export default memo(SectionHeaderTitle)
