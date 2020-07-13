const state = require('../../../server/state');
const consumer = require('../../../server/message-consumers/newBoard');

jest.mock('./../../../server/state', () => {
    return {
        addBoard: jest.fn().mockResolvedValue()
    }
});

test('should call addBoard', () => {
    const board = { id: 1 };

    consumer.process(board);
    expect(state.addBoard).toHaveBeenCalledTimes(1);
    expect(state.addBoard).toHaveBeenLastCalledWith(board);
});