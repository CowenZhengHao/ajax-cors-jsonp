const xhr=new XMLHttpRequest();
xhr.open("get","http://localhost:3001/list");
xhr.send();
xhr.onload=()=>{
    if(xhr.status=="200" && xhr.readyState=="4"){
        console.log(xhr.responseText);
    }
}