function callback(data){
    console.log("打印结果")
    console.log(data);
}
const script=document.createElement("script");
script.src="http://localhost:3000/jsonp1";
document.body.append(script);
script.onload=()=>{
    document.body.removeChild(script);
}