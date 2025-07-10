function checkVowels() {
  const text = document.getElementById("inputText").value.toLowerCase().trim();
  let vowelCount = 0;
  const vowels = ["a", "e", "i", "o", "u"];

  for (let char of text) {
    if (vowels.includes(char)) vowelCount++;
  }

  document.getElementById("result").textContent = `Result: ${vowelCount} vowel${vowelCount !== 1 ? 's' : ''}`;
}
