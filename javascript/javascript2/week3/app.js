const startbutton = document.querySelector(".startBtn");
const createbutton = document.querySelector(".createBtn");
const containerCreate = document.querySelector(".container-create");
const mainContainer = document.querySelector(".container");

containerCreate.style.display = "none";
const anotherPage = (path) => {
  window.location.href = path;
};

const showCreateQuiz = () => {
  mainContainer.style.display = "none"; // Hide the main container
  containerCreate.style.display = "block"; // Show the create quiz section
};

startbutton.addEventListener("click", showCreateQuiz);

createbutton.addEventListener("click", () =>
  anotherPage("./createQuiz/index.html")
);
