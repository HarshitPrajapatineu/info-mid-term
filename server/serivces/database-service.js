// change it to require
const  {createClient} = require('redis');

const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:admin@test-cluster-damg.cpb7twp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri).then(// console.log('Connected to Mongo DB'));


const client = createClient({
    password: 'admin',
    socket: {
        host: 'redis-16914.c323.us-east-1-2.ec2.cloud.redislabs.com',
        port: 16914
    }
});

module.exports =  {mongoose: mongoose, redisClient: client};
