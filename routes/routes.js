const adminController = require('../controllers/admin');
const foodController = require('../controllers/food');
const typeController = require('../controllers/type');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Admin = require('../models/admin');
//import controller
const session = require('express-session');
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//cấu hình Passport
router.use(
    session({
        secret: 'mysecret', //thuôc tính bắt buộc
        resave: true,
        saveUninitialized: true,
        cookie: {
            // maxAge: 1000 * 60 * 5,
        },
        //cookie sẽ tồn tại trong 5 phút, nếu xóa dòng code sau thì cookie sẽ hết hạn sau khi đóng trinh duyệt
    })
);

//2 hàm khởi tạo passport
router.use(Passport.initialize());
router.use(Passport.session());

//chứng thực thông tin đăng nhập trên mongoDB
Passport.use(
    new LocalStrategy(
        //email, password là name của thẻ input trong form login, nếu k khai báo mặc định sẽ là username, password
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        (username, password, done) => {
            Admin.findOne({ username: username, password: password }, function (err, user) {
                if (err) {
                    console.log(err);
                }
                if (user) {
                    //thành công sẽ trả về true với giá trị user
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

//sau khi chứng thức thành công passport sẽ gọi hàm .serializeUser() vói tham số user giá trị đã lưu bên trên
//chọn thuộc tính email của user để ghi vào cookie
Passport.serializeUser((user, done) => {
    done(null, user.username);
});
//biến cookieID chính là giá trị user.email bên trên
Passport.deserializeUser((cookieID, done) => {
    Admin.findOne({ username: cookieID }, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

//khai báo phương thức xác thực đăng nhập sau
const isAuthenticated = function (request, response, next) {
    if (request.isAuthenticated()) return next();
    response.redirect('/login'); //nếu chưa đăng nhập sẽ quay về trang login
};


//lấy dữ liệu từ form
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', Passport.authenticate('local', { successRedirect: '/index',
failureRedirect: '/login' }));

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', adminController.register);

// router.get('/editType', (req, res) => {
//     res.render('editType');
// });
router.get('/monan', isAuthenticated, foodController.getAll);
router.get('/loaimonan', isAuthenticated, typeController.getAll);

router.get('/loaimonan', (req, res) => {
    res.render('loaimonan');
});
router.post('/loaimonan', isAuthenticated, adminController.login);

router.get('/index', (req, res) => {
    res.render('index');
});

router.post('/index', isAuthenticated, adminController.login);
//get Food
router.get('/edit/:id', foodController.getFood);
//edit
router.post('/edit', foodController.edit);
//delete
router.get('/delete/:id', isAuthenticated, foodController.delete);

//get Type
router.get('/editType/:id', isAuthenticated, typeController.getType);
//edit
router.post('/editType', isAuthenticated, typeController.edit);
//delete
router.get('/deleteType/:id', isAuthenticated, typeController.delete);

//import modules
const multer = require('multer');
const path = require('path');

//import models
const Food = require('../models/food');
const Type = require('../models/type');

//cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    //kiểm tra file upload có phải là hình ảnh hay không
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5,//giới hạn filesize = 5Mb
    },
});

//phương thức upload file + insert dư liệu vào mongoDB
router.post('/upload', upload.single('hinhmonan'), (request, response) => {
    let food = new Food({
        tenmonan: request.body.tenmonan,
        giamonan: request.body.giamonan,
        loaimonan: request.body.loaimonan, 
        mota: request.body.mota,
        hinhmonan: request.file.originalname, //chỉ lấy tên file upload


    });

    food.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            response.redirect('/monan');
        }
    });
});
router.post('/uploadType', upload.single('loaihinhmonan'), (request, response) => {
    let type = new Type({
        maloai: request.body.maloai,
        tenloai: request.body.tenloai,
        loaihinhmonan: request.file.originalname, //chỉ lấy tên file upload


    });

    type.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            response.redirect('/loaimonan');
        }
    });
});

module.exports = router;



