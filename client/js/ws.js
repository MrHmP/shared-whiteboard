// Web socket connection initialiser
ws.onopen = function () {
    appLog('WebSocket Client Connected');
    ws.send(getMessageForServer(MESSAGE_TYPE.PING, 'Hi this is web client.'));
};

ws.onmessage = function (e) {
    let receivedData = JSON.parse(e.data);
    appLog(`Got message of type ${receivedData.type}`);
    if (receivedData.type === MESSAGE_TYPE.BOARD_GET) {
        showBoard(receivedData, false);
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