const { Timestamp } = require('mongodb');
var Post = require('../schemas/post-schema');
const User = require('../schemas/user-schema');


async function addNewPost(postParam, user) {
    const post = await Post.createNewPost(postParam, user);

    if (post) {
        await User.addPostRefToUser(user.id, post._id);
    }
    return post
}

function getAllPosts() {
    return Post.findAllPost();
}

async function getPostsForFeed(userId) {

    //2 ways to do it:
    // *Find list of users and then get all posts that they created and sort by creation time
    // *Find list of posts created by users from user schema and then fetch those posts and sort by creation time
    // -- Confusion in performance and which will be best for this usecase.

    let userlist = await User.findFollowingUsers(userId);
    userlist.following.push(userId)

    return await Post.findPostByUserIds(userlist?.following, userId)
    // return Post.();
}

async function getPostsForUser(userId) {

    //2 ways to do it:
    // *Find list of users and then get all posts that they created and sort by creation time
    // *Find list of posts created by users from user schema and then fetch those posts and sort by creation time
    // -- Confusion in performance and which will be best for this usecase.
    const userList = [userId]
    return await Post.findPostByUserIds(userList, userId)
    // return Post.();
}


async function updatePost(postParam, user) {
    return await Post.updatePost(postParam, user);
}

async function deletePost(id, user) {
    return await Post.deletePost(id, user);
}

async function getPostById() {
    return await Post.findAllPost();
}

async function updateLike(postParam, user) {
    return await Post.updateLike(postParam, user)
}
async function getPost(id) {
    return await Post.getPost(id)
}

module.exports = {
    addNewPost,
    getAllPosts,
    getPostsForFeed,
    updatePost,
    deletePost,
    updateLike,
    getPost,
    getPostsForUser
};