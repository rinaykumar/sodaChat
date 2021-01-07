const WebSocket = require('ws');

// WebSocket Server
const wss = new WebSocket.Server({port: 4001});

const chatMessages = [];

const broadcast = (data) => {
  const textToSend = JSON.stringify(data);
  wss.clients.forEach(client => client.send(textToSend));
}

wss.on('connection', (ws) => {
  // ws represents a connection
  console.log('Client has connected');

  ws.on('close', () => {
    console.log('Client has disconnected')
  });

  ws.on('message', (rawData) => {
    const data = JSON.parse(rawData);
    console.log('Client says ' + rawData)
    const broadcastMessage = {
      actionType: 'updateChatMessages',
      chatMessages: chatMessages, 
    };
    broadcast(broadcastMessage);
  });
});