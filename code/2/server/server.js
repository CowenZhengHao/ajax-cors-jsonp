const express = require('express');
const app = express();
const formidable = require('formidable');
const session = require('express-session');
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: ('name', 'value', { maxAge: 5 * 60 * 1000, secure: false })
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
app.get("/list", (req, res) => {
    res.send("get list");
});
app.post("/login", (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fileds, files) => {
        if (fileds.username == "cowen") {
            req.session.islogin=true;
            res.json({ status: 200, message: "登录成功" })
        } else {
            res.json({ status: 200, message: "登录失败" })
        }
    })
});
app.get("/checklogin",(req,res)=>{
    if(req.session.islogin){
        res.json({status:200,message:"您已经成功登录"});
    }else{
        res.json({status:200,message:"您尚未登录"});
    }
})
app.listen("3001", () => {
    console.log("服务已经开启");
})