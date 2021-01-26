import config from './config';
import https from 'https';
import http from 'http';
import fs from 'fs';
import app from './app';
import mongoose from 'mongoose';

const HTTP_ENABLE = config.api.mode.http.enable;
const HTTP_PORT = config.api.mode.http.port;

const HTTPS_ENABLE = config.api.mode.https.enable;
const HTTPS_PORT = config.api.mode.https.port;
const HTTPS_PRIVATE_KEY = fs.readFileSync(config.api.mode.https.key, 'utf8');
const HTTPS_CERTIFICATE = fs.readFileSync(config.api.mode.https.cert, 'utf8');

const DB_STRING = config.db.connectionString;

mongoose.connect(DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    if (HTTP_ENABLE) {
      http.createServer(app).listen(
        HTTP_PORT,
        '0.0.0.0',
        () => console.log(`HTTP Server listening on ${HTTP_PORT} port...`),
      );
    }

    if (HTTPS_ENABLE) {
      https.createServer({cert: HTTPS_CERTIFICATE, key: HTTPS_PRIVATE_KEY}, app).listen(
        HTTPS_PORT,
        '0.0.0.0',
        () => console.log(`HTTPS Server listening on ${HTTPS_PORT} port...`),
      );
    }
  })
  .catch(err => {
    console.error('DB connection Error!', err);
    process.exit(1);
  });