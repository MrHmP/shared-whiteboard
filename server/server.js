const socketService = require('./services/websocketService');

try {
    socketService.initiateSocketConnection();
} catch (exception) {
    console.log(`Exception caught while initiating socket connection: ${exception}`);
}