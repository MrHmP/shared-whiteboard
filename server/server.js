const socketService = require('./services/websocketService');
const state = require('./state');
const logger = require('./services/loggerService');

function appLog(msg) {
    console.log(`${new Date()} : ${msg}`);
}

try {
    socketService.initiateSocketConnection();
} catch (exception) {
    logger.appLog(`Exception caught while initiating socket connection: ${exception}`);
}