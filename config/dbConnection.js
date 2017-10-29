const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/easyshare',{useMongoClient: true})
mongoose.Promise = global.Promise;
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected to Mongoose")
});
