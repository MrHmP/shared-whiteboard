const http = require('http');
const WebSocketServer = require('websocket').server;

exports.initiateSocketConnection = function () {
    const server = http.createServer();
    server.listen(9898);

    const wsServer = new WebSocketServer({
        httpServer: server
    });

    wsServer.on('request', function (request) {
        const connection = request.accept(null, request.origin);

        connection.on('message', function (message) {
            console.log('Message recieved is:', message.utf8Data);
            connection.sendUTF('Hi this is WebSocket server!');
        });

        connection.on('close', function (reasonCode, description) {
            console.log(`Client has disconnected. 
            \n reasonCode ${reasonCode}
            \ndescription: ${description}`);
        });
    });

}