const nanoId = require('nanoid');
const logger = require('./../../../server/services/loggerService');

jest.mock('nanoid', () => {
    return {
        random: jest.fn().mockResolvedValue()
    }
});

test('should generate nanoId', () => {
    logger.getRandomId(2);
    expect(nanoId.random).toHaveBeenCalledTimes(1);
    expect(nanoId.random).toHaveBeenLastCalledWith(2);
});

test('should generate nanoId', () => {
    logger.getRandomId();
    expect(nanoId.random).toHaveBeenCalledTimes(2);
    expect(nanoId.random).toHaveBeenLastCalledWith(5);
});