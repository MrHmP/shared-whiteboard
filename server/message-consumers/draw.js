const state = require('../state');

exports.addDrawing = function (board, drawing) {
    console.log(`Adding board ${JSON.stringify(board)}'s drawing into state`);
    state.addDrawings(board.bid, drawing);
    console.log(`Added drawing into state 👍`);
}

exports.getDrawings = function (board) {
    console.log(`Getting board ${JSON.stringify(board)}'s drawing from state`);
    const drawings = state.getDrawings(board.bid);
    console.log(`Got drawings from state 👍`);
    return drawings;
}