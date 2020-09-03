const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const Config={
    entry:{
        index:"./src/index.js"
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name]-bundle.js"
    },
    devServer:{
        hot:true,
        open:true,
        port:3000,
        contentBase:path.resolve(__dirname,"dist"),
        proxy:{
            "/":"http://localhost:3002"
        }
    },
    plugins:[
        new htmlWebpackPlugin({
            template:"./src/template/index.html",
            chunks:['index'],
            title:"首页",
            hash:true
        })
    ]
}
module.exports=Config;