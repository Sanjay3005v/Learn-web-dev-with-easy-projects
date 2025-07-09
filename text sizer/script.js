const text = document.getElementById("text");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");

let fontSize = 19; 

increaseBtn.addEventListener("click", () => {
  fontSize += 2;
  text.style.fontSize = fontSize + "px";
});

decreaseBtn.addEventListener("click", () => {
  if (fontSize > 10) {
    fontSize -= 2;
    text.style.fontSize = fontSize + "px";
  }
});
