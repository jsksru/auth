import config from './config';
import https from 'https';
import fs from 'fs';
import app from './app';

const PRIVATE_KEY = fs.readFileSync(config.https.key, 'utf8');
const CERTIFICATE = fs.readFileSync(config.https.cert, 'utf8');
const API_PORT = config.api.port;

const httpsServer = https.createServer({ key: PRIVATE_KEY, cert: CERTIFICATE }, app);

httpsServer.listen(API_PORT, '0.0.0.0', () => console.log(`Server listening on ${API_PORT} port...`));