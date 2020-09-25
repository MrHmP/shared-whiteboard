// Web socket connection initialiser
ws.onopen = function () {
    appLog('WebSocket Client Connected');
    ws.send(getMessageForServer(MESSAGE_TYPE.PING, 'Hi this is web client.'));
};

ws.onmessage = function (e) {
    let receivedData = JSON.parse(e.data);
    appLog(`Got message of type ${receivedData.type}`);
    switch (receivedData.type) {
        case MESSAGE_TYPE.BOARD_GET:
            showBoard(receivedData, false);
            break;
        case MESSAGE_TYPE.DRAW:
            drawFromStream(receivedData);
            break;
        case MESSAGE_TYPE.ATTENDEES_CHANGED:
            changeCollaboratorsCount(receivedData);
            break;
        default:
            break;
    }
};

function publish(data) {
    ws.send(getMessageForServer(MESSAGE_TYPE.DRAW,
        {
            drawing: data,
            board: JSON.parse(localStorage.getItem('board'))
        })
    );
}