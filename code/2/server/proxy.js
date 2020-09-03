const express = require('express');
const app=express();


app.get("/proxy",(req,res)=>{
    res.send("代理请求成功")
});
app.listen("3002",()=>{
    console.log("服务已经开启");
})