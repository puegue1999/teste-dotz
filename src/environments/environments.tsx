const ENV = process.env.REACT_APP_ENV || 'development';

const ENV_CONFIG = {
  development: {
    API_URL: 'http://localhost:3001',
    DOMAIN: 'localhost',
  },
};

export const API_Routes = ENV_CONFIG[ENV as keyof typeof ENV_CONFIG];
