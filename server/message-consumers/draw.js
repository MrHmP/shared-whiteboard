const state = require('../state');
const logger = require('./../services/loggerService');
const { getConnectionForBoard } = require('./../services/connectionHandlerService');

exports.process = function (board, drawing) {
    logger.appLog(`Drawing for board ${board.id}`);
    state.addDrawings(board.id, drawing);
    logger.appLog(`Step 1/2 : Added drawing into state 👍`);

    try {
        const boardConnections = getConnectionForBoard(board.id);
        logger.appLog(`Sending data to ${boardConnections.length} locations`);
        drawing["type"] = "DRAW";
        boardConnections.forEach(con => {
            logger.appLog(`Sending ${drawing["type"]} request✏`);
            con.sendUTF(JSON.stringify(drawing));
        });
        logger.appLog(`Step 2/2 : Message sent to all connections 📢`);
    }
    catch (ex) {
        logger.appError(ex);
    }
}