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
    IsDeleted: Boolean,
    likedBy: [{ type: ObjectId, ref: 'Users' }]
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

async function createNewPost(postParam, user) {
    let post;
    try {
        post = new schema({
            title: postParam.title,
            description: postParam.description,
            enablelike: postParam.enablelike,
            createdOn: Date.now(),
            createdBy: user.id,
            modifiedOn: Date.now(),
            modifiedBy: user.id,
            IsDeleted: false
        })
        await post.save();
    } catch (error) {
        console.error('Error creating post:', error);
    }
    return post;
}

async function updatePost(postParam, user) {
    let output;
    try {
        const doc = await schema.findById(postParam._id);

        output = await doc.update({
            title: postParam.title,
            description: postParam.description,
            enablelike: postParam.enablelike,
            modifiedOn: Date.now(),
            modifiedBy: user.id,
        })

        console.log(output);
    } catch (error) {
        console.error('Error updating post:', error);
    }
    return output;
}

async function deletePost(postParam, user) {

    try {
        const doc = await schema.findById(postParam._id);

        const output = await doc.update({
            modifiedOn: Date.now(),
            modifiedBy: user.id,
            IsDeleted: true
        });
    }
    catch (error)  {
        console.error('Error deleting post:', error);

    }

    console.log(output);
    return output;
}

async function getPostCount() {
    let res;
    try {
        return await schema.find({ IsDeleted: false }).countDocuments();
    } catch (error) {
        console.error('Error fetching user:', error);
        return res;
    }
}

async function findPostByUserIds(userIds) {
    let res;
    try {
        res = await schema.find(userIds ? { createdBy: { $in: userIds }, IsDeleted: false }: { IsDeleted: false})
        .sort({createdOn: 1})
        .limit(10)
        .lean();
        return res;
    } catch (error) {
        console.error('Error fetching user:', error);
        return res;
    }
}


module.exports = {
    findAllPost: findAllPost,
    createNewPost: createNewPost,
    findPostByUserId: findPostByUserId,
    updatePost: updatePost,
    deletePost: deletePost,
    getPostCount: getPostCount,
    findPostByUserIds: findPostByUserIds
};