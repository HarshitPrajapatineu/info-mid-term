
var User = require('../schemas/user-schema');
function addNewUser(user) {

    const usr = new User({
        name: user.name,
        username: user.username,
        password: user.password,
    })

    usr.save();
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