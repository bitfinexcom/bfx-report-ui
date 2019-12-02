import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getDevice } from 'state/ui/selectors'

import DataTable from './DataTable'

const mapStateToProps = state => ({
  device: getDevice(state),
})

const DataTableContainer = connect(mapStateToProps)(DataTable)

export default withTranslation('translations')(DataTableContainer)
