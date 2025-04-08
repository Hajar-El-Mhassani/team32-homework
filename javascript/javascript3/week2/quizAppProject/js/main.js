import {
  fetchQuestions,
  quizQuestions,
  categoriesArray,
  postQuestion,
  updateCategorySelect,
  deleteQuestionFromCategory,
  Category,
  Question,
} from "./utils.js";

const form = document.getElementById("quizForm");
const selectCategory = document.getElementById("category-select");
const otherCategory = document.getElementById("otherCategory");
const message = document.querySelector(".returnText");
const quizListContainer = document.getElementById("quiz-list");
const playGameButton = document.querySelector(".playGame");
const searchInput = document.getElementById("searchInput");
const close = document.getElementById("close");
const questionList = document.getElementById("question-list");

const selectcategories = () => {
  updateCategorySelect(selectCategory);
  selectCategory?.addEventListener("change", () => {
    if (selectCategory.value == 14) {
      otherCategory.style.display = "block";
      otherCategory.focus();
    } else {
      otherCategory.style.display = "none";
    }
  });
};

const addNewCategory = () => {
  const newCatName = otherCategory.value.trim();
  if (newCatName !== "") {
    if (
      categoriesArray.find(
        (cat) => cat.name.toLowerCase() === newCatName.toLowerCase()
      )
    ) {
      message.innerHTML = `The category "${newCatName}" already exists!`;
      message.style.color = "red";
      return false;
    }
    const newCat = new Category(newCatName, categoriesArray.length + 1);
    categoriesArray.push(newCat);
    updateCategorySelect(selectCategory);
    return newCat;
  }
  return null;
};

const addQuestion = async (event) => {
  event.preventDefault();
  const questionInput = document.getElementById("question");
  const questionText = questionInput.value.trim();
  let selectedCategoryInstance = null;

  if (selectCategory.value == 14) {
    const newCat = addNewCategory();
    if (!newCat) return;
    selectedCategoryInstance = newCat;
  } else {
    const selectedVal = parseInt(selectCategory.value);
    selectedCategoryInstance = categoriesArray.find(
      (cat) => cat.value === selectedVal
    );
  }

  if (!selectedCategoryInstance) {
    message.innerHTML = "Please select a valid category.";
    message.style.color = "red";
    return;
  }

  const optionsText = Array.from(
    document.querySelectorAll(".option-input")
  ).map((input) => input.value.trim());
  const uniqueOptions = new Set(optionsText);
  if (uniqueOptions.size !== optionsText.length) {
    message.innerHTML = "Error: Answer options must be unique.";
    message.style.color = "red";
    return;
  }

  const correctAnswerRadio = document.querySelector(
    "input[name='correct']:checked"
  );
  if (!correctAnswerRadio) {
    message.innerHTML = "Please select the correct answer.";
    message.style.color = "red";
    return;
  }

  const correctIndex = parseInt(correctAnswerRadio.value);
  const options = optionsText.map((text, index) => ({
    text,
    isCorrect: index === correctIndex,
  }));

  if (!questionText || options.some((opt) => opt === "")) {
    message.innerHTML = "Please fill out all fields.";
    message.style.color = "red";
    return;
  }

  const exists = quizQuestions.some(
    (q) =>
      q.category.toLowerCase() ===
        selectedCategoryInstance.name.toLowerCase() &&
      q.question.toLowerCase() === questionText.toLowerCase()
  );

  if (exists) {
    message.innerHTML = `This question already exists in the "${selectedCategoryInstance.name}" category.`;
    message.style.color = "red";
    return;
  }

  const newQ = new Question(selectedCategoryInstance, questionText, options);
  await postQuestion(newQ, displayQuizCards, selectCategory);
  form.reset();
  otherCategory.style.display = "none";
  message.innerHTML = "Question Added Successfully!";
  message.style.color = "green";
};

const displayQuizCards = () => {
  if (!quizListContainer || !questionList) return;
  quizListContainer.innerHTML = "";

  const allCats = categoriesArray.filter(
    (cat) => cat.name.toLowerCase() !== "other"
  );
  allCats.forEach((cat) => {
    const category = cat.name;
    const questionsForCard = quizQuestions.filter(
      (q) => q.category.toLowerCase() === category.toLowerCase()
    );
    const card = document.createElement("div");
    card.className = "quiz-card";
    card.innerHTML = `
      <h3>${category}</h3>
      <p>${questionsForCard.length} question(s)</p>
      <button class="play-btn" ${
        questionsForCard.length === 0 ? "disabled" : ""
      }>Play</button>
    `;
    card.querySelector(".play-btn").addEventListener("click", () => {
      showQuestionsForCategory(category);
    });
    quizListContainer.appendChild(card);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  if (form && selectCategory) {
    selectcategories();
    form.addEventListener("submit", addQuestion);
  }
  if (quizListContainer) {
    fetchQuestions(selectCategory, searchInput, displayQuizCards);
  }
  if (playGameButton) {
    playGameButton.addEventListener("click", () => {
      window.location.href = "./startQuiz.html";
    });
  }
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const val = searchInput.value.trim();
      // You could apply filterCategories(val) here if needed
    });
  }
});

close?.addEventListener("click", () => {
  window.location.href = "./index.html";
});
