const state = require('../state');

exports.addDrawing = function (board, drawing) {
    console.log(`Adding board ${JSON.stringify(board)}'s drawing into state`);
    state.addDrawings(board.id, drawing);
    console.log(`Added drawing into state 👍`);
}