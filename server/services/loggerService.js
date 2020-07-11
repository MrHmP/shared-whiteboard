const nanoid = require('nanoid');

exports.appLog = function (msg) {
    console.log(`${new Date()} : ${msg}`);
}

exports.getRandomId = function (length) {
    return nanoid.random(5);
}