import config from './config';
import https from 'https';
import http from 'http';
import fs from 'fs';
import app from './app';
import mongoose from 'mongoose';

// const PRIVATE_KEY = fs.readFileSync(config.https.key, 'utf8');
// const CERTIFICATE = fs.readFileSync(config.https.cert, 'utf8');
const API_PORT = config.api.port;
const DB_STRING = config.db.connectionString;
const isHttps = config.https.enable;

mongoose.connect(DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
  .then(() => {
    // const server = https.createServer({ key: PRIVATE_KEY, cert: CERTIFICATE }, app);
    const server = http.createServer(app);
    server.listen(API_PORT, '0.0.0.0', () => console.log(`Server listening on ${API_PORT} port...`));
  })
  .catch(err => {
    console.error('DB connection error:', err);
  });