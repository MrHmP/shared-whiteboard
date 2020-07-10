const state = require('../state');
const logger = require('./../services/loggerService');

exports.process = function (board) {
    logger.appLog(`Getting board ${JSON.stringify(board)} from state`);
    const boardFromState = state.getBoard(board.bid);
    if (boardFromState != null) {
        logger.appLog(`Got non null board from state 👍`);
    }
    return boardFromState;
}