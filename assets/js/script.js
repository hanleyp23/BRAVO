let score = 0;
let currentColor = "";

let colorWords = {
  Green: ["Tree", "Grass", "Leaf", "Frog"],
  Blue: ["Sky", "Ocean", "Whale", "Jeans"],
  Red: ["Apple", "Rose", "Tomato", "Firetruck"],
  Yellow: ["Banana", "Lemon", "Sun", "Corn"]
};

$(document).ready(function () {
  let name = localStorage.getItem("playerName") || "Guest";

  $("#playerGreeting").text("Hi " + name + "!");
  $("#restartBtn").click(startGame);

  startGame();
});

function startGame() {
  score = 0;
  $("#scoreText").text("Score: 0");
  $("#message").text("");
  newRound();
}

function newRound() {
  let colors = Object.keys(colorWords);
  currentColor = colors[Math.floor(Math.random() * colors.length)];

  $("#targetColor").text(currentColor);
  $("#targetColor").css("color", currentColor.toLowerCase());

  $("#wordButtons").empty();

  let allWords = [];

  for (let color in colorWords) {
    allWords = allWords.concat(colorWords[color]);
  }

  allWords.sort(function () {
    return Math.random() - 0.5;
  });

  allWords.slice(0, 6).forEach(function (word) {
    $("#wordButtons").append(
      `<button class="btn btn-outline-primary m-2 wordBtn">${word}</button>`
    );
  });
}

$(document).on("click", ".wordBtn", function () {
  let chosenWord = $(this).text();

  if (colorWords[currentColor].includes(chosenWord)) {
    score++;
    $("#scoreText").text("Score: " + score);
    $("#message").text("Correct!");
  } else {
    score = 0;
    $("#scoreText").text("Score: 0");
    $("#message").text("Wrong! Score reset to 0.");
  }

  newRound();
});