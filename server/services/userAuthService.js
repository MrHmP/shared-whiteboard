let loggedInUsers = [];

exports.userLogIn = function (userName) {
    let loggedInUser = loggedInUsers.filter(x => x.name === userName);
    if (!loggedInUser) {
        loggedInUser = {
            name: userName
        };
        loggedInUser.push(loggedInUser);
    }

    let oldExpiry = loggedInUser.expiry || new Date();
    let newExpiry = new Date();
    newExpiry.setTime(oldExpiry.getTime() + (30 * 60 * 1000));
    loggedInUser.expiry = newExpiry;

    return loggedInUser;
}

exports.userLogOut = function (userName) {
    loggedInUser = loggedInUser.filter(x => x.name !== userName);
}