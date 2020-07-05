require('dotenv').config();
const express = require('express');
const flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const app = express();
const {globalMiddleware} = require('./middleware/middleware')
const mongoose = require('mongoose');
mongoose.connect(process.env.connectionString, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => app.emit('database-connection-ready'))
.catch(e => console.log(e));


const routes = require('./routes');
const path = require('path');

app.use(express.urlencoded({extended : true}));
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(globalMiddleware);
app.use(routes);

app.on('database-connection-ready', () => {
    app.listen(3000, () => {
        console.log('App started. Access http://localhost:3000');
    });
});
