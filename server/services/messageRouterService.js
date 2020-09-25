const newBoardProcessor = require('./../message-consumers/newBoard');
const getBoardProcessor = require('./../message-consumers/getBoard');
const drawProcessor = require('./../message-consumers/draw');
const logger = require('./loggerService');

function handleIncomingMessage(message, connection) {
    const incomingData = JSON.parse(message.utf8Data);
    const messageType = incomingData.type;

    logger.appLog(`Got message of type ${messageType}`);

    switch (messageType) {
        case 'DRAW':
            drawProcessor.process(incomingData.board, incomingData.drawing);
            break;
        case 'BOARD_GET':
            getBoardProcessor.process(incomingData, connection);
            break;
        case 'BOARD_ADDED':
            newBoardProcessor.process(incomingData, connection);
            break;
        case 'PING':
            logger.appLog('ping');
            break;
        default:
            break;
    }
}

module.exports = { handleIncomingMessage }