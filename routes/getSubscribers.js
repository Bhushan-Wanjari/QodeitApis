var express = require("express");
var router = express.Router();
const Subscribers = require('../models/subscribers');

router.get("/",function(req,res,next){
   
    Subscribers.find()
    .then((result) => {
     res.send(result);
    })
    .catch((err) => {
     console.log(err);
    });
})

module.exports=router;