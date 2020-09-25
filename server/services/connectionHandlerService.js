const connections = {}; //{ 'boardId': [connection1,connection2] }
const logger = require('./loggerService');

function addConnectionForBoard(boardId, connection) {
    connection.sharedBoardId = logger.getRandomId();
    connection.boardId = boardId;
    if (connections[boardId]) {
        connections[boardId].push(connection);
    } else {
        connections[boardId] = [connection];
    }
    logger.appLog(`New connection added for board ${boardId} ✅`);
}

function deleteConnectionForBoard(connection) {
    if (connections && connection && connection.boardId) {
        connections[connection.boardId] = connections[connection.boardId].filter(c => c.sharedBoardId !== connection.sharedBoardId);
        logger.appLog(`Connection dropped added for board ${connection.boardId} 🚮`);
    }
}

function getConnectionForBoard(boardId) {
    return connections[boardId];
}

module.exports = {
    addConnectionForBoard,
    deleteConnectionForBoard,
    getConnectionForBoard
}