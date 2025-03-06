const quizQuestion = {
  id: 1,
  question: "What is the capital of Denmark?",
  options: [
    { text: "Berlin", isCorrect: false },
    { text: "Copenhagen", isCorrect: true },
    { text: "Madrid", isCorrect: false },
    { text: "Rome", isCorrect: false },
  ],
  explanation: "Copenhagen is the capital of Denmark.",
};

const insertQuestion = () => {
  const question = document.querySelector(".question");

  question.textContent =
    quizQuestion.question.length > 140
      ? quizQuestion.question.slice(0, 137) + "..."
      : quizQuestion.question;
};

const randomBtn = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const insertButton = () => {
  const groupBtn = document.querySelector(".btn-group");
  groupBtn.innerHTML = ""; // Clear previous buttons
  const explanation = document.querySelector(".explanation");
  explanation.innerText = ""; // Reset explanation

  const buttonOptions = randomBtn([...quizQuestion.options]);
  for (let i = 0; i < buttonOptions.length; i++) {
    const btn = document.createElement("button");
    btn.innerText = buttonOptions[i].text;
    btn.classList.add("answer-btn");

    // Add click event to check if the answer is correct
    btn.addEventListener("click", () => {
      // Reset all button colors first
      document.querySelectorAll(".answer-btn").forEach((b) => {
        b.style.backgroundColor = "";
        b.disabled = true;
      });

      if (buttonOptions[i].isCorrect) {
        btn.style.backgroundColor = "green";
        explanation.innerText = "Correct!";
      } else {
        btn.style.backgroundColor = "red";
        explanation.innerText = `Incorrect! ${quizQuestion.explanation}`;
      }
      btn.disabled = true;
    });
    groupBtn.appendChild(btn);
  }
};
const random = () => {
  insertButton();
};
insertQuestion();
insertButton();
