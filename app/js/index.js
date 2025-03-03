document.addEventListener("DOMContentLoaded", function() {
    const header = document.getElementById("header");
    const text = "Welcome\nSpace Exploration Data Management System";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            if (text[index] === "\n") {
                header.innerHTML += "<br>";
            } else {
                header.innerHTML += text[index];
            }
            index++;
            setTimeout(typeEffect, 100);
        }
    }

    typeEffect();
});
