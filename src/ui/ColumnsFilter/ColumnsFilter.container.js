import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getFilters } from 'state/filters/selectors'
import { setFilters } from 'state/filters/actions'

import ColumnsFilter from './ColumnsFilter'

const mapStateToProps = (state, { section }) => ({
  filters: getFilters(state, section),
})

const mapDispatchToProps = {
  setFilters,
}

const ColumnsFilterContainer = connect(mapStateToProps, mapDispatchToProps)(ColumnsFilter)

export default withTranslation('translations')(ColumnsFilterContainer)
