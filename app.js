const express = require('express');
const mongoose = require('mongoose');
const app = express();
const databaseConfig = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');


//Routes import
const farmer = require('./routes/farmer');
const vegetables = require('./routes/vegetables');

//Databse Port
const PORT = process.env.PORT || 5000;


//Database Connection
mongoose.connect(databaseConfig.database, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{console.log('Connected to the Database...')})
        .catch((error)=>{
            console.log(error);
        })


//Cors
app.use(cors());


//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Uploads folder Setup
app.use('/uploads', express.static('uploads'));


//Routing
app.use('/farmers', farmer);
app.use('/vegetables', vegetables);


//Server
app.listen(PORT, function() {
    console.log(`server running at ` + PORT);
});


module.exports = app;