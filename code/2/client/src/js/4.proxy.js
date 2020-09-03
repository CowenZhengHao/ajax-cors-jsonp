const proxy = document.querySelector(".proxy");
proxy.addEventListener("click",()=>{
    const xhr = new XMLHttpRequest();
    xhr.open("get","/proxy");
    xhr.send();
    xhr.onload=()=>{
        console.log(xhr.responseText)
    }
})