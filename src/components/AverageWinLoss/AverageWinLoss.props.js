import PropTypes from 'prop-types'

const WIN_LOSS_ENTRIES_PROPS = PropTypes.shape({
  mts: PropTypes.number.isRequired,
})

export const propTypes = {
  entries: PropTypes.arrayOf(WIN_LOSS_ENTRIES_PROPS).isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  fetchWinLoss: PropTypes.func.isRequired,
}

export const defaultProps = {
  entries: [],
  params: {},
}
