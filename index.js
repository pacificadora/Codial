const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 8000;

app.use(expressLayouts);

//use express router
//creating the middleware.
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${port}`)
    }
    console.log(`Server is up and running at port: ${port}`)
})