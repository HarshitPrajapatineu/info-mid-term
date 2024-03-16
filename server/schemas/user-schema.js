const { ObjectId } = require('mongodb');
var { mongoose } = require('../serivces/database-service');
var auth = require('../serivces/auth-service');


const userObj = {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    createdOn: Date,
    modifiedOn: Date,
    modifiedBy: String,
    userrole: String,
    IsDeleted: Boolean,
    following: [{ type: String, ref: 'Users' }], // Users this user is following
    followers: [{ type: String, ref: 'Users' }], // Users who are following this user
    posts: [{ type: String, ref: 'Posts' }], // Users who are following this user
}
const userSchema = new mongoose.Schema(userObj)

const schema = mongoose.model('Users', userSchema)


async function followUser(followedUserId, userId) {
    try {

        // Add followedUserId to the 'following' list of the user
        const res1 = await schema.findByIdAndUpdate(userId, { $addToSet: { following: followedUserId } });

        // Add userId to the 'followers' list of the followedUser
        const res2 = await schema.findByIdAndUpdate(followedUserId, { $addToSet: { followers: userId } });

        // console.log('User followed successfully');

        return res1 && res2;
    } catch (error) {
        console.error('Error following user:', error);
        return false;
    }
}

async function unfollowUser(unfollowedUserId, userId) {
    try {
        // Remove unfollowedUserId from the 'following' list of the user
        const res1 = await schema.findByIdAndUpdate(userId, { $pull: { following: unfollowedUserId } });

        // Remove userId from the 'followers' list of the unfollowedUser
        const res2 = await schema.findByIdAndUpdate(unfollowedUserId, { $pull: { followers: userId } });

        // console.log('User unfollowed successfully');
        return res1 && res2;
    } catch (error) {
        console.error('Error unfollowing user:', error);
        return false;
    }
}

async function addPostRefToUser(userId, postId) {
    try {
        const res1 = await schema.findByIdAndUpdate(userId, { $addToSet: { posts: postId } });
        // console.log('Post Ref added successfully');
        return res1 && res2;
    } catch (error) {
        console.error('Error Adding Post Ref:', error);
        return false;
    }
}

async function findAllUser() {
    let users;
    try {
        users = await schema.find({ IsDeleted: false }).lean();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    return users;
}

async function findfilteredUsers(filter, userId) {
    const { searchString, pagination } = filter;
    const page = pagination?.page ? pagination?.page : 0
    const pageSize = pagination?.pageSize ? pagination?.pageSize : 10
    const regex = new RegExp(searchString, 'i') // i for case insensitive
    let users;
    try {
        const userfollowingList = await schema.findOne({ _id: new ObjectId(userId), IsDeleted: false }, { _id: 0, following: 1 }).lean();
        // console.log(userfollowingList);
        users = await schema.aggregate()
            .match({
                $or: [
                    { firstname: { $regex: regex } },
                    { lastname: { $regex: regex } },
                    { email: { $regex: regex } }
                ],
                IsDeleted: false
            })
            .addFields({ isFollowed: { $in: [userId, '$followers'] } })
            .project({ IsDeleted: 0, __v: 0, password: 0, followers: 0, following: 0, posts: 0 })
            .skip(page * pageSize)
            .limit(pageSize);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    return users;
}

async function findUserById(id) {
    let user;
    try {
        user = await schema.aggregate([
            {
                $match:
                    { _id: new ObjectId(id), IsDeleted: false }
            },
            {
                $addFields: {
                    postCount: { $size: '$posts' },
                    followerCount: { $size: '$followers' },
                    followingCount: { $size: '$following' }
                }
            },
            {
                $project: {
                    IsDeleted: 0,
                    modifiedBy: 0,
                    modifiedOn: 0,
                    password: 0,
                    createdBy: 0,
                    createdOn: 0,
                    followers: 0,
                    following: 0,
                    posts: 0,
                    __v: 0
                }
            },
            {
                $limit: 1
            }
        ]);
    } catch (error) {
        console.error('Error fetching user:', error);
    }
    return user ? user[0] : false;
}

async function findUserByEmail(email) {
    const user = await schema.findOne({ email: email, IsDeleted: false })
        .select({ _id: 1, email: 1, lastname: 1, userrole: 1, password: 1 })
        .lean();
    return user;
}

async function findFollowingUsers(userId) {
    const user = await schema.findOne({ _id: userId, IsDeleted: false })
        .select({ following: 1, _id: 0 })
        .lean();
    return user;
}

async function findFollowerUsers(userId) {
    const user = await schema.find({ _id: userId, IsDeleted: false })
        .select({ followers: 1, _id: 0 })
        .lean();
    return user;
}

async function createNewUser(userParam, isAdminCreation = false) {

    const user = new schema({
        firstname: userParam.firstname,
        lastname: userParam.lastname,
        email: userParam.email,
        password: await auth.cryptPassword(userParam.password),
        createdOn: Date.now(),
        modifiedOn: Date.now(),
        userrole: isAdminCreation ? 'admin' : 'consumer',
        modifiedBy: null,
        IsDeleted: false,
        followingList: [],
        followerList: []
    })
    user.save();
    return user;
}


async function updateUser(userParam, user) {
    let res;
    try {
        const usr = await schema.findOne({ _id: userParam?._id, IsDeleted: false });
        res = usr.updateOne(
            {
                firstname: userParam.firstname,
                lastname: userParam.lastname,
                email: userParam.email,
                modifiedOn: Date.now(),
                password: (userParam.password ? await auth.cryptPassword(userParam.password) : usr.password),
                userrole: userParam.userrole,
                modifiedBy: user.id
            }).lean();

        return res;
    } catch (error) {
        console.error('Error fetching user:', error);
        return res;
    }
}

async function deleteUser(id, user) {
    let res;
    try {
        const usr = await schema.findById(id).find({ IsDeleted: false });
        res = usr.updateOne(
            {
                modifiedOn: Date.now(),
                modifiedBy: user.id,
                IsDeleted: true
            }).lean();

        return res;
    } catch (error) {
        console.error('Error fetching user:', error);
        return res;
    }
}

async function getUserCount() {
    let res;
    try {
        return await schema.find({ IsDeleted: false }).countDocuments();
    } catch (error) {
        console.error('Error fetching user:', error);
        return res;
    }
}


module.exports = {
    findAllUser: findAllUser,
    findfilteredUsers: findfilteredUsers,
    findUserById: findUserById,
    createNewUser: createNewUser,
    findUserByEmail: findUserByEmail,
    updateUser: updateUser,
    followUser: followUser,
    unfollowUser: unfollowUser,
    deleteUser: deleteUser,
    findFollowerUsers: findFollowerUsers,
    findFollowingUsers: findFollowingUsers,
    getUserCount: getUserCount,
    addPostRefToUser: addPostRefToUser
};