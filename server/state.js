const e = require("express");

const boards = {};
const locations = {};

exports.addBoard = function (board) {
    const oldBoard = boards[board.id];

    if (oldBoard) {
        console.log(`Can't add board, this ${oldBoard.id} already exists`);
    } else {
        boards[board.id] = board;
    }
}

exports.addDrawings = function (board, location) {
    const oldLocations = locations[board];

    if (oldLocations) {
        locations[board].drawings.push(location);
    } else {
        locations[board] = { drawings: [location] };
    }
}

exports.getBoard = function (id) {
    return boards[id];
}

exports.getDrawings = function (id) {
    return locations[id];
}