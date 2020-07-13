const connections = {}; //{ 'boardId': [connection1,connection2] }
const logger = require('./loggerService');

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

function deleteConnectionForBoard(connection) {
    connections[connection.boardId] = connections[connection.boardId].filter(c => c.sharedBoardId !== connection.sharedBoardId);
}

function getConnectionForBoard(boardId) {
    return connections[boardId];
}

module.exports = {
    addConnectionForBoard,
    deleteConnectionForBoard,
    getConnectionForBoard
}