export const THEMES = {
  LIGHT: 'Light',
  DARK: 'Dark',
  MIDNIGHT: 'Midnight',
}

export const THEME_CLASSES = {
  LIGHT: 'bp3-light',
  DARK: 'bp3-dark',
  MIDNIGHT: 'midnight',
}

export const getThemeClass = (theme) => {
  switch (theme) {
    case THEMES.LIGHT:
      return THEME_CLASSES.LIGHT
    case THEMES.DARK:
      return THEME_CLASSES.DARK
    case THEMES.MIDNIGHT:
      return THEME_CLASSES.MIDNIGHT
    default: {
      // eslint-disable-next-line no-console
      console.error('Theme not found:', theme)
      return theme
    }
  }
}

export default {
  THEMES,
  THEME_CLASSES,
  getThemeClass,
}
