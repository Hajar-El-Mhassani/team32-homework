const startbutton = document.querySelector(".startBtn");
const createbutton = document.querySelector(".createBtn");
const containerCreate = document.querySelector(".container-create");

containerCreate.style.display = "none";
const anotherPage = (path) => {
  window.location.href = path;
};

const showCreateQuiz = () => {
  // Hide all sections before showing the new one
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "none";
  });

  containerCreate.style.display = "block"; // Show the create quiz section
};

startbutton.addEventListener("click", () => {
  anotherPage("./startQuiz/index.html");
});

createbutton.addEventListener("click", () =>
  anotherPage("./createQuiz/index.html")
);
