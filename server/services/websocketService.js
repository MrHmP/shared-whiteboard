const http = require('http');
const WebSocketServer = require('websocket').server;
const newBoardProcessor = require('./../message-consumers/newBoard');
const getBoardProcessor = require('./../message-consumers/getBoard');
const drawProcessor = require('./../message-consumers/draw');
const connections = {}; //{ 'boardId': [connection1,connection2] }
const logger = require('./../services/loggerService');

function addConnectionForBoard(boardId, connection) {
    logger.appLog(`New connection added for board ${boardId} ✅`);
    connection.sharedBoardId = logger.getRandomId();
    connection.boardId = boardId;
    if (connections[boardId]) {
        connections[boardId].push(connection);
    } else {
        connections[boardId] = [connection];
    }
}

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
            const incomingData = JSON.parse(message.utf8Data);
            const messageType = incomingData.type;
            switch (messageType) {
                case 'DRAW':
                    drawProcessor.process(incomingData.board, incomingData.drawing);
                    try {
                        logger.appLog(`Sending data to ${connections[incomingData.board.id].length} locations`);
                        connections[incomingData.board.id].forEach(con => {
                            logger.appLog(`Sending draw request✏️`);
                            con.sendUTF(JSON.stringify(incomingData));
                        });
                    } catch (ex) {
                        logger.appLog(ex);
                    }
                    break;
                case 'BOARD_GET':
                    let fetchedBoard = getBoardProcessor.process(incomingData);
                    if (fetchedBoard) {
                        addConnectionForBoard(incomingData.bid, connection);
                        fetchedBoard["type"] = 'BOARD_GET';
                    }
                    connection.sendUTF(JSON.stringify(fetchedBoard));
                    break;
                case 'BOARD_ADDED':
                    addConnectionForBoard(incomingData.id, connection);
                    newBoardProcessor.process(incomingData);
                    connection.sendUTF(JSON.stringify({ 'Status': 'OK', 'type': 'BOARD_ADDED' }));
                    break;
                default:
                    break;
            }
        });

        connection.on('close', function (reasonCode, description) {
            connections[this.boardId] = connections[this.boardId].filter(c => c.sharedBoardId !== this.sharedBoardId);
            logger.appLog(`Client has disconnected because ${description} ❌`);
        });
    });

}