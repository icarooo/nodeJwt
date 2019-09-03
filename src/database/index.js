const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rest');
mongoose.Promise = global.Promise;

module.exports = mongoose;