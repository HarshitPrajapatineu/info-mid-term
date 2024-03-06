const { Timestamp } = require('mongodb');
var User = require('../schemas/user-schema');


async function addNewUser(userParam) {
    return await User.createNewUser(userParam);
}

function getAllUsers() {
    return User.findAllUser();
}

function getUserById() {
    return User.findAllUser();
}

module.exports = {addNewUser, getAllUsers};