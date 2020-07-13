const socketService = require('./services/websocketService');
const logger = require('./services/loggerService');

try {
    console.log('HERE');
    socketService.initiateSocketConnection();
    console.log('NOW HERE');
} catch (exception) {
    logger.appLog(`Exception caught while initiating socket connection: ${exception}`);
}