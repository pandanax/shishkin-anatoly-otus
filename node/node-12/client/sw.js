
const connectedPorts = [];

const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener('message', ({data}) => {
    connectedPorts.forEach(port => port.postMessage(JSON.parse(data)));
});

self.addEventListener('connect', ({ ports }) => {
    console.log('connected')
    const port = ports[0];
    connectedPorts.push(port);
    port.start();
});
