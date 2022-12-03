var express = require("express");
var router = express.Router();
const Subscribers = require('../models/subscribers');
var validator = require("email-validator");




router.post("/",function(req,res,next){
  const content = req.body;
  console.log(content);
  var val = validator.validate(content.email);
  if(val){
    const subscriber= new Subscribers({
      email: content.email,
      subscribed: content.subscribed,
      location: content.Location
    });
  
    subscriber.save()
      .then((result)=>{
      res.send(result)
    })
    .catch((err) =>{
      console.log(err);
    });
  }
  else{
    res.send("INVALID EMAIL");
  }

});


module.exports=router;


// {
//   "email": "bhusa@gmail.com",
//   "subscribed": true,
//   "Location": "India"
// }