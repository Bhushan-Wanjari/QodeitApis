var express = require("express");
var router = express.Router();
const Blog = require('../models/blog2');

router.post("/",function(req,res,next){

    const content = req.body;
	console.log(content);
   
    //var blog=[];
    Blog.find({title:content.title})
    .then((result) => {
        res.send(result);
     
    })
    .catch((err) => {
     console.log(err);
    });
})

module.exports=router;

//// Post Data
// {
//     "title":"modified blog5"
// }


//// Return Data is array of Objects