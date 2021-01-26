import dotenv from 'dotenv';
dotenv.config();

const stb = (str: string): boolean => str === 'true';

const { env } = process;

const config = {
  api: {
    domain: env.API_DOMAIN as string || 'localhost',
    prefix: env.API_PREFIX as string || '/api/v1',
    mode: {
      http: {
        enable: stb(env.HTTP_ENABLE as string || 'true'),
        port: Number(env.HTTP_PORT as string) || 3030,
      },
      https: {
        enable: stb(env.HTTPS_ENABLE as string || 'false'),
        port: Number(env.HTTPS_PORT as string) || 3031,
        key: env.HTTPS_KEY_FILE as string || './https_private_key.key',
        cert: env.HTTPS_CERT_FILE as string || './https_certificate.crt',
      },
    },
    cors: {
      enable: stb(env.CORS_ENABLE as string || 'false'),
      whitelist: String(env.CORS_WHITELIST as string).split(','),
    },
  },
  tokens: {
    access: {
      secret: env.JWT_SECRET as string || 'Use random Secret string in .env file!!!',
      expire: env.JWT_EXPIRE as string || '10m',
    },
    refresh: {
      lifetime: Number(env.REFRESH_LIFETIME as string) || 86400,
    },
  },
  db: {
    connectionString: env.MONGO_CONNECTION_STRING as string || '',
  },
};

export default config;