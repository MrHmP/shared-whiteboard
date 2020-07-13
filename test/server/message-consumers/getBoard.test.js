const state = require('../../../server/state');
const consumer = require('../../../server/message-consumers/getBoard');
const logger = require('./../../../server/services/loggerService');

jest.mock('./../../../server/state', () => {
    return {
        getBoard: jest.fn().mockImplementation((id) => {
            return id === 1 ?
                { 'status': 'FOUND' } :
                null
        })
    }
});

jest.mock('./../../../server/services/loggerService', () => {
    return {
        appLog: jest.fn().mockResolvedValue()
    }
});

test('should get drawings', () => {
    const board = { bid: 1 };
    const drawing = { 'a': 'b' };

    const fetchedBoard = consumer.process(board);
    expect(state.getBoard).toHaveBeenCalledTimes(1);
    expect(fetchedBoard).toEqual({ 'status': 'FOUND' });
    expect(logger.appLog).toHaveBeenCalledTimes(2);
    expect(logger.appLog).toHaveBeenLastCalledWith(`Got non null board from state 👍`);
});

test('should not get drawings for illegal board', () => {
    const board = { bid: 2 };
    const drawing = { 'a': 'b' };

    const fetchedBoard = consumer.process(board);
    expect(fetchedBoard).toBeNull();
    expect(logger.appLog).not.toHaveBeenLastCalledWith(`Got non null board from state 👍`);
});