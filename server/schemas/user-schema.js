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

const findAllUser = () => {

    schema.find({}, (err, users) => {
        {
            if (err) {
                console.error('Error fetching users:', err);
                return;
            }
            console.log('All users:', users);
            return users;
        }
    })
}

const findUserById = (id) => {

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

async function findUserByEmail (email)  {
    const user = await  schema.findOne({ email: email }).limit(1).select({_id: 1, email: 1, lastname:1, userRole: 1, password: 1}).lean();
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
        userRole: isAdminCreation? 'admin': 'consumer',
        modifiedBy: null,
        IsDeleted: false
    })
    user.save();
    return user;
}


module.exports = {
    findAllUser: findAllUser,
    findUserById: findUserById,
    createNewUser: createNewUser,
    findUserByEmail: findUserByEmail
};