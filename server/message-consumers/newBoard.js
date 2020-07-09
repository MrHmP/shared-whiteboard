const state = require('./../state');

exports.process = function (board) {
    console.log(`Adding board ${JSON.stringify(board)} to state`);
    state.addBoard(board);
    console.log(`Board added to state 👍`);
}