const startbutton = document.querySelector(".startBtn");
const createbutton = document.querySelector(".createBtn");

const anotherPage = (path) => {
  window.location.href = path;
};

startbutton.addEventListener("click", () => {
  anotherPage("./startQuiz.html");
});

createbutton.addEventListener("click", () => anotherPage("./createQuiz.html"));
