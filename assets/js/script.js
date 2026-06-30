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

// Names guest 
  if (name == "") {
    name = "Guest";
  }

  $("#Greeting").text("Hi " + name + "!");
  $("#gameArea").show();

  newRound();
});

// Create a new random round
function newRound() {
  let colors = Object.keys(colorWords);

  let randomNumber = Math.floor(Math.random()