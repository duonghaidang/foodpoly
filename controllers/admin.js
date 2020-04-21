// Import model
const Admin = require('../models/admin');

exports.login = function(req, res){

    Admin.findOne({username: req.body.username}).then(function(data){
        if(data){
            if(data.password = req.body.password) {
                res.redirect('index')
            }
        }
    });
};

exports.register = function (req, res) {
    const username1 = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    if(password != password2) {
        console.log('Password do not match');
    } else {
        let newAdmin = new Admin({
            username: username1,
            password: password,
        })
        newAdmin.save(function(err){
            if(err){
                console.log(err);
                return;
            } else{
                res.render('login')
            }
        })
    }
};