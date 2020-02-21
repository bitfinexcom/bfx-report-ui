/* Modifies iconSvgPaths.js file by removing data for all unused icons  */

const fs = require('fs')
const { IconNames, IconSvgPaths16, IconSvgPaths20 } = require('@blueprintjs/icons')

const USED_ICONS = [
  IconNames.ADD_TO_FOLDER,
  IconNames.BOOK,
  IconNames.CALENDAR,
  IconNames.CARET_DOWN,
  IconNames.CARET_RIGHT,
  IconNames.CHART,
  IconNames.CHEVRON_LEFT,
  IconNames.CHEVRON_RIGHT,
  IconNames.CLOUD_DOWNLOAD,
  IconNames.CONFIRM,
  IconNames.CROSS,
  IconNames.EYE_OPEN,
  IconNames.DOLLAR,
  IconNames.DOUBLE_CARET_VERTICAL,
  IconNames.DOUBLE_CHEVRON_LEFT,
  IconNames.DOUBLE_CHEVRON_RIGHT,
  IconNames.EXCHANGE,
  IconNames.FLOWS,
  IconNames.FOLDER_SHARED_OPEN,
  IconNames.HELP,
  IconNames.HISTORY,
  IconNames.ISSUE_NEW,
  IconNames.KEY,
  IconNames.LIST_COLUMNS,
  IconNames.LOG_IN,
  IconNames.MENU,
  IconNames.NUMBERED_LIST,
  IconNames.PERSON,
  IconNames.PROPERTY,
  IconNames.PULSE,
  IconNames.REFRESH,
  IconNames.SEARCH,
  IconNames.SERIES_DERIVED,
  IconNames.SMALL_CROSS,
  IconNames.TH_FILTERED,
  IconNames.TIMELINE_BAR_CHART,
  IconNames.UPDATED,
]

const getUsedIcons = icons => USED_ICONS.reduce((acc, iconName) => {
  acc[iconName] = icons[iconName]
  return acc
}, {})

const iconPaths16 = getUsedIcons(IconSvgPaths16)
const iconPaths20 = getUsedIcons(IconSvgPaths20)

const writeStream = fs.createWriteStream('./node_modules/@blueprintjs/icons/lib/esm/generated/iconSvgPaths.js')
writeStream.once('open', () => {
  writeStream.write(`export var IconSvgPaths16 = ${JSON.stringify(iconPaths16)};\n`)
  writeStream.write(`export var IconSvgPaths20 = ${JSON.stringify(iconPaths20)};\n`)
  writeStream.write('//# sourceMappingURL=iconSvgPaths.js.map')
  writeStream.end()
})
