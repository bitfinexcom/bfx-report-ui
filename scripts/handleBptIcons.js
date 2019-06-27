/* Modifies iconSvgPaths.js file by removing data for all unused icons  */

const fs = require('fs')
const { IconSvgPaths16, IconSvgPaths20 } = require('@blueprintjs/icons')

const USED_ICONS = [
  'chart',
  'book',
  'flows',
  'property',
  'exchange',
  'add-to-folder',
  'folder-shared-open',
  'numbered-list',
  'dollar',

  'refresh',
  'cloud-download',
  'issue-new',
  'double-chevron-left',
  'chevron-left',
  'chevron-right',
  'double-chevron-right',
  'caret-down',
  'caret-right',
  'confirm',
  'menu',
  'key',
  'help',
  'person',
  'calendar',
  'pulse',
  'updated',
  'search',
  'small-cross',
  'double-caret-vertical',
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
