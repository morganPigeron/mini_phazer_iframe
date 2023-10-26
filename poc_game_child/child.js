console.log("Start child");

window.addEventListener("message", (event) => {
    console.log("In child :", event.data, "origin :", event.origin);
});

window.parent.postMessage("hello from child", "http://localhost:8000");
