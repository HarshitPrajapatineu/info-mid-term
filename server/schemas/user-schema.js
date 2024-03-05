const { ObjectId } = require('mongodb');
var { mongoose } = require('../serivces/database-service');
var auth = require('../serivces/auth-service');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    createdOn: Date,
    modifiedOn: Date,
    modifiedBy: ObjectId,
    IsDeleted: Boolean
})

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

const findUserByEmail = (email) => {

    schema.findOne({email: email, IsDeleted: false}, (err, user) => {
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

function createNewUser(userParam){

    const user = new schema({
        fname: userParam.fname,
        lname: userParam.lname,
        email: userParam.email,
        password: auth.cryptPassword(userParam.password),
        createdOn: Date.now(),
        modifiedOn: Date.now(),
        modifiedBy: null
    })
    let newUser = {};
    user.save();
    return user;
}


module.exports = {
    findAllUser: findAllUser,
    findUserById: findUserById,
    createNewUser: createNewUser,
    findUserByEmail: findUserByEmail
};