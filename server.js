const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const path = require('path');


const connectdb = require('./server/database/connection');

const app = express();

//path of config.env file
dotenv.config({
    path:'config.env'
})
const PORT = 1900 

//mongodb connection
connectdb();

// pars request to body parser
app.use(bodyParser.urlencoded({extended:true}))


app.set('view engine','ejs');

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css"))) 
app.use('/js',express.static(path.resolve(__dirname,"assets/js"))) 
app.use('/image',express.static(path.resolve(__dirname,"assets/image"))) 

// load routers
app.use('/',require('./server/routes/router'))



app.listen(PORT);
