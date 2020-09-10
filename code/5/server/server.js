const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    next();
});

app.get("/1",(req,res)=>{
    res.send("Ok")
})

app.get("/2",(req,res)=>{
    res.json(req.query);
})
app.post("/2",(req,res)=>{
    res.send(req.body);
})
app.listen('4000',(req,res)=>{
    console.log('服务已经开启');
})