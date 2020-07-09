const socketService = require('./services/websocketService');
const state = require('./state');

try {
    socketService.initiateSocketConnection();
} catch (exception) {
    console.log(`Exception caught while initiating socket connection: ${exception}`);
}