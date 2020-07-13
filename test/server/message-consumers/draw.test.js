const state = require('./../../../server/state');
const consumer = require('./../../../server/message-consumers/draw');

jest.mock('./../../../server/state', () => {
    return {
        addDrawings: jest.fn().mockResolvedValue()
    }
});

test('should call addDrawings', () => {
    const board = { id: 1 };
    const drawing = { 'a': 'b' };

    consumer.process(board, drawing);
    expect(state.addDrawings).toHaveBeenCalledTimes(1);
    expect(state.addDrawings).toHaveBeenLastCalledWith(board.id, drawing);
});