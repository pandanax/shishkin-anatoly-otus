import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({port: 8080});
wss.on('connection', function connection(ws) {
    const sendRand = () => ws.send(JSON.stringify({value: Math.random().toFixed(5)}));
    setInterval(sendRand, 5000);
    sendRand();
});
wss.on('close', function connection(ws) {
    console.log('closed')
})
