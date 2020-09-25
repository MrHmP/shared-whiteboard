const state = require('./../state');
const logger = require('./../services/loggerService');
const { addConnectionForBoard } = require('./../services/connectionHandlerService');

exports.process = function (board, connection) {
    logger.appLog(`Adding board ${JSON.stringify(board)} to state`);

    addConnectionForBoard(board.id, connection);
    state.addBoard(board);
    logger.appLog(`Board added to state 👍`);

    connection.sendUTF(JSON.stringify({ 'Status': 'OK', 'type': 'PING' }));
    logger.appLog(`Response sent back to called 📢`);
}