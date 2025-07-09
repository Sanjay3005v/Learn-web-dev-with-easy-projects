const colorPicker = document.getElementById("colorPicker");
const colorInput = document.getElementById("colorInput");

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

colorPicker.addEventListener("input", function () {
    const color = colorPicker.value;
    changeBackgroundColor(color);
    colorInput.value = color;
});

colorInput.addEventListener("input", function () {
    changeBackgroundColor(colorInput.value);
});
