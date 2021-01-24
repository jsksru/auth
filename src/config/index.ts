import dotenv from 'dotenv';
dotenv.config();

const { env } = process;

const config = {
  api: {
    domain: env.API_DOMAIN as string || 'localhost',
    port: Number(env.API_PORT) || 3043,
    prefix: env.API_PREFIX as string || '/api/v1',
  },
  tokens: {
    access: {
      secret: env.JWT_SECRET as string || 'Use random Secret string in .env file!!!',
      expire: env.JWT_EXPIRE as string || '10m',
    },
    refresh: {
      lifetime: env.REFRESH_LIFETIME as string || '14d',
    }
  },
  https: {
    key: env.HTTPS_KEY_FILE as string || './https_private_key.key',
    cert: env.HTTPS_CERT_FILE as string || './https_certificate.crt',
  },
  db: {
    connectionString: env.MONGO_DB_STRING as string || '',
  }
};

export default config;