const state = require('./../../server/state');
const logger = require('./../../server/services/loggerService');
const nanoId = require('nanoid');

getNewBoard = () => {
    return {
        'id': nanoId.random(4),
        'name': 'NAME',
        'drawings': [{}, {}]
    }
};

jest.mock('./../../server/services/loggerService', () => {
    return {
        appLog: jest.fn().mockResolvedValue(),
        getRandomId: jest.fn().mockResolvedValue()
    }
});

test('should return undefined for non-existent board', () => {
    const boardFromState = state.getBoard('NON_EXISTENT_ID');
    expect(boardFromState).toBeUndefined();
});

test('should not save already saved board', () => {
    const board = getNewBoard();
    state.addBoard(board);
    state.addBoard(board);
    expect(logger.appLog).toHaveBeenCalledTimes(1);
    expect(logger.appLog).toHaveBeenLastCalledWith(`Can't add board, this ${board.id} already exists`);
});

test('should return saved board', () => {
    const board = getNewBoard();
    state.addBoard(board);
    const boardFromState = state.getBoard(board.id);
    expect(boardFromState).toEqual(board);
});

test('should add drawing to board', () => {
    const board = getNewBoard();
    state.addBoard(board);
    const newDrawing = { color: 'gold' };
    const newDrawings = state.getBoard(board.id).drawings.concat([newDrawing]);
    state.addDrawings(board.id, newDrawing);
    expect(state.getBoard(board.id).drawings)
        .toEqual(newDrawings);
});

test('should add drawing to a new board', () => {
    const board = {
        'id': nanoId.random(4),
        'name': 'NAME'
    };
    state.addBoard(board);
    const newDrawing = { color: 'gold' };
    state.addDrawings(board.id, newDrawing);
    expect(state.getBoard(board.id).drawings)
        .toEqual([newDrawing]);
});