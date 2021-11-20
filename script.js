const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("setting-form");
const difficultySelect = document.getElementById("difficulty");

// List of words to type
const words = [
  "type",
  "programming",
  "javascript",
  "morocco",
  "play",
  "game",
  "laptop",
  "focus",
  "money",
  "ui",
  "naruto",
  "damn",
  "boy",
  "work",
  "hard",
];

// Init word

let randomWord;

//Init score

let score = 0;

//Init time
let time = 10;

//Init difficulty

let difficulty =
  localStorage.getItem("difficulty") != null
    ? localStorage.getItem("difficulty")
    : "Easy";

// Set difficulty to stored one

difficultySelect.value =
  localStorage.getItem("difficulty") != null
    ? localStorage.getItem("difficulty")
    : "Easy";

text.focus();

//start counting down

const timeInterval = setInterval(updateTime, 1000);

// generete random word from the words array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add to dom

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//update time

function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Game over show screen

function gameOver() {
  endgameEl.innerHTML = `<h1>Time ran out!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;

  endgameEl.style.display = "flex";
}

addWordToDOM();

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";

    if (difficulty === "Hard") {
      time += 2;
    } else if (difficulty === "Meduim") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

// Setting btn click

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
