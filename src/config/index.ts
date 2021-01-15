const config = {
  api: {
    port: 3043,
    prefix: '/api/v1',
  },
  tokens: {
    access: {
      type: 'access',
      secret: 'u2AMvFoxGP9rnbWcTBeK2VEMXUg4y9urj6eNvuWfZOuI7o0cIdDbDpBjvmXNSo39VNCCsPOpYvsQxNiAqK8Bzw==',
      expire: '5m'
    },
    refresh: {
      type: 'refresh',
      secret: '11jFyIA90wp4YGzzWbsLiPhSLGwlsScnRD+joYeKe6u/mx0+lOrtf8OFsQFl3MSgBiHTDO1+/HlhQuRRRX/DzA==',
      expire: '6m'
    }
  },
  https: {
    key: './https_private_key.key',
    cert: './https_certificate.crt'
  }
};

export default config;