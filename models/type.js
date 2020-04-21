const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeScheme = new Schema({
    maloai: { type: String, unique: true },
    tenloai: { type: String },
    loaihinhmonan: { type: String },
});
//doan them dau
module.exports = mongoose.model('type', typeScheme);
