const login = document.querySelector(".login"),
    check = document.querySelector(".check"),
    form = document.getElementById("form");
login.addEventListener("click", () => {
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open("post", "http://localhost:3001/login");
    xhr.withCredentials = true;
    xhr.send(formData);
    xhr.onload = function () {
        console.log(xhr.responseText);
    }
})


check.addEventListener("click",()=>{
    const xhr = new XMLHttpRequest();
    xhr.open("get","http://localhost:3001/checklogin");
    xhr.withCredentials = true;
    xhr.send();
    xhr.onload=()=>{
        console.log(xhr.responseText)
    }
})