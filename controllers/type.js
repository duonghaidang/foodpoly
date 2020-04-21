const Type = require('../models/type');

//get tất cả sản phẩm
exports.getAll = function (request, response) {
    Type.find({})
        .lean()
        .exec(function (error, data) {
            response.render('loaimonan', { typeList: data.reverse()});
            if (error) {
                log(error);
            }
        });
};

//get 1 sản phẩm
exports.getType = function (request, response) {
    console.log("di lay san pham =))")
    //ham nay nhua lay dc me
    console.log(request.params.id)
    Type.findById({_id: request.params.id})
        .lean()
        .exec((err, doc) => {
            if (!err) {
                console.log(doc);
                response.render('edit', { Type: doc });//ma ong khong co edit.hbs, nen k co data Type
            }
        });
};

//chỉnh sửa
exports.edit = function (request, response) {
    Type.updateOne(

        { _id: request.body._id },
        { $set: { loaihinhmonan: request.body.loaihinhmonan, maloai: request.body.maloai, tenloai: request.body.tenloai} },
        (err, doc) => {
            if (!err) {
                response.redirect('/loaimonan');
            } else {
                console.log('Edit Failed');
            }
        }
    );
};

//xóa sản phẩm
exports.delete = function (request, response) {
    Type.deleteOne({ _id: request.params.id }, (err, doc) => {
        if (!err) {
            response.redirect('/loaimonan');
        } else {
            console.log(err);
        }
    });
};

