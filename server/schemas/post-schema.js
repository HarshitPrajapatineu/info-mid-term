const { ObjectId } = require('mongodb');
var { mongoose } = require('../serivces/database-service');
var auth = require('../serivces/auth-service');


const postObj = {
    title: String,
    description: String,
    enablelike: String,
    createdOn: Date,
    createdBy: ObjectId,
    modifiedOn: Date,
    modifiedBy: ObjectId,
    postRole: String,
    IsDeleted: Boolean
}
const postSchema = new mongoose.Schema(postObj)

const schema = mongoose.model('Posts', postSchema)

async function findAllPost() {
    try {
        const docs = await schema.find({})
    } catch (error) {
        console.error('Error fetching posts:', error);
    }


}

async function findPostByUserId(userId) {
    let post;
    try {
        post = await schema.findOne({ createdBy: userId })
            .limit(1)
            .select({ _id: 1, title: 1, dexcription: 1, enablelike: 1, createdBy: 1, createdOn: 1 })
            .lean();
    } catch (error) {
        console.error('Error fetching post:', error);
    }
    return post;
}

async function createNewPost(postParam) {
    let post;
    try {
        post = new schema({
            title: postParam.title,
            description: postParam.description,
            enablelike: postParam.enablelike,
            createdOn: Date.now(),
            createdBy: postParam.userId,
            modifiedOn: Date.now(),
            modifiedBy: postParam.userId,
            IsDeleted: false
        })
        await post.save();
    } catch (error) {
        console.error('Error creating post:', error);
    }
    return post;
}

async function updatePost(postParam) {
    let output;
    try {
        const doc = await schema.findById(postParam._id);

        output = await doc.update({
            title: postParam.title,
            description: postParam.description,
            enablelike: postParam.enablelike,
            modifiedOn: Date.now(),
            modifiedBy: postParam.userId,
        })

        console.log(output);
    } catch (error) {
        console.error('Error updating post:', error);
    }
    return output;
}

async function deletePost(postParam) {

    try {
        const doc = await schema.findById(postParam._id);

        const output = await doc.update({
            title: postParam.title,
            description: postParam.description,
            enablelike: postParam.enablelike,
            modifiedOn: Date.now(),
            modifiedBy: postParam.userId,
        });
    }
    catch (error)  {
        console.error('Error deleting post:', error);

    }

    console.log(output);
    return output;
}


module.exports = {
    findAllPost: findAllPost,
    createNewPost: createNewPost,
    findPostByUserId: findPostByUserId,
    updatePost: updatePost,
    deletePost: deletePost
};