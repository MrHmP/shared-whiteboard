const http = require('http');
const WebSocketServer = require('websocket').server;
const newBoardProcessor = require('./../message-consumers/newBoard');
const getBoardProcessor = require('./../message-consumers/getBoard');
const drawProcessor = require('./../message-consumers/draw');

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
            const incomingData = JSON.parse(message.utf8Data);
            const messageType = incomingData.type;
            switch (messageType) {
                case 'DRAW':
                    drawProcessor.addDrawing(incomingData.board, incomingData.drawing);
                    connection.sendUTF(JSON.stringify({ 'Status': 'OK', 'type': 'DRAW' }));
                    break;
                case 'BOARD_GET':
                    let fetchedBoard = getBoardProcessor.process(incomingData) || {};
                    fetchedBoard["type"] = 'BOARD_GET';
                    connection.sendUTF(JSON.stringify(fetchedBoard));
                    break;
                case 'BOARD_ADDED':
                    newBoardProcessor.process(incomingData);
                    connection.sendUTF(JSON.stringify({ 'Status': 'OK', 'type': 'BOARD_ADDED' }));
                    break;
                default:
                    break;
            }
        });

        connection.on('close', function (reasonCode, description) {
            console.log(`Client has disconnected. 
            \n reasonCode ${reasonCode}
            \ndescription: ${description}`);
        });
    });

}