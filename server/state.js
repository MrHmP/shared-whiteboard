const e = require("express");

const boards = {};

exports.addBoard = function (board) {
    const oldBoard = boards[board.id];

    if (oldBoard) {
        console.log(`Can't add board, this ${oldBoard.id} already exists`);
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

exports.getDrawings = function (id) {
    return locations[id];
}