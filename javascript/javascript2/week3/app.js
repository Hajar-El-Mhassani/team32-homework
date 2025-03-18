const startbutton = document.querySelector(".startBtn");
const createbutton = document.querySelector(".createBtn");

const anotherPage = (path) => {
  window.location.href = path;
};

startbutton.addEventListener("click", () =>
  anotherPage("./startQuiz/index.html")
);

createbutton.addEventListener("click", () =>
  anotherPage("./createQuiz/index.html")
);

const containerCreate = document.querySelector(".container-create");
containerCreate.disabledd = true;
