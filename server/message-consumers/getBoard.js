const state = require('../state');

exports.process = function (board) {
    console.log(`Getting board ${JSON.stringify(board)} from state`);
    const boardFromState = state.getBoard(board.bid);
    if (boardFromState != null) {
        console.log(`Got non null board from state 👍`);
    }
    return boardFromState;
}