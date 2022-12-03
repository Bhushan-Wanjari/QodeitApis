var express = require("express");
var router = express.Router();
const Blog = require('../models/blog2');

router.get("/",function(req,res,next){
   
    Blog.find()
    .then((result) => {
     res.send(result);
    })
    .catch((err) => {
     console.log(err);
    });
})

module.exports=router;


//// Return Data is array of Objects