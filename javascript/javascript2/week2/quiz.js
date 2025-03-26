let quizQuestions = [];

const formContainer = document.getElementById("quizForm");
const optionsContainer = document.getElementById("options");
const quizList = document.getElementById("quizList");

formContainer.addEventListener("submit", (event) => {
  event.preventDefault();

  let questionText = document.getElementById("question").value.trim();
  let selectedRadio = document.querySelector('input[name="correct"]:checked');

  if (!selectedRadio) {
    alert("Please select the correct answer.");
    return;
  }

  let optionInputs = document.querySelectorAll(".option-input");
  let options = [];
  optionInputs.forEach((input, index) => {
    options.push({
      text: input.value.trim(),
      isCorrect: index == selectedRadio.value,
    });
  });

  let newQuestion = {
    id: quizQuestions.length + 1,
    question: questionText,
    options: options,
  };

  quizQuestions.push(newQuestion);
  updateQuizList();
  formContainer.reset();
});

const randomizeOptions = () => {
  let optionsArray = Array.from(document.querySelectorAll(".option"));

  let shuffledOptions = optionsArray
    .map((option) => ({
      element: option.cloneNode(true),
      text: option.querySelector(".option-input").value,
      isChecked: option.querySelector("input[type='radio']").checked,
    }))
    .sort(() => Math.random() - 0.5);

  optionsContainer.innerHTML = "";
  shuffledOptions.forEach((item, index) => {
    let newOption = item.element;
    newOption.querySelector(".option-input").value = item.text;
    newOption.querySelector("input[type='radio']").checked = item.isChecked;
    newOption.querySelector("input[type='radio']").value = index;
    optionsContainer.appendChild(newOption);
  });
};

const updateQuizList = () => {
  quizList.innerHTML = "";
  quizQuestions.forEach((quiz, index) => {
    let quizItem = document.createElement("div");
    quizItem.classList.add("quiz-item");

    quizItem.innerHTML = `
            <p><strong>Q${index + 1}:</strong> ${quiz.question}</p>
            <button class="show-answer" onclick="revealAnswer(${index})">Show Correct Answer</button>
            <p class="hidden-answer" id="answer-${index}" style="display:none;">Correct Answer: ${
      quiz.options.find((opt) => opt.isCorrect).text
    }</p>
        `;

    quizList.appendChild(quizItem);
  });
};

const revealAnswer = (index) => {
  document.getElementById(`answer-${index}`).style.display = "block";
};
