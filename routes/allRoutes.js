var express = require("express");
var router = express.Router();

router.get("/",function(req,res,next){
   
    res.send("ALL AVAILABLE ROUTES :\n 1) add-blog\n 2) get-blogs\n 3) get-blog-title");
})

module.exports=router;