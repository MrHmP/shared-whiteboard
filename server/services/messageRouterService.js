const newBoardProcessor = require('./../message-consumers/newBoard');
const getBoardProcessor = require('./../message-consumers/getBoard');
const drawProcessor = require('./../message-consumers/draw');
const { addConnectionForBoard } = require('./connectionHandlerService');

function handleIncomingMessage(message, connection) {
    const incomingData = JSON.parse(message.utf8Data);
    const messageType = incomingData.type;

    switch (messageType) {
        case 'DRAW':
            drawProcessor.process(incomingData.board, incomingData.drawing);
            try {
                logger.appLog(`Sending data to ${connections[incomingData.board.id].length} locations`);
                connections[incomingData.board.id].forEach(con => {
                    logger.appLog(`Sending draw request✏️`);
                    con.sendUTF(JSON.stringify(incomingData));
                });
            }
            catch (ex) {
                logger.appLog(ex);
            }
            break;
        case 'BOARD_GET':
            let fetchedBoard = getBoardProcessor.process(incomingData);
            if (fetchedBoard) {
                addConnectionForBoard(incomingData.bid, connection);
                fetchedBoard["type"] = 'BOARD_GET';
            }
            connection.sendUTF(JSON.stringify(fetchedBoard));
            break;
        case 'BOARD_ADDED':
            addConnectionForBoard(incomingData.id, connection);
            newBoardProcessor.process(incomingData);
            connection.sendUTF(JSON.stringify({ 'Status': 'OK', 'type': 'BOARD_ADDED' }));
            break;
        default:
            break;
    }
}

module.exports = { handleIncomingMessage }