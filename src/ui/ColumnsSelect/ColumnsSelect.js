import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { Checkbox } from '@blueprintjs/core'

import SECTION_COLUMNS from 'ui/ColumnsFilter/ColumnSelector/ColumnSelector.columns'
import config from 'config'

import ColumnsSelectDialog from './Dialog'
import { propTypes, defaultProps } from './ColumnsSelect.props'

class ColumnsSelect extends PureComponent {
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
      <Fragment>
        <span onClick={this.toggleDialog} className='color--active clickable'>
          {t('columnsselect.title')}
        </span>

        <ColumnsSelectDialog
          isOpen={isOpen}
          hasChanges={hasChanges}
          onCancel={this.onCancel}
          onApply={this.onApply}
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
      </Fragment>
    )
  }
}

ColumnsSelect.propTypes = propTypes
ColumnsSelect.defaultProps = defaultProps

export default withTranslation('translations')(ColumnsSelect)
