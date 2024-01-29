export const getBfxEnvName = () => process.env.CI_ENVIRONMENT_NAME || process.env.REACT_APP_PROJECT_ENV || 'staging'
