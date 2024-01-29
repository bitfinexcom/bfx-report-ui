export const getBfxEnvName = () => process.env.CI_ENVIRONMENT_NAME || process.env.REACT_APP_PROJECT_ENV || 'staging'

export const loggerLevels = (process.env.REACT_APP_LOGGER_LEVELS
  ? JSON.parse(process.env.REACT_APP_LOGGER_LEVELS) : ['error'])
