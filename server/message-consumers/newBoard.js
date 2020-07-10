const state = require('./../state');
const logger = require('./../services/loggerService');

exports.process = function (board) {
    logger.appLog(`Adding board ${JSON.stringify(board)} to state`);
    state.addBoard(board);
    logger.appLog(`Board added to state 👍`);
}