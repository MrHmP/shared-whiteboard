const state = require('../state');
const logger = require('./../services/loggerService');
const { addConnectionForBoard } = require('./../services/connectionHandlerService');

exports.process = function (board, connection) {
    logger.appLog(`Getting board ${JSON.stringify(board)} from state`);
    const boardFromState = state.getBoard(board.bid);
    if (boardFromState != null) {
        logger.appLog(`Step 1/2: Got non null board from state 👍`);
        addConnectionForBoard(board.bid, connection);

        boardFromState["type"] = 'BOARD_GET';
        connection.sendUTF(JSON.stringify(boardFromState));
        logger.appLog(`Step 2/2: Sent message to caller 📢`);
    } else {
        logger.appError(`No board found from state for id ${board.bid}`);
    }
}