var express = require('express');
var bodyParser = require('body-parser');
var app = express();
console.log("Hello world");

app.use("/public" , express.static(__dirname + "/public"));

app.use((req , res,next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
next();
} , bodyParser.urlencoded({extended : false}));


app.get("/hello express" , function (req , res)  {
  console.log("Express");
  res.send("Hello Express");
});

app.get("/", (req, res) => res.sendfile(__dirname + "/views/index.html"));

app.get("/json", (req ,res) => {
  var mySecret = process.env['MESSAGE_STYLE']
  let data = {message:"Hello json"};
  if(mySecret === "uppercase")
      data.message = data.message.toUpperCase();

  console.log(data);
  res.json(data)});

   const appendTime = (req , res ,next) => {
    req.time = new Date().toString();
    next();
  }

  app.get("/now" , appendTime ,(req , res) => res.json({ time : req.time }));

  app.get("/:coder/echo" , (req , res) => {
    res.json({
      echo : req.params.coder
    })
  });

  var handler = (req , res) => {
     res.json({
       name : `${req.body.first} ${req.body.last}`
     });
  }

  app.route("/name").get(handler).post(handler);

 

























 module.exports = app;
