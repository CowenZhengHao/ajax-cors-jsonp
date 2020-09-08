const express = require('express');
const app = express();
// 获取用户列表
app.get("/users", (req, res) => {
    let list = [{ name: "cowen", age: 32 }];
    res.json(list);
});

// 添加新用户
app.post("/users", (req, res) => {
    let result = {
        time: new Date().getTime(),
        info: {
            name: "cowen",
            age: 32
        }
    };
    res.json(result);
});

// 获取指定id的用户信息
app.get("/user/:id", (req, res) => {
    let result = {};
    result.id = req.params.id;
    result.info = { name: "cowen", age: 32 };
    res.json(result);
});

// 更新指定id的用户信息
app.put("/user/:id", (req, res) => {
    let result = { status: "Ok", info: { name: "cowen", age: 32 } };
    res.json(result);
});

// 删除指定id的用户信息
app.delete('/user/:id', (req, res) => {
    let result={msg:`${req.params.id}的信息已经被删除`};
    res.json(result);
});

app.listen("3000", () => {
    console.log("服务已经开启");
})