const express = require('express');
const mongoose = require('mongoose');
const adminRoute = require('./routes/routes.js');
const expressHbs = require('express-handlebars');
const APIRoute = require('./routes/API.js');

const app = express();

app.use(adminRoute);
app.use(APIRoute);
app.use(express.static('./uploads'));
app.use(express.static('public'));

// app.use('*/css', express.static('public/css'));
// app.use('*/js', express.static('public/js'));
// app.use('*/images', express.static('public/images'));

mongoose.set('useCreateIndex', true);

app.listen(process.env.PORT||3011, () => {});

mongoose.connect(
    'mongodb+srv://admin:admin@cluster0-cmoqa.gcp.mongodb.net/test?retryWrites=true&w=majority',
    {useUnifiedTopology: true, useNewUrlParser: true},
    function(err) {
        if(err) {
            console.log('Can not connect to mongodb, because', err);
        } else{
            console.log('Connect to mongodb successful');
        }
    }
);

//cấu hình handlebars
app.set('views', __dirname + '/views');
app.engine('.hbs', expressHbs({defaultLayout: '',}));
app.set('view engine', '.hbs');

