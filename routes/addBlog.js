var express = require("express");
var router = express.Router();
const Blogmod = require('../models/blog2');
const multer = require("multer");
const fs = require("fs");



router.post("/",function(req,res,next){
  const content = req.body;
  console.log(content);

  const blog= new Blogmod({
    title:content.title,
    image: content.image,
    tags:content.tags,
    content:content.content,
    topic:content.topic,
    author:content.author,
    blogtype: content.blogtype
  });

  blog.save()
    .then((result)=>{
    res.send(result)
  })
  .catch((err) =>{
    console.log(err);
  });
});


module.exports=router;


//// Post Data Schema

// {
//   "title":"modified blog5",
//   "image":"src string",
//   "tags": ["tag1","tag2"],
//   "content":[
//     {
//       "subheading":"s1",
//       "subcontent":"c1",
//       "uls":["ul1","ul2","ul3"],
//       "image":"https://google.com"
//     },
//     {
//       "subheading":"s2",
//       "subcontent":"c2",
//       "uls":["ul1","ul2","ul3"],
//       "image":"https://google.com"
//     },
//     {
//       "subheading":"s3",
//       "subcontent":"c3",
//       "uls":["ul1","ul2","ul3"],
//       "image":"https://google.com"
//     }
//   ],
//   "author":{
//     "name":"bhushan5",
//     "image":"image",
//     "about":"about"
//   },
//   "topic":"topic5",
//   "blogtype":"main"
// }