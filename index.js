const express = require('express')
const cookieParser = require('cookie-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 8000;
const db = require('./config/moongose');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended', //expanded suggestion came
    prefix: '/css'
}))



app.use(express.urlencoded());

app.use(cookieParser());


app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);


//extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//now we will add a middleware that takes up the session cookie and encrypt it using express-session
//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            //mongooseConnection: db,
            //this is done differently in the videos, due to different versions of connect-mongo
            mongoUrl: 'mongodb://localhost:27017',
            autoRemove: 'disabled',
        },
        function(err){
            console.log(err || 'connect-mongo db setup ok');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(customMware.setFlash);

//use express router
//creating the middleware.
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${port}`)
    }
    console.log(`Server is up and running at port: ${port}`)
})