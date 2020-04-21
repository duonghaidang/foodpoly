const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodScheme = new Schema({
    tenmonan: { type: String },
    giamonan: { type: String },
    mota: { type: String },
    loaimonan: { type: String },
    hinhmonan: { type: String },
});
//doan them dau
module.exports = mongoose.model('food', foodScheme);
