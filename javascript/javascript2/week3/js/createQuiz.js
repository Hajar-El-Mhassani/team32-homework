let quizQuestions = [];

// Get form elements
const form = document.getElementById("quizForm");
const selectCategory = document.getElementById("category-select");
const otherCategory = document.getElementById("otherCategory");
const message = document.querySelector(".returnText");

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
  let selectedCategory = selectCategory.value;

  //If "Other" is selected
  if (selectedCategory == 14) {
    const newCategory = addNewCategory();
    if (!newCategory) return; //Stop if the category already exists
    selectedCategory = newCategory;
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
    category: selectCategory.name.trim(),
    question: questionText,
    options: options,
    correctAnswer: correctAnswer,
  };

  quizQuestions.push(newQuestion);

  // Debugging: Log the updated array
  console.log("Updated Questions Array:", quizQuestions);

  // Reset the form fields
  form.reset();
  otherCategory.style.display = "none";
  message.innerHTML = "Question Added Successfully!";
  message.style.color = "green";
};

//Attach Event Listeners
window.addEventListener("DOMContentLoaded", selectcategories);
form.addEventListener("submit", addQuestion);

const playGameButton = document.querySelector(".play-game");

//When clicked, redirect to the home page or quiz start page
playGameButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
