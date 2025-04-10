// Replaced localStorage with a fetch to get data from API
const API_URL =
  "https://raw.githubusercontent.com/Hajar-El-Mhassani/Hajar-El-Mhassani.github.io/main/quizData/quiz/questionQuiz.json";

let quizQuestions = [];
let apiQuestions = [];

// Get form elements (for the create quiz page)
const form = document.getElementById("quizForm");
const selectCategory = document.getElementById("category-select");
const otherCategory = document.getElementById("otherCategory");
const message = document.querySelector(".returnText");

// Get common container elements (might be on different pages)
const quizListContainer = document.getElementById("quiz-list");
const questionList = document.getElementById("question-list");
const playGameButton = document.getElementById("playGame"); // On create page, "Play Quiz" button present
const searchInput = document.getElementById("searchInput");
const close = document.getElementById("close");

// This container exists in startQuiz.html for interactive quiz mode.
const startQuizContainer = document.getElementById("start-quiz");

// Categories Array – load from localStorage if available, else use defaults
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

// FETCH QUESTIONS & MERGE API CATEGORIES

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

    // Merge user-added categories (from any source)
    const allCategories = quizQuestions.map((q) => q.category);
    const unique = [...new Set(allCategories)].filter(
      (cat) =>
        !categories.find(
          (c) =>
            c.name.trim().toLowerCase() ===
            (typeof cat === "string"
              ? cat.trim().toLowerCase()
              : cat.name.trim().toLowerCase())
        )
    );
    unique.forEach((cat) => {
      // If cat is an object use cat.name; if a string, use directly.
      const catName = typeof cat === "string" ? cat : cat.name;
      categories.push({ name: catName, value: categories.length + 1 });
    });
    // Save updated categories to localStorage
    localStorage.setItem("categories", JSON.stringify(categories));

    updateCategorySelect();
    if (searchInput) searchInput.value = "";
    if (quizListContainer) displayQuizCards();
  } catch (err) {
    console.error("Failed to fetch API questions:", err);
    const localQuestions =
      JSON.parse(localStorage.getItem("quizQuestions")) || [];
    quizQuestions = [...localQuestions];
    updateCategorySelect();
    if (searchInput) searchInput.value = "";
    if (quizListContainer) displayQuizCards();
  }
};

// UPDATE THE CATEGORY SELECT DROPDOWN (OTHER ALWAYS LAST)

const updateCategorySelect = () => {
  // Retrieve categories from localStorage if available; else use current array.
  const savedCategories =
    JSON.parse(localStorage.getItem("categories")) || categories;
  if (!selectCategory) return;
  selectCategory.innerHTML = `<option value="" disabled selected>Select a category</option>`;

  // Separate out non-"Other" categories
  const nonOther = savedCategories.filter(
    (cat) => cat.name.trim().toLowerCase() !== "other"
  );
  nonOther.forEach((category) => {
    let option = document.createElement("option");
    option.value = category.value;
    option.textContent = category.name;
    selectCategory.appendChild(option);
  });
  // Append "Other" as the last option
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

// POST A NEW QUESTION (SAVE TO localStorage)

const postQuestion = async (newQuestion) => {
  const localQuestions =
    JSON.parse(localStorage.getItem("quizQuestions")) || [];
  localQuestions.push(newQuestion);
  localStorage.setItem("quizQuestions", JSON.stringify(localQuestions));

  // Merge API questions with local questions
  quizQuestions = [...apiQuestions, ...localQuestions];
  localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));

  // If the category of the new question doesn't exist, add it.
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

  displayQuizCards();
};

// SELECT CATEGORIES (HANDLE "OTHER" OPTION)

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

// ADD NEW CATEGORY (INSERT NEW CATEGORY BEFORE "Other")
const addNewCategory = () => {
  const newCatName = otherCategory.value.trim();
  if (newCatName !== "") {
    // Check if the category already exists (case-insensitive)
    const exists = categories.some(
      (cat) => cat.name.trim().toLowerCase() === newCatName.toLowerCase()
    );
    if (exists) {
      message.innerHTML = `The category "${newCatName}" already exists!`;
      message.style.color = "red";
      // Select the existing category
      const existing = categories.find(
        (cat) => cat.name.trim().toLowerCase() === newCatName.toLowerCase()
      );
      if (selectCategory) selectCategory.value = existing.value;
      return false;
    }
    // Create new category object
    const newCategoryObject = {
      name: newCatName,
      value: categories.length + 1,
    };

    // Insert new category before "Other", so that "Other" stays at the end.
    const otherIndex = categories.findIndex(
      (cat) => cat.name.trim().toLowerCase() === "other"
    );
    if (otherIndex !== -1) {
      categories.splice(otherIndex, 0, newCategoryObject);
    } else {
      categories.push(newCategoryObject);
    }

    // Save updated categories to localStorage
    localStorage.setItem("categories", JSON.stringify(categories));
    updateCategorySelect();

    // Immediately select the new category
    if (selectCategory) selectCategory.value = newCategoryObject.value;

    // Reset input field and hide it
    otherCategory.value = "";
    otherCategory.style.display = "none";

    message.innerHTML = `Category "${newCatName}" added successfully!`;
    message.style.color = "green";

    return newCatName;
  }
  return null;
};

// ADD QUESTION FROM THE FORM (PREVENT DUPLICATES IN SELECTED CATEGORY)

const addQuestion = async (event) => {
  event.preventDefault();

  // Reload quizQuestions from localStorage to include previously added questions.
  quizQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

  const questionInput = document.getElementById("question");
  const questionText = questionInput.value.trim();

  // Determine the selected category as a string.
  let selectedCategory = "";
  if (selectCategory.value == 14) {
    const newCat = addNewCategory(); // if "Other" is selected, try to add a new category
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

  // Duplicate check: compare question text exactly (after trimming)
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

  // Create new question object.
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
  displayQuizCards();
};

// DISPLAY QUIZ CARDS
const displayQuizCards = () => {
  // If the containers don't exist on this page, exit.
  if (!quizListContainer || !questionList) {
    console.warn("One or more container elements are missing.");
    return;
  }
  console.log(
    "quizListContainer:",
    quizListContainer,
    "questionList:",
    questionList
  );
  // Hide the start quiz container if we're in list view.
  if (startQuizContainer) startQuizContainer.style.display = "none";

  quizListContainer.innerHTML = "";
  // Use all categories except "Other"
  const allCategories = categories.filter(
    (cat) => cat.name.trim().toLowerCase() !== "other"
  );
  allCategories.forEach((categoryObj) => {
    const category = categoryObj.name;
    const questionsForCard = quizQuestions.filter((q) => {
      const qCategory =
        typeof q.category === "string"
          ? q.category.trim()
          : q.category.name.trim();
      return qCategory === category;
    });

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

// FILTER CATEGORIES FOR SEARCH
const filterCategories = (searchTerm = "") => {
  quizListContainer.innerHTML = "";
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      cat.name.trim().toLowerCase() !== "other"
  );

  filteredCategories.forEach((category) => {
    const questionsInCategory = quizQuestions.filter((q) => {
      const qCategory =
        typeof q.category === "string"
          ? q.category.trim()
          : q.category.name.trim();
      return qCategory.toLowerCase() === category.name.toLowerCase();
    });

    const card = document.createElement("div");
    card.className = "quiz-card";
    card.innerHTML = `
      <h3>${category.name}</h3>
      <p>${questionsInCategory.length} question(s)</p>
      <div class="btn-group">
        <button class="play-btn" ${
          questionsInCategory.length === 0 ? "disabled" : ""
        }>Play</button>
      </div>
    `;
    card.querySelector(".play-btn").addEventListener("click", () => {
      showQuestionsForCategory(category.name);
    });
    quizListContainer.appendChild(card);
  });
};

// SHOW QUESTIONS FOR A SPECIFIC CATEGORY (List View)
const showQuestionsForCategory = (categoryName) => {
  // Hide list containers and show the questions container.
  if (startQuizContainer) startQuizContainer.style.display = "none";
  if (quizListContainer) quizListContainer.style.display = "none";
  if (questionList) {
    questionList.style.display = "block";
    questionList.innerHTML = "";
  }
  if (searchInput) searchInput.placeholder = "Search by question ...";

  const newSearchInput = searchInput.cloneNode(true);
  searchInput.parentNode.replaceChild(newSearchInput, searchInput);
  newSearchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    filterQuestionsByText(searchTerm, categoryName);
  });

  const questions = quizQuestions.filter((q) => {
    const qCategory =
      typeof q.category === "string"
        ? q.category.trim()
        : q.category.name.trim();
    return qCategory.toLowerCase() === categoryName.trim().toLowerCase();
  });

  const header = document.createElement("div");
  header.className = "headerQuestions";
  header.innerHTML = `<h3>${categoryName}</h3><p>${questions.length} question(s)</p>`;
  questionList.appendChild(header);

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
    questionList.appendChild(card);
  });
  const playButton = document.createElement("div");
  playButton.className = "btn-group";
  playButton.innerHTML = `<button class="play-quiz" ${
    questions.length === 0 ? "disabled" : ""
  }>Play Quiz</button>`;
  playButton.querySelector(".play-quiz").addEventListener("click", () => {
    // Instead of directly starting the quiz, prompt for player setup.
    initMultiplayerQuiz(categoryName, questions);
  });
  questionList.appendChild(playButton);
};

// FILTER QUESTIONS BY TEXT WITHIN A CATEGORY (List View Filtering)

const filterQuestionsByText = (searchText, categoryName) => {
  questionList.innerHTML = "";
  const questionsInCategory = quizQuestions.filter((q) => {
    const qCategory =
      typeof q.category === "string"
        ? q.category.trim()
        : q.category.name.trim();
    return qCategory.toLowerCase() === categoryName.trim().toLowerCase();
  });
  const filteredQuestions = searchText
    ? questionsInCategory.filter((q) =>
        q.question
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
      )
    : questionsInCategory;
  if (filteredQuestions.length === 0) {
    questionList.innerHTML = `
      <div class="headerQuestions">
        <h3>${categoryName}</h3>
        <p>${questionsInCategory.length} total question(s)</p>
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
          .map((opt) => `<li class="answer-answer">${opt.text}</li>`)
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
};

// DELETE A QUESTION

const deleteQuestionFromCategory = (questionText, categoryName) => {
  let localQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

  localQuestions = localQuestions.filter(
    (q) =>
      !(
        q.category.trim().toLowerCase() === categoryName.trim().toLowerCase() &&
        q.question.trim().toLowerCase() === questionText.trim().toLowerCase()
      )
  );

  localStorage.setItem("quizQuestions", JSON.stringify(localQuestions));
  quizQuestions = quizQuestions.filter(
    (q) =>
      !(
        q.category.trim().toLowerCase() === categoryName.trim().toLowerCase() &&
        q.question.trim().toLowerCase() === questionText.trim().toLowerCase()
      )
  );

  filterQuestionsByText(searchInput.value, categoryName);
};

const searchQuizzes = () => {
  const query = document.getElementById("searchInput").value.trim();
  filterCategories(query);
};

// MULTIPLAYER QUIZ MODE: PLAYER SETUP & START QUIZ

const initMultiplayerQuiz = (categoryName, questions) => {
  // Hide the global search and question list container.
  document.querySelector(".search").style.display = "none";
  if (questionList) questionList.style.display = "none";

  // Clear and show the start quiz container.
  startQuizContainer.innerHTML = "";
  startQuizContainer.style.display = "block";

  // Display a player setup form.
  startQuizContainer.innerHTML = `
    <div id="playerSetup">
      <h2>Enter Player Names</h2>
      <label for="player1">Player 1:</label>
      <input type="text" id="player1" placeholder="Player 1 Name" />
      <br>
      <label for="player2">Player 2:</label>
      <input type="text" id="player2" placeholder="Player 2 Name" />
      <br>
      <button id="startGameBtn">Start Quiz</button>
    </div>
  `;
  document.getElementById("startGameBtn").addEventListener("click", () => {
    const player1Name =
      document.getElementById("player1").value.trim() || "Player 1";
    const player2Name =
      document.getElementById("player2").value.trim() || "Player 2";
    const players = {
      player1: { name: player1Name, score: 0 },
      player2: { name: player2Name, score: 0 },
    };
    startQuizForCategoryWithPlayers(categoryName, questions, players);
  });
};

// START QUIZ WITH PLAYERS (Interactive Quiz Mode with Multiplayer Scoring)
const startQuizForCategoryWithPlayers = (categoryName, questions, players) => {
  // Hide other elements.
  document.querySelector(".search").style.display = "none";
  if (questionList) questionList.style.display = "none";

  startQuizContainer.style.display = "block";
  startQuizContainer.innerHTML = "";

  // Create scoreboard container.
  const scoreboard = document.createElement("div");
  scoreboard.className = "scoreboard";
  scoreboard.innerHTML = `
    <div id="player1Score">
      ${players.player1.name}: <span id="score1">${players.player1.score}</span>
      <button class="correct" id="p1Correct">Correct</button>
      <button class="wrong" id="p1Wrong">Wrong</button>
    </div>
    <div id="player2Score">
      ${players.player2.name}: <span id="score2">${players.player2.score}</span>
      <button class="correct" id="p2Correct">Correct</button>
      <button class="wrong" id="p2Wrong">Wrong</button>
    </div>
  `;
  startQuizContainer.appendChild(scoreboard);

  const updateScoreboard = () => {
    document.getElementById("score1").textContent = players.player1.score;
    document.getElementById("score2").textContent = players.player2.score;
  };

  // Randomize questions.
  const randomizedQuestions = [...questions].sort(() => Math.random() - 0.5);
  let currentIndex = 0;
  const total = randomizedQuestions.length;

  const showQuestion = () => {
    // Keep the scoreboard in place; remove other content below.
    while (startQuizContainer.childNodes.length > 1) {
      startQuizContainer.removeChild(startQuizContainer.lastChild);
    }

    if (currentIndex >= total) {
      startQuizContainer.innerHTML += `
        <p>Quiz Completed!</p>
        <button id="backToQuestionsBtn">Back to Questions</button>
      `;
      document
        .getElementById("backToQuestionsBtn")
        .addEventListener("click", () => {
          startQuizContainer.style.display = "none";
          if (questionList) questionList.style.display = "block";
        });
      return;
    }

    const currentQuestion = randomizedQuestions[currentIndex];
    const qElem = document.createElement("div");
    qElem.className = "quiz-question";
    qElem.innerHTML = `<p><strong>Question ${
      currentIndex + 1
    } of ${total}:</strong> ${currentQuestion.question}</p>`;
    startQuizContainer.appendChild(qElem);

    // Randomize options.
    const options = [...currentQuestion.options].sort(
      () => Math.random() - 0.5
    );
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "options-container";

    options.forEach((option) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = option.text;
      btn.addEventListener("click", () => {
        const allBtns = optionsContainer.querySelectorAll("button");
        allBtns.forEach((b) => (b.disabled = true));
        if (option.isCorrect) {
          btn.style.backgroundColor = "green";
        } else {
          btn.style.backgroundColor = "red";
          allBtns.forEach((b) => {
            if (
              b.textContent ===
              currentQuestion.options.find((o) => o.isCorrect).text
            ) {
              b.style.backgroundColor = "green";
            }
          });
        }
        if (currentQuestion.explanation) {
          const expl = document.createElement("p");
          expl.className = "explanation";
          expl.textContent = currentQuestion.explanation;
          startQuizContainer.appendChild(expl);
        }

        // Attach scoring listeners.
        document.getElementById("p1Correct").onclick = () => {
          players.player1.score += 1;
          updateScoreboard();
          checkForWinner();
        };
        document.getElementById("p1Wrong").onclick = () => {
          players.player2.score += 1;
          updateScoreboard();
          checkForWinner();
        };
        document.getElementById("p2Correct").onclick = () => {
          players.player2.score += 1;
          updateScoreboard();
          checkForWinner();
        };
        document.getElementById("p2Wrong").onclick = () => {
          players.player1.score += 1;
          updateScoreboard();
          checkForWinner();
        };

        const nextBtn = document.createElement("button");
        nextBtn.className = "next-btn";
        nextBtn.textContent = "Next Question";
        nextBtn.addEventListener("click", () => {
          currentIndex++;
          showQuestion();
        });
        startQuizContainer.appendChild(nextBtn);
      });
      optionsContainer.appendChild(btn);
    });
    startQuizContainer.appendChild(optionsContainer);
  };

  const checkForWinner = () => {
    if (players.player1.score >= 10 || players.player2.score >= 10) {
      startQuizContainer.innerHTML = `
        <p>Game Over! ${
          players.player1.score >= 10
            ? players.player1.name
            : players.player2.name
        } wins!</p>
        <button id="backToQuestionsBtn">Back to Questions</button>
      `;
      document
        .getElementById("backToQuestionsBtn")
        .addEventListener("click", () => {
          startQuizContainer.style.display = "none";
          if (questionList) questionList.style.display = "block";
        });
    }
  };

  showQuestion();
};

// EVENT LISTENERS

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
  if (close) {
    close.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }
});
