const { ObjectId } = require('mongodb');
var { mongoose } = require('../serivces/database-service');
var auth = require('../serivces/auth-service');


const postObj = {
    title: String,
    description: String,
    enablelike: String,
    createdOn: Date,
    createdBy: String,
    modifiedOn: Date,
    modifiedBy: String,
    postRole: String,
    IsDeleted: Boolean,
    likedBy: [{ type: String, ref: 'Users' }]
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
        const res = await post.save();
    } catch (error) {
        console.error('Error creating post:', error);
    }
    return post;
}

async function updatePost(postParam, user) {
    let output;
    try {
        const doc = await schema.findById(postParam._id);

        output = await doc.updateOne({
            title: postParam.title,
            description: postParam.description,
            enablelike: postParam.enablelike,
            modifiedOn: Date.now(),
            modifiedBy: user.id,
        })

        // console.log(output);
    } catch (error) {
        console.error('Error updating post:', error);
    }
    return output;
}

async function deletePost(id, user) {
    let output
    try {
        const doc = await schema.findById(id);

        output = await doc.updateOne({
            modifiedOn: Date.now(),
            modifiedBy: user.id,
            IsDeleted: true
        });
    }
    catch (error) {
        console.error('Error deleting post:', error);

    }

    // console.log(output);
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

async function findPostByUserIds(userIds, userId) {
    let res;
    try {
        // console.log(userIds);
        res = await schema.aggregate()
            .match(
                userIds ? { 'createdBy': { $in: userIds }, IsDeleted: false } : { IsDeleted: false }
                // userIds ? {  $in:[createdBy, userIds?.following] , IsDeleted: false } : { IsDeleted: false }
            )
            .addFields({
                likeCount: { $size: '$likedBy' },
                isLiked: { $in: [userId, '$likedBy'] }  // Calculate like count using the $size operator
            })
            .project({
                likedBy: 0, // Exclude the 'likes' field from the output if not needed
                IsDeleted: 0,
                modifiedBy: 0,
                modifiedOn: 0,
                __v: 0
            })
            .limit(10)
            .sort({ createdOn: -1 });

        return res;
    } catch (error) {
        console.error('Error fetching user:', error);
        return res;
    }
}

async function updateLike(postParam, user) {
    let res;
    try {
        if (postParam?.action === "add") {

            return await schema.findByIdAndUpdate(postParam.id, { $addToSet: { likedBy: user?.id } });
        } else if (postParam?.action === "remove") {

            return await schema.findByIdAndUpdate(postParam.id, { $pull: { likedBy: user?.id } });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res;
    }
}

async function getPost(id) {
    let res;
    try {
        return await schema.findOne({ _id: new ObjectId(id), IsDeleted: false })
            .select({ _id: 1, title: 1, description: 1, enablelike: 1 }).lean();
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
    findPostByUserIds: findPostByUserIds,
    updateLike: updateLike,
    getPost: getPost
};