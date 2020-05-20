import baseConstants from 'state/base/constants'

export const THEMES = {
  DARK: 'Dark',
  LIGHT: 'Light',
}

export const THEME_CLASSES = {
  DARK: 'theme-dark',
  LIGHT: 'theme-light',
}

// map for migration from old stored themes
export const getNewTheme = (theme) => {
  switch (theme) {
    case 'bp3-dark':
      return THEME_CLASSES.DARK
    case 'bp3-light':
      return THEME_CLASSES.LIGHT
    default:
      return baseConstants.DEFAULT_THEME
  }
}

export const getThemeClass = (theme) => {
  switch (theme) {
    case THEMES.DARK:
      return THEME_CLASSES.DARK
    case THEMES.LIGHT:
      return THEME_CLASSES.LIGHT
    default: {
      // eslint-disable-next-line no-console
      console.error('Theme not found:', theme)
      return THEME_CLASSES.DARK
    }
  }
}

export const verifyTheme = (theme) => Object.values(THEME_CLASSES).includes(theme)

export default {
  THEMES,
  THEME_CLASSES,
  getNewTheme,
  getThemeClass,
  verifyTheme,
}
