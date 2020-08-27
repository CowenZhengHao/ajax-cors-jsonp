const path = require('path');
const express = require('express');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const app=express();
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded());
// app.use(bodyParser.json())
app.get("/first",(req,res)=>{
    res.send("hello");
});
app.get("/error",(req,res)=>{
    res.send("网络请求不存在")
});
app.get("/get",(req,res)=>{
    res.send({name:"cowen",age:32});
});
app.post("/post",(req,res)=>{
    res.send(req.body);
});
app.get("/form",(req,res)=>{
    res.send("Ok")
});
app.post("/form",(req,res)=>{
    res.send(req.body)
});
app.post('/formdata', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return false;
        }
        res.send(fields)
    })
});
app.listen("3000",()=>{
    console.log("服务已经开启");
})