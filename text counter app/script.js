const textInput = document.getElementById("textInput");
const wordCountDisplay = document.getElementById("word-count");
const charCountDisplay = document.getElementById("char-count");

function updateCounts() {
  const text = textInput.value;
  const charCount = text.length;
  const wordCount = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;

  charCountDisplay.textContent = charCount;
  wordCountDisplay.textContent = wordCount;
}

textInput.addEventListener("input", updateCounts);
