const mongoose = require('mongoose');

//require database URL from properties file
const dbURL = process.env.DATABASE_URL;


//export this function and imported by server index.js
module.exports = function(){

    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', function(){
        console.log("Mongoose default connection is open");
    });

    mongoose.connection.on('error', function(err){
        console.log('Mongoose default connection has occurred error', err);
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });
}