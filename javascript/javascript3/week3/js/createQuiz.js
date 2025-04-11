// createQuiz.js

// API URL
const API_URL =
  "https://raw.githubusercontent.com/Hajar-El-Mhassani/Hajar-El-Mhassani.github.io/main/quizData/quiz/questionQuiz.json";

//
let quizQuestions = [];
let apiQuestions = [];

// Get form elements for the Create Quiz page
const form = document.getElementById("quizForm");
const selectCategory = document.getElementById("category-select");
const otherCategory = document.getElementById("otherCategory");
const message = document.querySelector(".returnText");
const playGameButton = document.getElementById("playGame");

// Categories Array – load from localStorage if available, else defaults.
let categories = JSON.parse(localStorage.getItem("categories")) || [
  { name: "General Knowledge", value: 1 },
  { name: "Books", value: 2 },
  { name: "Film", value: 3 },
  { name: "Music", value: 4 },
  { name: "Musicals & Theatres", value: 5 },
  { name: "Television", value: 6 },
  { name: "Video Games", value: 7 },
  { name: "Board Games", value: 8 },
  { name: "Science & Nature", value: 9 },
  { name: "Computers", value: 10 },
  { name: "Mathematics", value: 11 },
  { name: "Mythology", value: 12 },
  { name: "Sports", value: 13 },
  { name: "Other", value: 14 },
];

//FETCH QUESTIONS & MERGE API CATEGORIES
const fetchQuestions = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log("API data:", data);
    if (Array.isArray(data)) {
      apiQuestions = data;
    } else if (Array.isArray(data.questions)) {
      apiQuestions = data.questions;
    } else {
      console.error("API returned unexpected format:", data);
      apiQuestions = [];
    }
    const localQuestions =
      JSON.parse(localStorage.getItem("quizQuestions")) || [];
    quizQuestions = [...apiQuestions, ...localQuestions];

    // Merge any additional categories from questions (both API and local)
    const allCategories = quizQuestions.map((q) => q.category);
    // Use a case-insensitive check to add only new categories.
    const unique = [...new Set(allCategories)].filter((cat) => {
      const catName =
        typeof cat === "string"
          ? cat.trim().toLowerCase()
          : (cat.name || "").trim().toLowerCase();
      return !categories.find((c) => c.name.trim().toLowerCase() === catName);
    });
    unique.forEach((cat) => {
      const catName = typeof cat === "string" ? cat : cat.name;
      categories.push({ name: catName, value: categories.length + 1 });
    });
    localStorage.setItem("categories", JSON.stringify(categories));
  } catch (err) {
    console.error("Failed to fetch API questions:", err);
    const localQuestions =
      JSON.parse(localStorage.getItem("quizQuestions")) || [];
    quizQuestions = [...localQuestions];
  }
};

// ---------- UPDATE THE CATEGORY SELECT DROPDOWN (OTHER ALWAYS LAST) -----------
const updateCategorySelect = () => {
  if (!selectCategory) return;
  // Retrieve categories from localStorage (if saved) or use the current array.
  const savedCategories =
    JSON.parse(localStorage.getItem("categories")) || categories;
  selectCategory.innerHTML = `<option value="" disabled selected>Select a category</option>`;

  // Separate non-"Other" categories.
  const nonOther = savedCategories.filter(
    (cat) => cat.name.trim().toLowerCase() !== "other"
  );
  nonOther.forEach((category) => {
    let option = document.createElement("option");
    option.value = category.value;
    option.textContent = category.name;
    selectCategory.appendChild(option);
  });
  // Append "Other" as the last option.
  const other = savedCategories.find(
    (cat) => cat.name.trim().toLowerCase() === "other"
  );
  if (other) {
    let option = document.createElement("option");
    option.value = other.value;
    option.textContent = other.name;
    selectCategory.appendChild(option);
  }
};

// ---------- ADD NEW CATEGORY (INSERT BEFORE "Other") -----------
const addNewCategory = () => {
  const newCatName = otherCategory.value.trim();
  if (newCatName !== "") {
    // Check if the category already exists.
    const exists = categories.some(
      (cat) => cat.name.trim().toLowerCase() === newCatName.toLowerCase()
    );
    if (exists) {
      message.innerHTML = `The category "${newCatName}" already exists!`;
      message.style.color = "red";
      const existing = categories.find(
        (cat) => cat.name.trim().toLowerCase() === newCatName.toLowerCase()
      );
      if (selectCategory) selectCategory.value = existing.value;
      return false;
    }
    // Create new category object.
    const newCategoryObject = {
      name: newCatName,
      value: categories.length + 1,
    };
    const otherIndex = categories.findIndex(
      (cat) => cat.name.trim().toLowerCase() === "other"
    );
    if (otherIndex !== -1) {
      categories.splice(otherIndex, 0, newCategoryObject);
    } else {
      categories.push(newCategoryObject);
    }
    localStorage.setItem("categories", JSON.stringify(categories));
    updateCategorySelect();
    if (selectCategory) selectCategory.value = newCategoryObject.value;
    otherCategory.value = "";
    otherCategory.style.display = "none";
    message.innerHTML = `Category "${newCatName}" added successfully!`;
    message.style.color = "green";
    return newCatName;
  }
  return null;
};

// ---------- ADD QUESTION FROM THE FORM (PREVENT DUPLICATES IN SELECTED CATEGORY) -----------
const addQuestion = async (event) => {
  event.preventDefault();
  // Reload quizQuestions from localStorage.
  quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  const questionInput = document.getElementById("question");
  const questionText = questionInput.value.trim();
  let selectedCategory = "";
  if (selectCategory.value == 14) {
    const newCat = addNewCategory();
    if (!newCat) return;
    selectedCategory = newCat;
  } else {
    selectedCategory =
      selectCategory.options[selectCategory.selectedIndex].textContent.trim();
  }
  if (!selectedCategory || selectedCategory === "Select a category") {
    message.innerHTML = "Please select a valid category.";
    message.style.color = "red";
    return;
  }

  // Check for duplicate question text in this category.
  const duplicateFound = quizQuestions.some((q) => {
    let storedCat = "";
    if (q.category && typeof q.category === "object" && q.category.name) {
      storedCat = q.category.name.trim();
    } else if (typeof q.category === "string") {
      storedCat = q.category.trim();
    }
    return storedCat === selectedCategory && q.question.trim() === questionText;
  });
  if (duplicateFound) {
    message.innerHTML = `This question already exists in the "${selectedCategory}" category.`;
    message.style.color = "red";
    return;
  }

  // Gather answer options.
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

  const newQuestion = {
    category: selectedCategory,
    question: questionText,
    options,
    explanation: "",
  };

  await postQuestion(newQuestion);
  console.log("Updated Questions Array:", quizQuestions);
  form.reset();
  otherCategory.style.display = "none";
  message.innerHTML = "Question Added Successfully!";
  message.style.color = "green";
};
// ---------- POST A NEW QUESTION (SAVE TO localStorage) -----------
const postQuestion = async (newQuestion) => {
  const localQuestions =
    JSON.parse(localStorage.getItem("quizQuestions")) || [];
  localQuestions.push(newQuestion);
  localStorage.setItem("quizQuestions", JSON.stringify(localQuestions));
  // Merge API and local questions.
  quizQuestions = [...apiQuestions, ...localQuestions];
  localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));

  // If the new question's category is not in  categories array, add it.
  const exists = categories.find(
    (cat) =>
      cat.name.trim().toLowerCase() ===
      newQuestion.category.trim().toLowerCase()
  );
  if (!exists) {
    categories.push({
      name: newQuestion.category,
      value: categories.length + 1,
    });
    localStorage.setItem("categories", JSON.stringify(categories));
    updateCategorySelect();
  }
};

// ---------- SELECT CATEGORIES (HANDLE "OTHER" OPTION) -----------
const selectcategories = () => {
  updateCategorySelect();
  if (selectCategory) {
    selectCategory.addEventListener("change", () => {
      if (selectCategory.value == 14) {
        otherCategory.style.display = "block";
        otherCategory.focus();
      } else {
        otherCategory.style.display = "none";
      }
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if (playGameButton) {
    playGameButton.addEventListener("click", () => {
      window.location.href = "./startQuiz.html";
    });
  }
  if (form && selectCategory) {
    selectcategories();
    form.addEventListener("submit", addQuestion);
  }

  fetchQuestions();
});
