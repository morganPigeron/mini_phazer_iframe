console.log("Start parent");

const childIp = "http://localhost:8000"

window.addEventListener("message", (event) => {
    console.log("In parent :", event.data, "origin :", event.origin);
});

const iframe = document.getElementById("game");

iframe.contentWindow.postMessage("hello from parent", childIp);


