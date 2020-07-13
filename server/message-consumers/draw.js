const state = require('../state');
const logger = require('./../services/loggerService');

exports.process = function (board, drawing) {
    logger.appLog(`Drawing for board ${board.id}`);
    state.addDrawings(board.id, drawing);
    logger.appLog(`Added drawing into state 👍`);
}