const THEMES = {
  LIGHT: 'Light',
  DARK: 'Dark',
}

const getThemeClass = (theme) => {
  switch (theme) {
    case THEMES.LIGHT:
      return 'bp3-light'
    case THEMES.DARK:
      return 'bp3-dark'
    default: {
      // eslint-disable-next-line no-console
      console.error('Theme not found:', theme)
      return theme
    }
  }
}

export {
  THEMES,
  getThemeClass,
}
