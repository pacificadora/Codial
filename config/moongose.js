const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codial_developement');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to database"))


db.once('open', function(){
    console.log("Connected to database :: MongoDB");
})

module.exports = db;