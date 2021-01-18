const config = {
  api: {
    domain: 'localhost',
    port: 3043,
    prefix: '/api/v1',
  },
  tokens: {
    access: {
      secret: 'u2AMvFoxGP9rnbWcTBeK2VEMXUg4y9urj6eNvuWfZOuI7o0cIdDbDpBjvmXNSo39VNCCsPOpYvsQxNiAqK8Bzw==',
      expire: '5m',
    },
    refresh: {
      lifetime: '14d',
    }
  },
  https: {
    key: './https_private_key.key',
    cert: './https_certificate.crt',
  }
};

export default config;