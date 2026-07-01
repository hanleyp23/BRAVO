let score = 0;
let currentColor = "";

let colorWords = {
    Green: ["Tree", "Grass", "Leaf", "Frog"],
    Blue: ["Sky", "Ocean", "Whale", "Jeans"],
    Red: ["Apple", "Rose", "Tomato", "Firetruck"],
    Yellow: ["Banana", "Lemon", "Sun", "Corn"]
};

let name = localStorage.getItem("playerName") || "Guest";
$("#playerGreeting").text("Hi " + name + "!");

$("#restartBtn").click(function () {
    score = 0;
    $("#scoreText").text("Score: 0");
    newRound();
});

newRound();

function newRound() {

    let colors = Object.keys(colorWords);

    currentColor = colors[Math.floor(Math.random() * colors.length)];

    $("#targetColor").text(currentColor);
    $("#targetColor").css("color", currentColor);

    $("#wordButtons").empty();

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
        score++;
        $("#message").text("Correct!");
    }
    else {
        score = 0;
        $("#message").text("Wrong! Score reset to 0.");
    }

    $("#scoreText").text("Score: " + score);

    if ($("#highScoreText").length) {
        let high = localStorage.getItem("highScore") || 0;

        if (score > high) {
            high = score;
            localStorage.setItem("highScore", high);
        }

        $("#highScoreText").text("High Score: " + high);
    }

    newRound();

});