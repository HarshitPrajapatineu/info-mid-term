
var User = require('../schemas/user-schema');
function addNewUser(name, username, password) {

    const user = new User({
        name: name,
        username: username,
        password: password,
    })

    user.save();
}

function getAllUsers() {

    const user = new User({
        name: name,
        username: username,
        password: password,
    })

    return user.get();
}

module.exports = {addNewUser, getAllUsers};