import PropTypes from 'prop-types'

export const propTypes = {
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  hasChanges: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
