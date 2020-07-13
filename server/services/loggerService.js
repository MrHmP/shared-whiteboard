const nanoid = require('nanoid');

module.exports = {
    appLog : function (msg) {
        console.log(`${new Date()} : ${msg}`);
    },
    getRandomId : function (length) {
        return nanoid.random(length || 5);
    }
}