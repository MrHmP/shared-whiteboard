const nanoid = require('nanoid');

module.exports = {
    appLog: function (msg) {
        console.log(`${new Date()} : ${msg}`);
    },
    appError: function (msg) {
        console.error(`${new Date()} : ${msg} 🤯`);
    },
    getRandomId: function (length) {
        length = length || 5;
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}