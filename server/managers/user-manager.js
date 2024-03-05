const { Timestamp } = require('mongodb');
var User = require('../schemas/user-schema');


function addNewUser(userParam) {
    return User.createNewUser(userParam);
}

function getAllUsers() {
    return User.findAllUser();
}

function getUserById() {
    return User.findAllUser();
}

module.exports = {addNewUser, getAllUsers};