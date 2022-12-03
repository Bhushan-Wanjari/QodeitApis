var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
var logger = require('morgan');
var mongoose = require('mongoose');


///// Blog Models
const Blogmod= require("./models/blog.js");
const Blogimg= require("./models/blogWithImg.js");


var cors=require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



allRoutes= require("./routes/allRoutes");
testAPIRouter= require("./routes/testAPI");
addBlog= require("./routes/addBlog");
getBlogs= require("./routes/getBlogs");
getBlogTitle= require("./routes/getBlogByTitle");
getBlogsByType= require("./routes/getBlogsByType");

addSubscriber = require("./routes/subscriberApi");
getSubscribers = require("./routes/getSubscribers");

var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//PORT ENVIRONMENT VARIABLE  MONGODB Connect
const port = process.env.PORT || 8000;
const CONNECTION_URL= process.env.MONGODB_URL || "mongodb+srv://QodeitUser:qodeit@qodeitblogs.jmwrpmb.mongodb.net/qodeitBlogs?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_URL).then((result)=> {
  console.log("connected");
})
.catch((err)=> console.log("error"));




/////  view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



///// Routes to use

app.use('/', indexRouter);
app.use('/routes', allRoutes);
app.use('/users', usersRouter);
app.use("/testAPI",testAPIRouter);
app.use("/add-blog",addBlog);
app.use("/get-blogs",getBlogs);
app.use("/get-blog-title",getBlogTitle);
app.use("/get-blog-by-type",getBlogsByType);

app.use("/get-subs",getSubscribers);
app.use("/add-sub",addSubscriber);



///// With Image        Path is "/add-blogimg"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/add-blogimg", upload.single("testImage"), (req, res) => {
  const saveBlog =  Blogimg({
    title: req.body.title,
    tags: req.body.tags,
    content: req.body.content,
    author: req.body.author,
    topic: req.body.topic,
    image: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveBlog
    .save()
    .then((res) => {
      console.log("Blog is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send('Blog is saved')
});



app.get("/get-blogimg",function(req,res,next){
   
  Blogimg.find()
  .then((result) => {
   res.send(result);
  })
  .catch((err) => {
   console.log(err);
  });
});


app.post("/get-blogimg-title",function(req,res,next){

  const content = req.body;
  console.log(content);
 
  //var blog=[];
  Blogimg.find({title:content.title})
  .then((result) => {
      res.send(result);
  })
  .catch((err) => {
   console.log(err);
  });
});






////// Starter and Error Listen Statesments


app.listen(port, () => {
  console.log(`Listening on port ${port}..`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
