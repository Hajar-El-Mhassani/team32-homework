// Replaced localStorage with a fetch to get data from API
const API_URL =
  "https://raw.githubusercontent.com/Hajar-El-Mhassani/Hajar-El-Mhassani.github.io/main/quizData/quiz/questionQuiz.json";

let quizQuestions = [];
let apiQuestions = [];

// Get form elements
const form = document.getElementById("quizForm");
const selectCategory = document.getElementById("category-select");
const otherCategory = document.getElementById("otherCategory");
const message = document.querySelector(".returnText");
const quizListContainer = document.getElementById("quiz-list");
const playGameButton = document.querySelector(".playGame");
const searchInput = document.getElementById("searchInput");
const close = document.getElementById("close");
const questionList = document.getElementById("question-list");

// Category Class
class Category {
  /**
   * Constructor for the Category class.
   * @param {string} name - The name of the category.
   * @param {number} value - The value of the category.
   */
  constructor(name, value) {
    /**
     * The name of the category.
     * @type {string}
     */
    this.name = name;
    /**
     * The value of the category.
     * @type {number}
     */
    this.value = value;
  }

  // Add this category as an option in the select element
  addToDropdown() {
    const option = document.createElement("option");
    option.value = this.value;
    option.textContent = this.name;
    selectCategory.appendChild(option);
  }

  // Check if this category exists in the provided categories array
  existsIn(categoriesArray) {
    return categoriesArray.some(
      (cat) => cat.name.toLowerCase() === this.name.toLowerCase()
    );
  }
}

// Question Class
class Question {
  constructor(category, questionText, options, explanation = "") {
    // Here, category is a Category instance
    this.category = category;
    this.questionText = questionText;
    this.options = options;
    this.explanation = explanation;
  }
}

// Global array of categories as instances of Category
let categoriesArray = [
  new Category("General Knowledge", 1),
  new Category("Books", 2),
  new Category("Film", 3),
  new Category("Music", 4),
  new Category("Musicals & Theatres", 5),
  new Category("Television", 6),
  new Category("Video Games", 7),
  new Category("Board Games", 8),
  new Category("Science & Nature", 9),
  new Category("Computers", 10),
  new Category("Mathematics", 11),
  new Category("Mythology", 12),
  new Category("Sports", 13),
  new Category("Other", 14),
];

// Fetch questions from API and merge with localStorage
const fetchQuestions = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (Array.isArray(data)) {
      // For each fetched question, try to find its category in categoriesArray; if not, create a new Category instance
      apiQuestions = data.map((q) => {
        let cat = categoriesArray.find(
          (c) => c.name.toLowerCase() === q.category.toLowerCase()
        );
        if (!cat) {
          cat = new Category(q.category, categoriesArray.length + 1);
          categoriesArray.push(cat);
        }
        return new Question(cat, q.question, q.options, q.explanation);
      });
    } else if (Array.isArray(data.questions)) {
      apiQuestions = data.questions.map((q) => {
        let cat = categoriesArray.find(
          (c) => c.name.toLowerCase() === q.category.toLowerCase()
        );
        if (!cat) {
          cat = new Category(q.category, categoriesArray.length + 1);
          categoriesArray.push(cat);
        }
        return new Question(cat, q.question, q.options, q.explanation);
      });
    } else {
      console.error("API returned unexpected format:", data);
      apiQuestions = [];
    }

    const localQuestionsData =
      JSON.parse(localStorage.getItem("quizQuestions")) || [];
    // localQuestionsData are plain objects; you can leave them as is or convert if needed.
    quizQuestions = [...apiQuestions, ...localQuestionsData];

    // Merge user-added categories from questions in quizQuestions (each q.category is expected to be a string in local storage)
    const allCats = quizQuestions.map((q) =>
      typeof q.category === "string" ? q.category : q.category.name
    );
    const uniqueCats = [...new Set(allCats)].filter(
      (cat) =>
        !categoriesArray.find((c) => c.name.toLowerCase() === cat.toLowerCase())
    );
    uniqueCats.forEach((cat) => {
      categoriesArray.push(new Category(cat, categoriesArray.length + 1));
    });

    updateCategorySelect();
    searchInput.value = "";
    displayQuizCards();
  } catch (err) {
    console.error("Failed to fetch API questions:", err);
    const localQuestionsData =
      JSON.parse(localStorage.getItem("quizQuestions")) || [];
    quizQuestions = [...localQuestionsData];

    updateCategorySelect();
    searchInput.value = "";
    displayQuizCards();
  }
};

// Update the category select dropdown using our Category instances
const updateCategorySelect = () => {
  if (!selectCategory) return;
  selectCategory.innerHTML = `<option value="" disabled selected>Select a category</option>`;
  categoriesArray.forEach((category) => {
    category.addToDropdown();
  });
};

// Post a new question to localStorage and update quizQuestions
const postQuestion = async (newQuestion) => {
  const localQuestions =
    JSON.parse(localStorage.getItem("quizQuestions")) || [];
  // For new questions created using our class, newQuestion is an instance of Question.
  // We store it as a plain object for persistence.
  localQuestions.push({
    category: newQuestion.category.name,
    question: newQuestion.questionText,
    options: newQuestion.options,
    explanation: newQuestion.explanation,
  });
  localStorage.setItem("quizQuestions", JSON.stringify(localQuestions));

  quizQuestions = [...apiQuestions, ...localQuestions];

  // If the category of the new question doesn't exist in categoriesArray, add it.
  if (
    !categoriesArray.find(
      (cat) =>
        cat.name.toLowerCase() === newQuestion.category.name.toLowerCase()
    )
  ) {
    categoriesArray.push(
      new Category(newQuestion.category.name, categoriesArray.length + 1)
    );
    updateCategorySelect();
  }

  displayQuizCards();
};

// Populate Categories in the Dropdown and handle "Other" selection
const selectcategories = () => {
  updateCategorySelect();
  selectCategory.addEventListener("change", () => {
    if (selectCategory.value == 14) {
      otherCategory.style.display = "block";
      otherCategory.focus();
    } else {
      otherCategory.style.display = "none";
    }
  });
};

// Add new category using the Category class
const addNewCategory = () => {
  const newCatName = otherCategory.value.trim();
  if (newCatName !== "") {
    // Check if it already exists in categoriesArray
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
    // Add new category to the dropdown
    const newOption = document.createElement("option");
    newOption.value = newCat.value;
    newOption.textContent = newCat.name;
    selectCategory.appendChild(newOption);
    selectCategory.value = newCat.value;
    otherCategory.value = "";
    otherCategory.style.display = "none";
    message.innerHTML = `Category "${newCatName}" added successfully!`;
    message.style.color = "green";
    updateCategorySelect();
    return newCat;
  }
  return null;
};

// Add a new question from the form using the Question class
const addQuestion = async (event) => {
  event.preventDefault();

  const questionInput = document.getElementById("question");
  const questionText = questionInput.value.trim();

  // Determine the selected category as a Category instance
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

  if (
    !selectedCategoryInstance ||
    selectedCategoryInstance.name === "Select a category"
  ) {
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

  // Check if the question already exists in the selected category
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

  // Create a new Question instance
  const newQ = new Question(selectedCategoryInstance, questionText, options);
  await postQuestion(newQ);

  console.log("Updated Questions Array:", quizQuestions);

  form.reset();
  otherCategory.style.display = "none";
  message.innerHTML = "Question Added Successfully!";
  message.style.color = "green";
  displayQuizCards();
};

// Display quiz cards based on categories and questions
const displayQuizCards = () => {
  if (!quizListContainer || !questionList) return;
  quizListContainer.innerHTML = "";

  // Use all categories except "Other"
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

// Filter categories based on search term and update UI
const filterCategories = (searchTerm = "") => {
  quizListContainer.innerHTML = "";
  const filteredCats = categoriesArray.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      cat.name.toLowerCase() !== "other"
  );
  filteredCats.forEach((cat) => {
    const questionsInCat = quizQuestions.filter(
      (q) => q.category.toLowerCase() === cat.name.toLowerCase()
    );
    const card = document.createElement("div");
    card.className = "quiz-card";
    card.innerHTML = `
      <h3>${cat.name}</h3>
      <p>${questionsInCat.length} question(s)</p>
      <div class="btn-group">
        <button class="play-btn" ${
          questionsInCat.length === 0 ? "disabled" : ""
        }>Play</button>
      </div>
    `;
    card.querySelector(".play-btn").addEventListener("click", () => {
      showQuestionsForCategory(cat.name);
    });
    quizListContainer.appendChild(card);
  });
};

// Show questions for a specific category
function showQuestionsForCategory(categoryName) {
  const qList = document.getElementById("question-list");
  const qContainer = document.getElementById("quiz-list");

  qContainer.style.display = "none";
  qList.style.display = "block";
  qList.innerHTML = "";
  searchInput.placeholder = "Search by question ...";

  const newSearchInput = searchInput.cloneNode(true);
  searchInput.parentNode.replaceChild(newSearchInput, searchInput);
  newSearchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    filterQuestionsByText(searchTerm, categoryName);
  });

  const questions = quizQuestions.filter(
    (q) => q.category.toLowerCase() === categoryName.toLowerCase()
  );

  const header = document.createElement("div");
  header.className = "headerQuestions";
  header.innerHTML = `<h3>${categoryName}</h3><p>${questions.length} question(s)</p>`;
  qList.appendChild(header);

  questions.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${q.question}</p>
      <ul class="option-list">
        ${q.options
          .map((opt) => `<li class="answer-option">${opt.text}</li>`)
          .join("")}
      </ul>
      <button class="delete-btn">Delete Question</button>
    `;
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      deleteQuestionFromCategory(q.question, categoryName);
    });
    qList.appendChild(card);
  });

  const playButton = document.createElement("div");
  playButton.className = "btn-group";
  playButton.innerHTML = `<button class="play-quiz" ${
    questions.length === 0 ? "disabled" : ""
  }>Play Quiz</button>`;
  qList.appendChild(playButton);
}

// Filter questions by text within a category
function filterQuestionsByText(searchText, categoryName) {
  questionList.innerHTML = "";
  const questionsInCat = quizQuestions.filter(
    (q) => q.category.toLowerCase() === categoryName.toLowerCase()
  );
  const filteredQuestions = searchText
    ? questionsInCat.filter((q) =>
        q.question.toLowerCase().includes(searchText.toLowerCase())
      )
    : questionsInCat;

  if (filteredQuestions.length === 0) {
    questionList.innerHTML = `
      <div class="headerQuestions">
        <h3>${categoryName}</h3>
        <p>${questionsInCat.length} total question(s)</p>
      </div>
      <p style="color: gray;">No questions match your search.</p>
    `;
    return;
  }

  const header = document.createElement("div");
  header.className = "headerQuestions";
  header.innerHTML = `<h3>${categoryName}</h3><p>${filteredQuestions.length} question(s)</p>`;
  questionList.appendChild(header);

  filteredQuestions.forEach((q, index) => {
    const questionCard = document.createElement("div");
    questionCard.className = "question-card";
    questionCard.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${q.question}</p>
      <ul class="option-list">
        ${q.options
          .map((opt) => `<li class="answer-option">${opt.text}</li>`)
          .join("")}
      </ul>
      <button class="delete-btn">Delete Question</button>
    `;
    const deleteBtn = questionCard.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      deleteQuestionFromCategory(q.question, categoryName);
    });
    questionList.appendChild(questionCard);
  });

  const playButton = document.createElement("div");
  playButton.className = "btn-group";
  playButton.innerHTML = `<button class="play-quiz" ${
    filteredQuestions.length === 0 ? "disabled" : ""
  }>Play Quiz</button>`;
  questionList.appendChild(playButton);
}

// Delete a question from a category
const deleteQuestionFromCategory = (questionText, categoryName) => {
  let localQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  localQuestions = localQuestions.filter(
    (q) =>
      !(
        q.category.toLowerCase() === categoryName.toLowerCase() &&
        q.question.toLowerCase() === questionText.toLowerCase()
      )
  );
  localStorage.setItem("quizQuestions", JSON.stringify(localQuestions));
  quizQuestions = quizQuestions.filter(
    (q) =>
      !(
        q.category.toLowerCase() === categoryName.toLowerCase() &&
        q.question.toLowerCase() === questionText.toLowerCase()
      )
  );
  filterQuestionsByText(searchInput.value, categoryName);
};

const searchQuizzes = () => {
  const query = document.getElementById("searchInput").value.trim();
  filterCategories(query);
};

// Event Listeners
window.addEventListener("DOMContentLoaded", () => {
  if (form && selectCategory) {
    selectcategories(); // Only run if we're on the create page
    form.addEventListener("submit", addQuestion);
  }
  if (quizListContainer) {
    fetchQuestions(); // Loads data from API + localStorage
  }
  if (playGameButton) {
    playGameButton.addEventListener("click", () => {
      window.location.href = "./startQuiz.html";
    });
  }
  if (searchInput) {
    searchInput.addEventListener("input", searchQuizzes);
  }
});

close.addEventListener("click", () => {
  window.location.href = "./index.html";
});
