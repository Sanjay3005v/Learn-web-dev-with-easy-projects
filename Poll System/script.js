const options = [
  { id: "option1", text: "JavaScript", votes: 0 },
  { id: "option2", text: "Python", votes: 0 },
  { id: "option3", text: "Java", votes: 0 },
  { id: "option4", text: "C++", votes: 0 },
];

document.querySelectorAll('input[name="poll"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const selectedText = radio.value;
    const selectedOption = options.find((opt) => opt.text === selectedText);
    if (selectedOption) {
      selectedOption.votes++;
      displayResult();
    }
  });
});

function displayResult() {
  const result = document.getElementById("result");
  result.innerHTML = "";

  const totalVotes = options.reduce((acc, o) => acc + o.votes, 0);

  options.forEach((option) => {
    const percentage = totalVotes ? ((option.votes / totalVotes) * 100).toFixed(1) : 0;

    const optionResult = document.createElement("div");
    optionResult.className = "option-result";
    optionResult.innerHTML = `
      <span class="option-text">${option.text}</span>
      <div class="bar-container">
        <div class="bar" style="width: ${percentage}%"></div>
      </div>
      <span class="percentage">${percentage}%</span>
    `;

    result.appendChild(optionResult);
  });
}

displayResult();
