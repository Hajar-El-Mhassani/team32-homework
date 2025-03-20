const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of Denmark?",
    options: [
      { text: "Berlin", isCorrect: false },
      { text: "Copenhagen", isCorrect: true },
      { text: "Madrid", isCorrect: false },
      { text: "Rome", isCorrect: false },
    ],
    explanation: "Copenhagen is the capital of Denmark.",
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: [
      { text: "Berlin", isCorrect: false },
      { text: "Paris", isCorrect: true },
      { text: "Barcelona", isCorrect: false },
      { text: "Amsterdam", isCorrect: false },
    ],
    explanation: "Paris is the capital of France.",
  },
];

// Select a random question initially
let currentQuestion =
  quizQuestions[Math.floor(Math.random() * quizQuestions.length)];

const questionElement = document.querySelector(".question");
const groupBtn = document.querySelector(".btn-group");
const explanation = document.querySelector(".explanation");

// Create "Next" button
const btnContainer = document.querySelector(".btn-container");
const nextBtn = document.createElement("button");
nextBtn.innerText = "Next Question";
nextBtn.classList.add("next-btn");
nextBtn.disabled = true;
nextBtn.style.backgroundColor = "gray"; // Disable button initially
btnContainer.appendChild(nextBtn);

const insertQuestion = () => {
  questionElement.textContent =
    currentQuestion.question.length > 140
      ? currentQuestion.question.slice(0, 137) + "..."
      : currentQuestion.question;
};

const randomBtn = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

const insertButton = () => {
  groupBtn.innerHTML = ""; // Clear previous buttons
  explanation.innerText = ""; // Reset explanation
  nextBtn.disabled = true; // Disable "Next" button until an answer is selected
  nextBtn.style.backgroundColor = "gray";
  const buttonOptions = randomBtn([...currentQuestion.options]);
  buttonOptions.forEach((option) => {
    const btn = document.createElement("button");
    btn.innerText = option.text;
    btn.classList.add("answer-btn");

    // Add click event to check if the answer is correct
    btn.addEventListener("click", () => {
      // Disable all buttons after clicking one
      document.querySelectorAll(".answer-btn").forEach((b) => {
        b.style.backgroundColor = "";
        b.disabled = true;
      });

      if (option.isCorrect) {
        btn.style.backgroundColor = "green";
        explanation.innerText = "Correct!";
      } else {
        btn.style.backgroundColor = "red";
        explanation.innerText = `Incorrect! ${currentQuestion.explanation}`;
      }

      // Enable "Next Question" button after selecting an answer
      nextBtn.disabled = false;
      nextBtn.style.backgroundColor = "#FEDC3D";
    });

    groupBtn.appendChild(btn);
  });
};

// Initialize quiz on page load
const resetBtn = document.getElementsByClassName("random");

resetBtn[0].addEventListener("click", () => {
  insertButton();
});
insertQuestion();
insertButton();
