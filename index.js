const express=require('express');
require("dotenv").config();
const app =express();
const port= process.env.PORT || 8000;
const db=require('./config/sql');

// Parse URL-encoded and JSON request bodies
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// Register application routes
app.use('/',require('./routes/index.js')); 
// Start the Express server
app.listen(port, function(err){
    if(err)
    {
        console.log('Error in running on the port ',err);
    }
    console.log('yup server is running on port',port);

})
