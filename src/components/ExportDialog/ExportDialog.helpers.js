import config from 'config'
import queryConstants from 'state/query/constants'

const { showFrameworkMode } = config

const EXPORT_TO_PDF_WHITELIST = [
  queryConstants.MENU_LEDGERS,
  queryConstants.MENU_TAX_REPORT,
]

export const getShowPdfSwitcher = (targets) => (
  showFrameworkMode && EXPORT_TO_PDF_WHITELIST.some(target => targets.includes(target))
)
