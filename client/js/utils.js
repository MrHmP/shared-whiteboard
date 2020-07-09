const ws = new WebSocket(`ws://${window.location.hostname}:9898`);

const MESSAGE_TYPE = {
    DRAW: 'DRAW',
    BOARD_ADDED: 'BOARD_ADDED',
    PING: 'PING',
    BOARD_GET: 'BOARD_GET'
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getBoardIdFromURL(param) {
    return new URLSearchParams(window.location.search).get(param);
}

function getMessageForServer(type, data) {
    let message = {};
    if (isJson(data)) {
        data['type'] = type;
        message = data;
    } else {
        message['type'] = type;
        message.data = data;
    }
    console.log(message);
    return JSON.stringify(message);
}

function isJson(obj) {
    var t = typeof obj;
    return ['boolean', 'number', 'string', 'symbol', 'function'].indexOf(t) == -1;
}

const delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();