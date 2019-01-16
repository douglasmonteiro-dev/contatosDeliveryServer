const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nutriBD', {  useCreateIndex: true, useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;