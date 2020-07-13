const http = require('http');
const WebSocketServer = require('websocket').server;
const logger = require('../../server/services/loggerService');
const { handleIncomingMessage } = require('../services/messageRouterService');
const { deleteConnectionForBoard } = require('../services/connectionHandlerService');

exports.initiateSocketConnection = function () {
    const server = http.createServer();
    server.listen(9898);

    const wsServer = new WebSocketServer({
        httpServer: server
    });

    wsServer.on('request', function (request) {
        const connection = request.accept(null, request.origin);

        connection.on('message', function (message) {
            logger.appLog('Message recieved is:', message.utf8Data);
            handleIncomingMessage(message, connection);
        });

        connection.on('close', function (reasonCode, description) {
            deleteConnectionForBoard(this);
            logger.appLog(`Client has disconnected because ${description} ❌`);
        });
    });

}