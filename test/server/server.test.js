const logger = require('./../../server/services/loggerService');
const { initiateSocketConnection } = require('./../../server/services/websocketService');
const server = require('./../../server/server');
jest.mock('./../../server/services/websocketService');

beforeEach(() => {
    initiateSocketConnection.mockImplementation(() => {
    });
});

jest.mock('./../../server/services/loggerService', () => {
    return {
        appLog: jest.fn().mockResolvedValue()
    }
});

test('should call socket initator', () => {
    expect(initiateSocketConnection).toHaveBeenCalledTimes(1);
});