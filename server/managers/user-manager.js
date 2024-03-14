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

async function followUser(followedUserId, userId) {
    return User.followUser(followedUserId, userId);
}
async function unfollowUser(unfollowedUserId, userId) {
    return User.unfollowUser(unfollowedUserId, userId);
}

async function getAllUsers() {
    return await User.findAllUser();
}

async function getfilteredUsers(filter, userId) {
    return await User.findfilteredUsers(filter, userId);
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