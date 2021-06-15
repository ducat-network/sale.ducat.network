const cors = require('cors');
const path = require('path');
const express = require('express');

import config from 'config';
const httpPort = config.get('port.http');

const { serverOptions } = require('./utils/getSslCertificat');

const app = express();
const currentPort = serverOptions ? config.get('port.https') : config.get('port.http')
let server;

if(serverOptions) {
    app.listen(httpPort);
    server = require('https').createServer(serverOptions, app);
    process.env.NODE_ENV === 'production' && app.use((req, res, next) => (req.secure) ? next() : res.redirect(`https://${req.headers.host}${req.url}`));
} else {
    server = require('http').createServer(app);
}

app.use(cors());
app.use(express.json({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'client')));
app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'client', 'index.html')));

export {
    server,
    currentPort
};