const { Timestamp } = require('mongodb');
var User = require('../schemas/user-schema');


async function addNewUser(userParam) {
    return await User.createNewUser(userParam);
}

async function updateUser(userParam, user) {
    return await User.updateUser(userParam, user);
}

async function deleteUser(id, user) {
    return await User.deleteUser(id, user);
}

async function followUser(userId, followedUserId) {
    return User.followUser(userId, followedUserId);
}
async function unfollowUser(userId, unfollowedUserId) {
    return User.unfollowUser(userId, unfollowedUserId);
}

async function getAllUsers() {
    return await User.findAllUser();
}

async function getfilteredUsers(filter) {
    return await User.findfilteredUsers(filter);
}

async function getUserById(id) {
    return await User.findUserById(id);
}

module.exports = {
    addNewUser,
    getAllUsers,
    getfilteredUsers,
    getUserById,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser
};