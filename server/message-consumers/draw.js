const state = require('../state');
const logger = require('./../services/loggerService');

exports.addDrawing = function (board, drawing) {
    logger.appLog(`Adding board ${JSON.stringify(board)}'s drawing into state`);
    state.addDrawings(board.id, drawing);
    logger.appLog(`Added drawing into state 👍`);
}