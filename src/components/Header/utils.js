const HELP_LINK = 'https://support.bitfinex.com/hc/en-us/articles/360008951853'
const CHANGELOG_LINK = ' https://github.com/bitfinexcom/bfx-report-electron/blob/master/CHANGELOG.md'

export const openHelp = () => window.open(HELP_LINK)
export const openChangelog = () => window.open(CHANGELOG_LINK)

export default {
  openHelp,
  openChangelog,
}
