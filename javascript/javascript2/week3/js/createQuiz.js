let quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

// Get form elements
const form = document.getElementById("quizForm");
const selectCategory = document.getElementById("category-select");
const otherCategory = document.getElementById("otherCategory");
const message = document.querySelector(".returnText");
const quizListContainer = document.getElementById("quiz-list");
const playGameButton = document.querySelector(".playGame");
const searchInput = document.getElementById("searchInput");
const close = document.getElementById("close");

// Categories Array
let categories = [
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

//Function 1: Populate Categories in the Dropdown
const selectcategories = () => {
  selectCategory.innerHTML = `<option value="" disabled selected>Select a category</option>`;

  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category.value;
    option.textContent = category.name;
    selectCategory.appendChild(option);
  });

  // Show "Other" input field when selected
  selectCategory.addEventListener("change", () => {
    if (selectCategory.value == 14) {
      otherCategory.style.display = "block";
      otherCategory.focus();
    } else {
      otherCategory.style.display = "none";
    }
  });
};
//function 2: add new Category
const addNewCategory = () => {
  const newCategory = otherCategory.value.trim();

  if (newCategory !== "") {
    //Check if category already exists
    const exists = categories.some(
      (category) => category.name.toLowerCase() === newCategory.toLowerCase()
    );

    if (exists) {
      message.innerHTML = `The category "${newCategory}" already exists!`;
      message.style.color = "red";
      return false; //Stop execution, return false (category exists)
    }

    // Add new category to the array
    const newCategoryObject = {
      name: newCategory,
      value: categories.length + 1,
    };
    categories.push(newCategoryObject);

    //Add new category to the dropdown
    let newOption = document.createElement("option");
    newOption.value = newCategoryObject.value;
    newOption.textContent = newCategory;
    selectCategory.appendChild(newOption);

    //Select the newly added category
    selectCategory.value = newCategoryObject.value;

    //Reset input field
    otherCategory.value = "";
    otherCategory.style.display = "none";

    return newCategory; //Return the new category name
  }
  return null; // No category was added
};

// add question
const addQuestion = (event) => {
  event.preventDefault(); // Prevent page reload

  // Get form values
  const questionInput = document.getElementById("question");
  const questionText = questionInput.value.trim();

  // Get selected category (either from dropdown or newly added)
  let selectedCategory = "";

  if (selectCategory.value == 14) {
    const newCategory = addNewCategory();
    if (!newCategory) return;
    selectedCategory = newCategory; // ✅ use new custom name
  } else {
    selectedCategory =
      selectCategory.options[selectCategory.selectedIndex].textContent;
  }

  //Ensure a category is selected
  if (!selectedCategory || selectedCategory === "Select a category") {
    message.innerHTML = "Please select a valid category.";
    message.style.color = "red";
    return;
  }

  // Get answer options
  const options = Array.from(document.querySelectorAll(".option-input")).map(
    (input) => input.value.trim()
  );

  // Check for duplicate options
  const uniqueOptions = new Set(options);
  if (uniqueOptions.size !== options.length) {
    message.innerHTML = "Error: Answer options must be unique.";
    message.style.color = "red";
    return;
  }

  // Get the correct answer
  const correctAnswerRadio = document.querySelector(
    "input[name='correct']:checked"
  );
  if (!correctAnswerRadio) {
    message.innerHTML = "Please select the correct answer.";
    message.style.color = "red";
    return;
  }
  const correctAnswerIndex = parseInt(correctAnswerRadio.value);
  const correctAnswer = options[correctAnswerIndex];

  // Validate form data
  if (!questionText || options.some((opt) => opt === "")) {
    message.innerHTML = "Please fill out all fields.";
    message.style.color = "red";
    return;
  }

  // Check if the question already exists in the selected category
  const questionExists = quizQuestions.some(
    (q) =>
      q.category.toLowerCase() === selectedCategory.toLowerCase() &&
      q.question.toLowerCase() === questionText.toLowerCase()
  );

  if (questionExists) {
    message.innerHTML = `This question already exists in the "${selectedCategory}" category.`;
    message.style.color = "red";
    return;
  }

  //Create and add question object
  const newQuestion = {
    category: selectedCategory,
    question: questionText,
    options: options,
    correctAnswer: correctAnswer,
  };

  quizQuestions.push(newQuestion);
  localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));

  // Debugging: Log the updated array
  console.log("Updated Questions Array:", quizQuestions);

  // Reset the form fields
  form.reset();
  otherCategory.style.display = "none";
  message.innerHTML = "Question Added Successfully!";
  message.style.color = "green";
  displayQuizCards();
};

function displayQuizCards() {
  const quizListContainer = document.getElementById("quiz-list");
  if (!quizListContainer) return;

  quizListContainer.innerHTML = "";

  // Load from localStorage just in case
  let quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

  // Get unique list of category names
  const allCategories = categories //
    .map((cat) => cat.name)
    .filter((name) => name.toLowerCase() !== "other");

  const userAdded = quizQuestions
    .map((q) => q.category)
    .filter((name) => name.toLowerCase() !== "other");
  // added by user
  const uniqueCategories = Array.from(
    new Set([...allCategories, ...userAdded])
  );

  // For each category, show card (even if empty)
  uniqueCategories.forEach((category) => {
    const questionsInCategory = quizQuestions.filter(
      (q) => q.category === category
    );

    const card = document.createElement("div");
    card.className = "quiz-card";
    card.innerHTML = `
       <h3>${category}</h3>
      <p>${questionsInCategory.length} question(s)</p>
  
     <button class="play-btn" ${
       questionsInCategory.length === 0 ? "disabled" : ""
     }>Play</button>
      <button class="delete-btn" ${
        questionsInCategory.length === 0 ? "disabled" : ""
      }>Delete</button> 
    `;

    card.querySelector(".play-btn").addEventListener("click", () => {
      alert(`Start playing quiz: ${category}`);
    });

    card.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm(`Delete all questions in "${category}"?`)) {
        quizQuestions = quizQuestions.filter((q) => q.category !== category);
        localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));
        displayQuizCards();
      }
    });

    quizListContainer.appendChild(card);
  });
}
function filterCategories(searchTerm = "") {
  quizListContainer.innerHTML = "";

  // Filter category names that match the search
  const filtered = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filtered.length === 0) {
    quizListContainer.innerHTML = `<p style="color: gray;">No categories found.</p>`;
    return;
  }

  filtered.forEach((cat) => {
    // Count how many questions belong to this category
    const count = quizQuestions.filter(
      (q) => q.category.toLowerCase() === cat.name.toLowerCase()
    ).length;

    const card = document.createElement("div");
    card.className = "quiz-card";
    card.innerHTML = `
      <h3>${cat.name}</h3>
      <p>${count} question(s)</p>
      <div class="btn-group">
        <button class="play-btn" ${count === 0 ? "disabled" : ""}>Play</button>
        <button class="delete-btn" ${
          count === 0 ? "disabled" : ""
        }>Delete</button>
      </div>
    `;

    card.querySelector(".play-btn")?.addEventListener("click", () => {
      alert(`Start playing quiz: ${cat.name}`);
    });

    card.querySelector(".delete-btn")?.addEventListener("click", () => {
      if (confirm(`Delete all questions in "${cat.name}"?`)) {
        quizQuestions = quizQuestions.filter(
          (q) => q.category.toLowerCase() !== cat.name.toLowerCase()
        );
        localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));
        filterCategories(searchTerm); // Refresh with same filter
      }
    });

    quizListContainer.appendChild(card);
  });
}

function searchQuizzes() {
  const query = document.getElementById("searchInput").value.trim();
  filterCategories(query);
}

//Attach Event Listeners
window.addEventListener("DOMContentLoaded", () => {
  if (form && selectCategory) {
    selectcategories(); //Only run if we're on the create page
    form.addEventListener("submit", addQuestion);
  }

  if (quizListContainer) {
    displayQuizCards(); //Only run on startQuiz.html
  }

  if (playGameButton) {
    playGameButton.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }
});
searchInput.addEventListener("input", searchQuizzes);
close.addEventListener("click", () => {
  window.location.href = "./index.html";
});
