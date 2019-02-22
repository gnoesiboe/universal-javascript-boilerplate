const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const currentEnvironment = process.env.NODE_ENV;

export const isDevelopmentEnvironment = currentEnvironment === DEVELOPMENT;
export const isProductionEnvironment = currentEnvironment === PRODUCTION;
