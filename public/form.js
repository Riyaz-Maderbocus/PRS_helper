// alert("hello");

const form = document.querySelector("#form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    // alert("form halted");
    console.log("halt form");
})