const socketService = require('./services/websocketService');
const logger = require('./services/loggerService');

try {
    socketService.initiateSocketConnection();
} catch (exception) {
    logger.appLog(`Exception caught while initiating socket connection: ${exception}`);
}