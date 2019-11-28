import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getColumns } from 'state/filters/selectors'
import { setColumns } from 'state/filters/actions'

import ColumnsSelect from './ColumnsSelect'

const mapStateToProps = (state, { target }) => ({
  columns: getColumns(state, target),
})

const mapDispatchToProps = {
  setColumns,
}

const ColumnsSelectContainer = connect(mapStateToProps, mapDispatchToProps)(ColumnsSelect)

export default withTranslation('translations')(ColumnsSelectContainer)
