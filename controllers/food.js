const Food = require('../models/food');
const Type = require('../models/type');

//get tất cả sản phẩm
exports.getAll = function (request, response) {
    Type.find({})
        .lean()
        .exec(function (error, tl) {
            if (error) {
                console.log(error);
            } else {
                Food.find()
                    .populate('maloai')
                    .lean()
                    .exec(function (error, data) {
                        response.render('monan', { foodList: data.reverse(), typeList: tl});
                        if (error) {
                            console.log(error)
                        }
                    })
            }
        });
};

//get 1 sản phẩm
exports.getFood = function (request, response) {
    Food.findById({_id: request.params.id})
        .lean()
        .exec((err, doc) => {
            if (!err) {
                response.render('edit', { Food: doc });
            }
        });
};

//chỉnh sửa
exports.edit = function (request, response) {
    Food.updateOne(
        {_id: request.body._id },
        {$set: {tenmonan: request.body.tenmonan, giamonan: request.body.giamonan,
            loaimonan: request.body.loaimonan, mota: request.body.mota} },
        (err, doc) => {
            if (!err) {
                response.redirect('/monan');
            } else {
                console.log('Edit Failed');
            }
        }
    );
};

//xóa sản phẩm
exports.delete = function (request, response) {
    Food.deleteOne({ _id: request.params.id }, (err, doc) => {
        if (!err) {
            response.redirect('/monan');
        } else {
            console.log(err);
        }
    });
};

