const mongoose = require('mongoose')
const url = 'mongodb://localhost/easyshare'
mongoose.connect(url, { useMongoClient: true }, (err) => {
  if (err) {
    console.log("Cannot connecting to: " + url)
  } else {
    console.log("Connected to: " + url)
  }
})
mongoose.Promise = global.Promise;
