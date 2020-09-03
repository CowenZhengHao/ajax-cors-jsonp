const path =  require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const Config={
    entry:{
        "index":"./src/index.js"
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:'[name]-bundle.js'
    },
    devServer:{
        hot:true,
        open:true,
        port:4000,
        contentBase:path.resolve(__dirname,"dist")
    },
    plugins:[
        new HtmlwebpackPlugin({
            chunks:["index"],
            template:"./src/template.html",
            inject:"body",
            title:"首页"
        })
    ]
}

module.exports=Config;