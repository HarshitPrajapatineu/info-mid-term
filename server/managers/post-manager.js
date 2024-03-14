const { Timestamp } = require('mongodb');
var Post = require('../schemas/post-schema');
const User = require('../schemas/user-schema');


async function addNewPost(postParam, user) {
    return await Post.createNewPost(postParam, user);
}

function getAllPosts() {
    return Post.findAllPost();
}

async function getPostsForFeed(userId) {

    //2 ways to do it:
    // *Find list of users and then get all posts that they created and sort by creation time
    // *Find list of posts created by users from user schema and then fetch those posts and sort by creation time
    // -- Confusion in performance and which will be best for this usecase.

    const userlist = await User.findFollowingUsers(userId);
    
    return await Post.findPostByUserIds(null, userId)
    // return Post.();
}


async function updatePost(postParam, user) {
    return await Post.updatePost(postParam, user);
}

async function deletePost(id, user) {
    return await Post.deleteUser(id, user);
}

async function getPostById() {
    return await Post.findAllPost();
}

async function updateLike(postParam, user) {
    return await Post.updateLike(postParam, user)
}

module.exports = {
    addNewPost,
    getAllPosts,
    getPostsForFeed,
    updatePost,
    deletePost,
    updateLike
};