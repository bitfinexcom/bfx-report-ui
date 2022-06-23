import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getDevice } from 'state/ui/selectors'
import { getTableScroll } from 'state/base/selectors'
import { setColumnsWidth } from 'state/columns/actions'

import DataTable from './DataTable'

const mapStateToProps = state => ({
  device: getDevice(state),
  tableScroll: getTableScroll(state),
})

const mapDispatchToProps = {
  setColumnsWidth,
}

const DataTableContainer = connect(mapStateToProps, mapDispatchToProps)(DataTable)

export default withTranslation('translations')(DataTableContainer)
