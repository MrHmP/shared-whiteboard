const socketService = require('./controllers/websocketServer');
const logger = require('./services/loggerService');

try {
    socketService.initiateSocketConnection();
} catch (exception) {
    logger.appError(`Exception caught while initiating socket connection: ${exception}`);
}