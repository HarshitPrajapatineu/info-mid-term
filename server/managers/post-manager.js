const { Timestamp } = require('mongodb');
var Post = require('../schemas/post-schema');


async function addNewPost(postParam) {
    return await Post.createNewPost(postParam);
}

function getAllPosts() {
    return Post.findAllPost();
}

function getPostById() {
    return Post.findAllPost();
}

module.exports = {addNewPost, getAllPosts};