import { connect } from 'react-redux'

import { getTimeFrame } from 'state/query/selector'

import ExportDialog from './ExportDialog'

function mapStateToProps(state = {}) {
  const { start, end } = getTimeFrame(state.query)
  return {
    start,
    end,
  }
}

const ExportDialogContainer = connect(mapStateToProps)(ExportDialog)

export default ExportDialogContainer
