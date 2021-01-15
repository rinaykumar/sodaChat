const WebSocket = require('ws');
const fs = require('fs');
const https = require('https');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/sodachat.net/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/sodachat.net/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/sodachat.net/chain.pem', 'utf8');

const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
};

const server = https.createServer(credentials);
const wss = new WebSocket.Server({ server });

const broadcast = (data) => {
  wss.clients.forEach(client => client.send(data));
}

wss.on('connection', (ws) => {
  // ws represents a connection
  console.log('Client has connected');

  ws.on('close', () => {
    console.log('Client has disconnected')
  });

  ws.on('message', (rawData) => {
    //const data = JSON.parse(rawData);
    console.log('Client says ' + rawData)
    broadcast("message");
  });
});

server.listen(4001);
