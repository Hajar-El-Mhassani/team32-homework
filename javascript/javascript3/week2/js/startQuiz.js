// startQuiz.js

// (Assuming API_URL, quizQuestions, apiQuestions, and categories are already declared in a shared scope
//   or you can duplicate the declarations from createQuiz.js if needed.)
const API_URL =
  "https://raw.githubusercontent.com/Hajar-El-Mhassani/Hajar-El-Mhassani.github.io/main/quizData/quiz/questionQuiz.json";

// If these variables are not already global, declare them:
let quizQuestions = [];
let apiQuestions = [];

// Get DOM elements for the Start Quiz page:
const quizListContainer = document.getElementById("quiz-list");
const questionList = document.getElementById("question-list");
const searchInput = document.getElementById("searchInput");
const close = document.getElementById("close");
const startQuizContainer = document.getElementById("start-quiz");

// (Assume categories is already loaded in localStorage or defined; if not, load defaults.)
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

// ---------- FETCH QUESTIONS & MERGE API CATEGORIES -----------
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

    // Merge user-added categories from questions.
    const allCategories = quizQuestions.map((q) => q.category);
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

    updateCategorySelect();
    if (searchInput) searchInput.value = "";
    displayQuizCards();
  } catch (err) {
    console.error("Failed to fetch API questions:", err);
    const localQuestions =
      JSON.parse(localStorage.getItem("quizQuestions")) || [];
    quizQuestions = [...localQuestions];
    updateCategorySelect();
    if (searchInput) searchInput.value = "";
    displayQuizCards();
  }
};

// ---------- UPDATE THE CATEGORY SELECT DROPDOWN (OTHER ALWAYS LAST) -----------
const updateCategorySelect = () => {
  const savedCategories =
    JSON.parse(localStorage.getItem("categories")) || categories;
  if (!savedCategories) return;
  // (You can use this if you have a select in startQuiz.html for filtering.)
};

// ---------- DISPLAY QUIZ CARDS (List of Categories) -----------
const displayQuizCards = () => {
  startQuizContainer.style.display = "none";
  if (!quizListContainer || !questionList) {
    console.warn("One or more container elements are missing.");
    return;
  }
  quizListContainer.innerHTML = "";
  // Exclude "Other" from the list.
  const allCategories = categories.filter(
    (cat) => cat.name.trim().toLowerCase() !== "other"
  );
  allCategories.forEach((categoryObj) => {
    const category = categoryObj.name;
    const questionsForCard = quizQuestions.filter((q) => {
      let qCategory =
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

// ---------- SHOW QUESTIONS FOR A SPECIFIC CATEGORY (List View) -----------
const showQuestionsForCategory = (categoryName) => {
  quizListContainer.style.display = "none";
  questionList.style.display = "block";
  questionList.innerHTML = "";
  if (searchInput) searchInput.placeholder = "Search by question ...";

  // Create a new search input if needed.
  const newSearchInput = searchInput.cloneNode(true);
  searchInput.parentNode.replaceChild(newSearchInput, searchInput);
  newSearchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    filterQuestionsByText(searchTerm, categoryName);
  });

  const questions = quizQuestions.filter((q) => {
    let qCategory =
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

  // Append a Play Quiz button that starts multiplayer mode.
  const playButtonContainer = document.createElement("div");
  playButtonContainer.className = "btn-group";
  const playQuizBtn = document.createElement("button");
  playQuizBtn.className = "play-quiz";
  playQuizBtn.textContent = "Play Quiz";
  playQuizBtn.disabled = questions.length === 0;
  playQuizBtn.addEventListener("click", () => {
    initMultiplayerQuiz(categoryName, questions);
  });
  playButtonContainer.appendChild(playQuizBtn);
  questionList.appendChild(playButtonContainer);
};

// ---------- FILTER QUESTIONS BY TEXT WITHIN A CATEGORY -----------
const filterQuestionsByText = (searchText, categoryName) => {
  questionList.innerHTML = "";
  const questionsInCategory = quizQuestions.filter((q) => {
    let qCategory =
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
  const playButtonContainer = document.createElement("div");
  playButtonContainer.className = "btn-group";
  const playQuizBtn = document.createElement("button");
  playQuizBtn.className = "play-quiz";
  playQuizBtn.textContent = "Play Quiz";
  playQuizBtn.disabled = filteredQuestions.length === 0;
  playButtonContainer.appendChild(playQuizBtn);
  questionList.appendChild(playButtonContainer);
};

// ---------- DELETE A QUESTION -----------
const deleteQuestionFromCategory = (questionText, categoryName) => {
  let localQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  localQuestions = localQuestions.filter((q) => {
    const qCat =
      typeof q.category === "string"
        ? q.category.trim().toLowerCase()
        : q.category.name.trim().toLowerCase();
    return !(
      qCat === categoryName.trim().toLowerCase() &&
      q.question.trim().toLowerCase() === questionText.trim().toLowerCase()
    );
  });
  localStorage.setItem("quizQuestions", JSON.stringify(localQuestions));
  quizQuestions = quizQuestions.filter((q) => {
    const qCat =
      typeof q.category === "string"
        ? q.category.trim().toLowerCase()
        : q.category.name.trim().toLowerCase();
    return !(
      qCat === categoryName.trim().toLowerCase() &&
      q.question.trim().toLowerCase() === questionText.trim().toLowerCase()
    );
  });
  filterQuestionsByText(searchInput.value, categoryName);
};

// ---------- SEARCH FUNCTIONALITY -----------
const searchQuizzes = () => {
  const query = document.getElementById("searchInput").value.trim();
  filterCategories(query);
};

const filterCategories = (searchTerm = "") => {
  if (!quizListContainer) return;
  quizListContainer.innerHTML = "";
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      cat.name.trim().toLowerCase() !== "other"
  );
  filteredCategories.forEach((category) => {
    const questionsInCategory = quizQuestions.filter((q) => {
      const qCat =
        typeof q.category === "string"
          ? q.category.trim()
          : q.category.name.trim();
      return qCat.toLowerCase() === category.name.toLowerCase();
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

// ---------- MULTIPLAYER QUIZ MODE -----------
const initMultiplayerQuiz = (categoryName, questions) => {
  // Hide the global search and question list container.
  const searchElement = document.querySelector(".search");
  if (searchElement) searchElement.style.display = "none";
  if (questionList) questionList.style.display = "none";

  // Clear and show the start quiz container.
  startQuizContainer.innerHTML = "";
  startQuizContainer.style.display = "block";

  // Display the player setup form.
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

const startQuizForCategoryWithPlayers = (categoryName, questions, players) => {
  const searchElement = document.querySelector(".search");
  if (searchElement) searchElement.style.display = "none";
  if (questionList) questionList.style.display = "none";
  startQuizContainer.style.display = "block";
  startQuizContainer.innerHTML = "";

  // Create scoreboard and add scoring buttons.
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

  // Randomize the questions.
  const randomizedQuestions = [...questions].sort(() => Math.random() - 0.5);
  let currentIndex = 0;
  const total = randomizedQuestions.length;

  const showQuestion = () => {
    // Keep the scoreboard (first child); remove the rest.
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
        // Attach scoring button listeners.
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

// ---------- EVENT LISTENERS ----------
window.addEventListener("DOMContentLoaded", async () => {
  // For the start quiz page, fetch questions.
  if (quizListContainer) {
    await fetchQuestions();
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
