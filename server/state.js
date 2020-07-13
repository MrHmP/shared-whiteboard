const logger = require('./services/loggerService');
const boards = {};

exports.addBoard = function (board) {
    const oldBoard = boards[board.id];

    if (oldBoard) {
        logger.appLog(`Can't add board, this ${oldBoard.id} already exists`);
    } else {
        boards[board.id] = board;
    }
}

exports.addDrawings = function (boardId, location) {
    if (boards[boardId].drawings) {
        boards[boardId].drawings.push(location);
    } else {
        boards[boardId]["drawings"] = [location];
    }
}

exports.getBoard = function (id) {
    return boards[id];
}