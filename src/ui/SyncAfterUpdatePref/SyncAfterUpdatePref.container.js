import { connect } from 'react-redux'

import { toggleTableScroll } from 'state/base/actions'
import { getTableScroll } from 'state/base/selectors'

import TableScrollPref from './SyncAfterUpdatePref'

const mapStateToProps = state => ({
  tableScroll: getTableScroll(state),
})

const mapDispatchToProps = {
  toggleTableScroll,
}

const TableScrollPrefContainer = connect(mapStateToProps, mapDispatchToProps)(TableScrollPref)

export default TableScrollPrefContainer
