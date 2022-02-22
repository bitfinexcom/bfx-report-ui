import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Checkbox } from '@blueprintjs/core'

import config from 'config'
import SECTION_COLUMNS from 'ui/ColumnsFilter/ColumnSelector/ColumnSelector.columns'

import ColumnsSelectDialog from './Dialog'

class ColumnsSelect extends PureComponent {
  static propTypes = {
    target: PropTypes.string.isRequired,
    columns: PropTypes.objectOf(PropTypes.bool),
    setColumns: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    columns: {},
  }

  constructor(props) {
    super()

    const { columns } = props
    this.state = {
      isOpen: false,
      columns,
    }
  }

  toggleDialog = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  toggleColumn = (e) => {
    const { name, checked } = e.target
    const { columns } = this.state

    this.setState({
      columns: {
        ...columns,
        [name]: checked,
      },
    })
  }

  onCancel = () => {
    const { columns } = this.props

    this.toggleDialog()
    this.setState({
      columns,
    })
  }

  onApply = () => {
    const { columns } = this.state
    const { target, setColumns } = this.props

    this.toggleDialog()
    setColumns({
      section: target,
      columns,
    })
  }

  render() {
    const { target, columns: currentColumns, t } = this.props
    const { isOpen, columns } = this.state

    const hasChanges = Object.keys(columns).some(column => columns[column] !== currentColumns[column])
    const sectionColumns = SECTION_COLUMNS[target]
      .filter(column => (!column.frameworkOnly || config.showFrameworkMode) && !column.filterOnly)

    return (
      <>
        <span
          onClick={this.toggleDialog}
          className='color--active clickable'
        >
          {t('columnsselect.title')}
        </span>
        <ColumnsSelectDialog
          isOpen={isOpen}
          onApply={this.onApply}
          hasChanges={hasChanges}
          onCancel={this.onCancel}
        >
          <ul className='columns-select'>
            {sectionColumns.map((column) => {
              const { id, name } = column

              return (
                <li key={id} className='columns-select-item'>
                  <Checkbox
                    name={id}
                    checked={columns[id]}
                    onChange={this.toggleColumn}
                  >
                    {t(`column.${name}`)}
                  </Checkbox>
                </li>
              )
            })}
          </ul>
        </ColumnsSelectDialog>
      </>
    )
  }
}

export default withTranslation('translations')(ColumnsSelect)
