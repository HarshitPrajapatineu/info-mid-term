var {mongoose} = require('../serivces/database-service');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
})

const User = mongoose.model('Users', userSchema)

module.exports = User;