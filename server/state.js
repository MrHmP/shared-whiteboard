const e = require("express");

const boards = [];

exports.addBoard = function (board) {
    const oldBoard = boards.filter(b => b.id === board.id);

    if (oldBoard && oldBoard.length > 0) {
        console.log(`Can't add board, this ${oldBoard.id} already exists`);
    } else {
        boards.push(board);
    }
}

exports.getBoard = function (id) {
    const oldBoard = boards.filter(b => b.id === id);

    if ((oldBoard || []).length > 0) {
        return oldBoard[0];
    } else {
        return null;
    }
}