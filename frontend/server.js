const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const app = express();
const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});

app.all("/api/*", (req, res) => {
  // sends api requests to the backend
  console.log(req.path)
  apiProxy.web(req, res, {
    target: 'http://localhost:1234',
  });
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/sodachat.net/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/sodachat.net/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/sodachat.net/chain.pem', 'utf8');

const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
};

// Redirect HTTP server
const httpApp = express();
httpApp.all('*', (req, res) => res.redirect('https://sodachat.net'));

// Starting both http & https servers
const httpServer = http.createServer(httpApp); // Change back to 'app'
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
        console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
        console.log('HTTPS Server running on port 443');
})
