let score = 0;
let currentColor = "";

let colorWords = {
  Green: ["Tree", "Grass", "Pear", "Leaf", "Frog"],
  Blue: ["Sky", "Ocean", "Blueberry", "Jeans", "Whale"],
  Red: ["Apple", "Strawberry", "Rose", "Tomato", "Firetruck"],
  Yellow: ["Banana", "Lemon", "Sun", "Corn", "School Bus"]
};

// Start button
$("#startBtn").click(function () {
  let name = $("#playerName").val();

  if (name == "") {
    name = "Guest";
  }

  $("#Greeting").text("Hi " + name + "!");
  $("#gameArea").show();

  newRound();
});

// New round
function newRound() {
  let colors = Object.keys(colorWords);

  let randomNumber = Math.floor(Math.random() * colors.length);

  currentColor = colors[randomNumber];

  let words = colorWords[currentColor];

  let wordNumber = Math.floor(Math.random() * words.length);

  let randomWord = words[wordNumber];

  $("#colorQuestion").text("Click the color that matches: " + randomWord);

  $("#answerButtons").empty();

  colors.forEach(function (color) {
    $("#answerButtons").append(
      `<button class="btn btn-outline-dark m-2 colorBtn" data-color="${color}">
        ${color}
      </button>`
    );
  });
}

// Answer button 
$(document).on("click", ".colorBtn", function () {
  let guessedColor = $(this).data("color");

  if (guessedColor == currentColor) {
    score++;
    $("#result").text("Correct!");
  } else {
    $("#result").text("Wrong! The answer was " + currentColor);
  }

  $("#score").text("Score: " + score);

  newRound();
});