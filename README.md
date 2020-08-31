##  网络请求、同源策略与跨域

#### 目录导航：

- **请求的发送方法**
- **同源策略**
- **跨域的使用**
- **`RESETful`接口**

#### 1、请求的发送方法：

- **`ajax`概述：**

  `ajax`全称异步的 `JavaScript` 和 `XML`，通过在后台与服务器进行少量数据交换，`AJAX` 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

  - `XMLHttpRequest`：`XMLHttpRequest` 是 `AJAX` 的基础，基本上所有现代浏览器都支持。
  - `ActiveXObject`：老版本的`IE`使用`ActiveX`对象（不常用）。

- **请求发送：**

  `XMLHttpRequest`对象使用`xhr.open(method,url,async)`方法发送请求到服务器，一般传递三个参数：

  - `method`：发送请求的类型，`GET`或者`POST`。
  - `url`：发送请求的地址。
  - `async`：`true`（异步）或者`false`（同步）。

  ```javascript
  // 创建XMLHttpRequest请求对象
  const xhr =new XMLHttpRequest();
  // 定义请求方法和请求路径
  xhr.open("get","http://localhost:3000/first");
  // 请求发送
  xhr.send();
  // 接收响应
  xhr.onload=function(){
      console.log(xhr.responseText);
  }
  ```

- **请求参数的传递：**

  常见的请求方法有`GET`和`POST`方法，但是不同的请求方法在发送方法有所不同。

  - `GET`：`get`请求是以拼接字符串为原理的方式对服务器发送请求。
  - `POST`：`post`请求下，需要在请求报文中指定请求类型，也就是`Content-Type`类型，默认的是`text/plain`。

  ```javascript
  // Get请求
      const query = `name=cowen&&age=32`;
      const xhr = new XMLHttpRequest();
      xhr.open('get', `http://localhost:3000/getmethod?${query}`);
      xhr.send();
  // Post请求
      const query = `name=cowen&&age=32`;
      const xhr = new XMLHttpRequest();
      xhr.open('get', `http://localhost:3000/postmethod`);
      xhr.send(query);
  ```

- **`ajax`状态码和`onreadystatechange`：**

  当请求被发送到服务器时，需要执行一些基于响应的任务，`readyState`属性是记录`ajax`请求的状态码。而`onreadystatechange`事件则是记录状态码改变时的事件。

  - 0  请求未初始化 

  - 1  服务器连接已建立  

  - 2  请求已接收  

  - 3  请求处理中  

  - 4  请求已完成，且响应已就绪（此时可以任务请求已被成功响应）

  ```javascript
  const xhr = new XMLHttpRequest();
  xhr.open("get","http://localhost:3000/get");
  xhr.onreadystatechange=function(){
      if(xhr.readyState == "4" && xhr.status == 200){
      	/****/ 成功响应   
      }
  }
  ```

- **请求成功：**

  在检测`XMLHttpRequest`请求成功时，可以借助于`onreadystatechange()`事件和`readyState`状态值来处理，当然也可以检测`xhr.onload()`事件。

  `xhr.onload()`事件在低版本的IE浏览器下是不支持的（可以忽略）。

  ```javascript
  // onreadystatechange
  const xhr = new XMLHttpRequest();
  xhr.open('get','http://localhost:4000/get');
  xhr.send();
  xhr.onreadystatechange = function(){
      if(xhr.status==200 && xhr.readyState==4){
      	// 成功处理   
      }
  }
  // onload
  const xhr = new XMLHttpRequest();
  xhr.open('get','http://localhost:4000/get');
  xhr.send();
  xhr.onload = function(){
      if(xhr.status==200){
      	// 成功处理   
      }
  }
  ```

- **`ajax`错误处理：**

  `ajax`的请求错误跟很多因素有关，常见的错误有以下几种：

  - 网络畅通  服务器端能收到请求，但是返回的结果不是预期的（服务器端做成状态码响应，需要客户端针对不同状态码作出不同反馈）。 

  - 网络畅通  服务端没有接收到请求，返回404状态码。  

  - 网络畅通  服务器端能接受到请求，返回500状态码。  

  - 网络中断  请求无法发送到服务器端，这样只能触发xhr对象的`onerror`事件，在`onerror`事件处理函数中对错误进行处理。

  在`xhr`中，存在着`xhr.onerror`函数可以记录错误的返回信息。

- **同步和异步：**

  同步代码的执行默认是从上到下逐行执行，而异步代码虽然需要花费时间去执行，但程序不会等待异步代码执行完成后再继续执行后续代码，而是直接执行后续代码。

  在`XMLHttpRequest`中，使用`xhr.open()`方法传递是否为同步还是异步，默认的是异步传递，同步和异步的传递接收参数的方式是不同的。

  ```javascript
  // 同步请求
  	const xhr = new XMLHttpRequest();
  	xhr.open('get','http://localhost:4000/get',false);
  	xhr.send();
  	const res=xhr.responseText;
  // 异步请求
  	const xhr = new XMLHttpRequest();
  	xhr.open('get','http://localhost:4000/get',false);
  	xhr.send();
  	xhr.onload=function(){
          const res = xhr.responseText;
      }
  ```

- **请求头部：**

  客户端在向服务端发送请求时，在请求报文中，会将请求头信息一并传上，在请求头部信息中，包括`Content-Type`，`Cookie`等信息。`Content-Type`在处理`POST`请求时尤为重要，`POST`请求在默认状态下`Content-Type`设置为`text/plain`。

  - `Content-Type:text/plain`：纯文本格式
  - `Content-Type:text/html`：纯HTML格式
  - `Content-Type:application/x-www-form-urlencoded`：`POST`请求下，要设置`xhr`的请求头为`application/x-www-form-urlencoded`，当然服务端也要进行相应的设置。
  - `Content-Type:application/json`：`POST`请求下，设置`xhr`的请求头为`application/json`。

  客户端在修改请求头部信息时，相应的服务端也要修改接收的响应头信息。

  ```javascript
  // x-www-form-urlencoded
      const xhr = new XMLHttpRequest();
      xhr.open("post","http://localhost:3000/post");
      xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xhr.send("name=cowen&age=32");
      xhr.onload=function(){
          console.log(xhr.responseText)
      }
  // express后端接收
  	const boyParser = require('body-parser');
  	app.use(bodyParser.urlencoded());
      app.post("/post",(req,res)=>{
          res.send(req.body);
      });
  
  // json
      const xhr = new XMLHttpRequest();
      xhr.open("post","http://localhost:3000/post");
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.send(JSON.stringify({name:"cowen",age:32}))
      xhr.onload=function(){
          console.log(xhr.responseText)
      }
  // express后端接收
  	const bodyParser = require('body-parser');
  	app.use(bodyParser.json());
      app.post("/post",(req,res)=>{
          res.send(req.body);
      });
  ```

  

  > **注意：** 无论是`x-www.form-urlencode`还是`json`请求参数，其传值的格式都是字符串类型，只是前者是拼接的请求参数字符串，以`&`进行连接，而后者则是json格式通过`JSON.Stringfy()`转义的字符串。
  >
  > get请求是不能提交json对象数据格式的，传统网站的表单提交也是不支持json对象数据格式的。



- **表单请求：**

  在`ajax`出现之前，客户端在向服务端提交数据时，基本上使用的都是表单的`POST`提交，表单提交的`Conetnt-Type`可以通过`enctype`进行制定，表单默认情况下`Content-type:application/x-www-form-urlencoded`，在上传文件时，要更改为`multipart/form-data`。

  ```html
  <form method="POST" action="http://localhost:3000/form" enctype="multipart/form-data">
      <input type="text" name="username"><br />
      <input type="password" name="password"><br />
      <input type="submit" value="提交">
  </form>
  ```

- **`formData`概述：**

  `formData`可以认为是在模拟一个表单提交，将一个表单映射成一个表单对象。自动将表单对象中的数据拼接成请求参数的格式。

  `formData`是由`FormData`构造函数构成，需要传递一个表单对象。

  使用`formData`提交时，后端需要借助于`formidable`将提交过来的数据格式化，格式化之后才能获取对应的数据。

  ```javascript
  // 前台发请求
  const form = document.getElementById("form");
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open("post","http://localhost:3000/formdata");
  xhr.send(formData);
  xhr.onload=function(){
      if(xhr.status=="200"){
          console.log(xhr.responseText);
      }
  }
  // express 后台
  const path = require('path');
  const express = require('express');
  const formidable = require('formidable');
  const app = express();
  app.use(express.static(path.join(__dirname, "public")));
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
  app.listen(3000);
  ```

  也可以使用`formdata`中的各级方法追加数据，模拟一个表单数据进行提交。

  常见的`formData`的方法有以下几个：

  - `formData.get('key')`：获取表单对象属性的值。
  - `formData.set('key',value)`：设置表单对象的属性的值。
  - `formData.delete('key')`：删除表单对象的属性的值。
  - `formData.append('key',value)`：追加表单对象。

  

  > **`append`和`set`的不同：** `set`方法和`append`方法的区别是，在属性名已经存在的情况下，`set`会覆盖已有键名的值，`append`会保留两个值。



- **文件上传：**

  文件的上传，可以通过表单上传、base64位上传和`formData`二进制文件上传，使用`formData`上传时，需要使用`formidable`将数据格式化。

  ```javascript
  // express服务端
  const path = require('path');
  const express = require('express');
  const formidable = require('formidable');
  const app = express();
  app.use(express.static(path.join(__dirname, "public")));
  app.post('/fileupload',(req,res)=>{
      let form = new formidable.IncomingForm();
      form.uploadDir=path.join(__dirname,'public','upload');
      form.keepExtensions=true;
      form.parse(req, (err, fields, files) => {
          if (err) {
              console.log(err);
              return false;
          }
          const url=files.file.path.replace(path.join(__dirname,'public','upload'),"http://localhost:3000/upload/");
          res.send(url)
      })
  });
  ```

- **上传进度：**

  `XMLHttpRequest`对象中，定义了`xhr.upload`相关的事件，可以实现对上传开始前、上传中和上传结束后事件监听。

  ```javascript
  const progress= document.querySelector('.progress span'),
        formData=new FormData();
  formData.append("file",this.files[0]);
  const xhr = new XMLHttpRequest();
  xhr.open("post","http://localhost:3000/fileupload");
  xhr.upload.onprogress=function(e){
      let precent=parseInt((e.loaded/e.total)*100);
      progress.style.width=precent+"%";
  }
  xhr.send(formData);
  xhr.onload=function(){
      console.log(xhr.responseText);
  }
  ```

#### 2、同源策略：

- **同源的含义：**

  如果两个页面拥有**相同的协议**、**域名和端口**，那么这两个页面就属于同源，其中只要有一个不相同，就是不同源。

  同源策略是为了保证用户信息的安全，防止恶意的网站窃取数据，最初的同源策略是指不同网站下的cookie设置。

  同源策略是浏览器给予`Ajax`技术的限制，服务器端是不存在同源政策的限制的。

  ```javascript
  // 同源策略下的报错
  Access to XMLHttpRequest at 'http://localhost:4000/origin/?t=002' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
  ```

- **同源的限制范围：**

  随着互联网的发展，"同源政策"越来越严格。目前，如果非同源，共有三种行为受到限制。

  - `Cookie`、`LocalStorage` 和 `IndexDB` 无法读取。
  - `DOM` 无法获得。
  - `AJAX` 请求不能发送。

- **`CORS`跨域资源共享：**

  `CORS`全称为`Cross-origin resource sharing`，即跨域资源共享，它允许浏览器向跨域服务器发送Ajax请求，克服了Ajax只能同源使用的限制。

  `CORS`的定义使用`Access-Control-Allow-Origin`设置，如果是`*`，代表允许所有的客户端来访问。

  ```javascript
  const path=require('path');
  const express = require('express');
  const app=express();
  app.get("/origin",(req,res)=>{
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Methods","get,post");
      res.send("Ok");
  })
  ```

- **服务端同源转换：**

  **服务器端的访问不存在同源和非同源之说**，因此可以利用同源下的服务器去访问非同源的数据，然后再转换成同源下的请求。

  ```javascript
  const express = require('express');
  const request = require('request');
  const app=express();
  app.get("/convert",(req,res)=>{
      request("http://woool.sdo.com/web2/Handler/20180611_Live/GetDaoyuList.ashx",(err,response,body)=>{
          res.send(body);
      });
  })
  ```

- **非同源下的`Cookie`信息传递：**

  在使用`Ajax`技术发送跨域请求时，**默认情况下不会在请求中携带cookie信息**。这样就无法实现登录等信息验证请求了。

  - `xhr`开启`withCredentials`为`true`。
  - 后端代码要开启`Access-Control-Allow-Credentials`为`true`。
  - 允许请求的源要指定一个，不能为所有的源都允许了。

  ```javascript
  // xhr请求
  xhr.withCredentials=true;
  // express后端
  app.use((req,res,next)=>{
      res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
      res.setHeader("Access-Control-Allow-Credentials",true);
      next();
  });
  ```

- **代理的使用：**

#### 3、跨域的使用：

#### 4、`RESETful`接口：

#### 5、$.ajax、axios和fetch的区别：





