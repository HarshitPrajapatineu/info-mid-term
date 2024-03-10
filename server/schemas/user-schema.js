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
    modifiedBy: ObjectId,
    userRole: String,
    IsDeleted: Boolean
}
const userSchema = new mongoose.Schema(userObj)

const schema = mongoose.model('Users', userSchema)

async function findAllUser() {
    let users;
    try {
        users = await schema.find({}).lean();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    return users;
}

async function findfilteredUsers(filter) {
    let users;
    try {
        users = await schema.find(filter, { IsDeleted: 0, __v: 0, password: 0 }).lean();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    return users;
}

async function findUserById(id) {

    schema.findById(id, (err, user) => {
        {
            if (err) {
                console.error('Error fetching user:', err);
                return;
            }
            console.log('All users:', user);
            return user;
        }
    })
}

async function findUserByEmail(email) {
    const user = await schema.findOne({ email: email }).limit(1).select({ _id: 1, email: 1, lastname: 1, userRole: 1, password: 1 }).lean();
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
        userRole: isAdminCreation ? 'admin' : 'consumer',
        modifiedBy: null,
        IsDeleted: false
    })
    user.save();
    return user;
}


module.exports = {
    findAllUser: findAllUser,
    findfilteredUsers: findfilteredUsers,
    findUserById: findUserById,
    createNewUser: createNewUser,
    findUserByEmail: findUserByEmail
};