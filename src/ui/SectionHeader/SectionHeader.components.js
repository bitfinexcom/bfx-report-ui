import React from 'react'
import PropTypes from 'prop-types'

import Classes from './SectionHeader.classes'

const ComponentWrapper = ({ children, className }) => (
  <div className={className}>{children}</div>
)
ComponentWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.string.isRequired,
}

export const SectionHeader = (props) => <ComponentWrapper {...props} className={Classes.SECTION_HEADER} />
export const SectionHeaderTitle = (props) => <ComponentWrapper {...props} className={Classes.SECTION_HEADER_TITLE} />
export const SectionHeaderRow = (props) => <ComponentWrapper {...props} className={Classes.SECTION_HEADER_ROW} />
export const SectionHeaderItem = (props) => <ComponentWrapper {...props} className={Classes.SECTION_HEADER_ITEM} />
export const SectionHeaderItemLabel = (props) => (
  <ComponentWrapper {...props} className={Classes.SECTION_HEADER_ITEM_LABEL} />
)

export default {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
}
