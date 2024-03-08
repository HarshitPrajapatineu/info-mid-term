const { Timestamp } = require('mongodb');
var User = require('../schemas/user-schema');


async function addNewUser(userParam) {
    return await User.createNewUser(userParam);
}

async function getAllUsers() {
    return await User.findAllUser();
}

async function getfilteredUsers(filter) {
    return await User.findfilteredUsers(filter);
}

async function getUserById() {
    return await User.findAllUser();
}

module.exports = {addNewUser, getAllUsers, getfilteredUsers};