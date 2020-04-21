const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {type:String, unique: true, required: true, trim: true},
    password: {type:String, required: true, trim: true}
});

module.exports = mongoose.model('admin', adminSchema);