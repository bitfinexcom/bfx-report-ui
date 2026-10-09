import React, { memo } from 'react'
import PropTypes from 'prop-types'

import ErrorDialog from 'components/ErrorDialog'
import Preferences from 'components/Preferences'
import ExportDialog from 'components/ExportDialog'
import ExtraInfoDialog from 'components/ExtraInfoDialog'
import TimeFrameDialog from 'components/TimeFrameDialog'
import GoToRangeDialog from 'components/GoToRangeDialog'
import ExportFailDialog from 'components/ExportFailDialog'
import PaginationDialog from 'components/PaginationDialog'
import MaintenanceDialog from 'components/MaintenanceDialog'
import TaxPrecisionDialog from 'components/TaxPrecisionDialog'
import ExportSuccessDialog from 'components/ExportSuccessDialog'
import NavMenuDrawer from 'ui/NavMenuDrawer'
import config from 'config'

const { showFrameworkMode } = config

const MainDialogs = ({ errorDialogDisabled }) => (
  <>
    <ExportDialog />
    <ExportSuccessDialog />
    {showFrameworkMode && !errorDialogDisabled && <ErrorDialog />}
    <PaginationDialog />
    <Preferences />
    <TimeFrameDialog />
    <GoToRangeDialog />
    <NavMenuDrawer />
    <ExtraInfoDialog />
    <ExportFailDialog />
    {showFrameworkMode && <MaintenanceDialog />}
    {showFrameworkMode && <TaxPrecisionDialog />}
  </>
)

MainDialogs.propTypes = {
  errorDialogDisabled: PropTypes.bool.isRequired,
}

export default memo(MainDialogs)
