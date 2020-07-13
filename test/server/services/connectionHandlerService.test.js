const nanoId = require('nanoid');
const logger = require('./../../../server/services/loggerService');
const { addConnectionForBoard, deleteConnectionForBoard, getConnectionForBoard } = require('./../../../server/services/connectionHandlerService');

jest.mock('nanoid', () => {
    return {
        random: jest.fn().mockResolvedValue()
    }
});
jest.mock('./../../../server/services/loggerService', () => {
    return {
        appLog: jest.fn().mockResolvedValue(),
        getRandomId: jest.fn().mockResolvedValue()
    }
});

test('should add a new connection', () => {
    const dummyConnection1 = { 'test': 1 };
    const dummyConnection2 = { 'test': 2 };
    addConnectionForBoard(1, dummyConnection1);
    addConnectionForBoard(1, dummyConnection2);
    const connections = getConnectionForBoard(1);
    expect(connections.length).toEqual(2);
    expect(connections).toContain(dummyConnection1);
    expect(connections).toContain(dummyConnection2);
    expect(connections[0].boardId).toBeTruthy();
    expect(connections[0].sharedBoardId).toBeTruthy();
    expect(connections[1].boardId).toBeTruthy();
    expect(connections[1].sharedBoardId).toBeTruthy();
});