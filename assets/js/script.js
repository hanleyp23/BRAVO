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
    $("#restartBtn").click(restartGame);

    restartGame();
});

function restartGame() {
    score = 0;
    $("#scoreText").text("Score: 0");
    $("#message").text("");
    newRound();
}

function newRound() {
    let colors = Object.keys(colorWords);
    currentColor = colors[Math.floor(Math.random() * colors.length)];

    $("#targetColor").text("Pick a " + currentColor + " word");

    $("#wordButtons").html("");

    for (let color in colorWords) {
        let word = colorWords[color][0];

        $("#wordButtons").append(
            "<button class='btn btn-primary m-2 wordBtn'>" + word + "</button>"
        );
    }
}

$(document).on("click", ".wordBtn", function () {
    let word = $(this).text();

    if (colorWords[currentColor].includes(word)) {
        score = score + 1;
        $("#message").text("Correct!");
    } else {
        score = 0;
        $("#message").text("Wrong! Score reset to 0.");
    }

    $("#scoreText").text("Score: " + score);
    newRound();
});