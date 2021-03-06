const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log("请求来了");
    next();
});
app.get("/", (req, res) => {
    res.send("Ok");
});
app.get("/jsonp1", (req, res) => {
    const data = { name: "cowen", age: 32 };
    const callback = `callback(${JSON.stringify(data)})`;
    res.send(callback)
});

app.get("/jsonp2", (req, res) => {
    const data = { name: "cowen", age: 32, time: new Date().getTime() };
    const fnName = req.query.callback;
    res.send(`${fnName}(${JSON.stringify(data)})`);
})
app.listen("3000", () => {
    console.log("服务已经开启");
})