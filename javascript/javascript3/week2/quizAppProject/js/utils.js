export const API_URL =
  "https://raw.githubusercontent.com/Hajar-El-Mhassani/Hajar-El-Mhassani.github.io/main/quizData/quiz/questionQuiz.json";

export class Category {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
  addToDropdown(selectCategory) {
    const option = document.createElement("option");
    option.value = this.value;
    option.textContent = this.name;
    selectCategory.appendChild(option);
  }
}

export class Question {
  constructor(category, questionText, options, explanation = "") {
    this.category = category;
    this.questionText = questionText;
    this.options = options;
    this.explanation = explanation;
  }
}

export let categoriesArray = [
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

export let quizQuestions = [];
export let apiQuestions = [];

export const updateCategorySelect = (selectCategory) => {
  if (!selectCategory) return;
  selectCategory.innerHTML =
    '<option value="" disabled selected>Select a category</option>';
  categoriesArray.forEach((category) => category.addToDropdown(selectCategory));
};

export const fetchQuestions = async (
  selectCategory,
  searchInput,
  displayQuizCards
) => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    apiQuestions = (Array.isArray(data) ? data : data.questions || []).map(
      (q) => {
        let cat = categoriesArray.find(
          (c) => c.name.toLowerCase() === q.category.toLowerCase()
        );
        if (!cat) {
          cat = new Category(q.category, categoriesArray.length + 1);
          categoriesArray.push(cat);
        }
        return new Question(cat, q.question, q.options, q.explanation);
      }
    );

    const localQuestionsData =
      JSON.parse(localStorage.getItem("quizQuestions")) || [];
    quizQuestions = [...apiQuestions, ...localQuestionsData];

    const allCats = quizQuestions.map((q) =>
      typeof q.category === "string" ? q.category : q.category.name
    );
    const uniqueCats = [...new Set(allCats)].filter(
      (cat) =>
        !categoriesArray.find((c) => c.name.toLowerCase() === cat.toLowerCase())
    );
    uniqueCats.forEach((cat) =>
      categoriesArray.push(new Category(cat, categoriesArray.length + 1))
    );

    updateCategorySelect(selectCategory);
    if (searchInput) searchInput.value = "";
    displayQuizCards();
  } catch (err) {
    console.error("Failed to fetch API questions:", err);
    const localQuestionsData =
      JSON.parse(localStorage.getItem("quizQuestions")) || [];
    quizQuestions = [...localQuestionsData];
    updateCategorySelect(selectCategory);
    if (searchInput) searchInput.value = "";
    displayQuizCards();
  }
};

export const postQuestion = async (
  newQuestion,
  displayQuizCards,
  selectCategory
) => {
  const localQuestions =
    JSON.parse(localStorage.getItem("quizQuestions")) || [];
  localQuestions.push({
    category: newQuestion.category.name,
    question: newQuestion.questionText,
    options: newQuestion.options,
    explanation: newQuestion.explanation,
  });
  localStorage.setItem("quizQuestions", JSON.stringify(localQuestions));

  quizQuestions = [...apiQuestions, ...localQuestions];

  if (
    !categoriesArray.find(
      (cat) =>
        cat.name.toLowerCase() === newQuestion.category.name.toLowerCase()
    )
  ) {
    categoriesArray.push(
      new Category(newQuestion.category.name, categoriesArray.length + 1)
    );
    updateCategorySelect(selectCategory);
  }

  displayQuizCards();
};

export const deleteQuestionFromCategory = (
  questionText,
  categoryName,
  searchInput,
  filterQuestionsByText
) => {
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
