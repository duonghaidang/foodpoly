const Food = require('../models/food');
const Type = require('../models/type');

//get All
exports.getAll = async (request, response) => {
    try {
        let foods = await Food.find({});
        response.send(foods);
    } catch (error) {
        console.log(error);
    }
};

exports.getFood= async (request, response) => {
    try {
        let food = await Food.findById(request.params.id);
        response.send(food);
    } catch (error) {
        console.log(err);
    }
};

//edit
exports.editFood = async (request, response) => {
    try {
        let food = await Food.findById(request.params.id);
        food.set(request.body);
        let result = await food.save();
        response.send(result);
    } catch (error) {
        console.log(err);
    }
};

//xóa
exports.deleteFood = async (request, response) => {
    try {
        let result = await Food.deleteOne({ _id: request.params.id });
        response.send(result);
    } catch (error) {
        console.log(err);
    }
};

//get All Type
exports.getAllType = async (request, response) => {
    try {
        let types = await Type.find({});
        response.send(types);
    } catch (error) {
        console.log(error);
    }
};

//get All Type
exports.getTheLoai = async (request, response) => {
    try {
        let food = await Food.find({loaimonan: request.params.id});
        response.send(food);
    } catch (error) {
        console.log(error);
    }
};