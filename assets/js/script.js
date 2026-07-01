let score = 0;
let currentColor = "";
let timer;
let timeLeft = 0;

let colorWords = {
    Green: ["Tree", "Grass", "Leaf", "Frog"],
    Blue: ["Sky", "Ocean", "Whale", "Jeans"],
    Red: ["Apple", "Rose", "Tomato", "Firetruck"],
    Yellow: ["Banana", "Lemon", "Sun", "Corn"]
};

let name = localStorage.getItem("playerName") || "Guest";
$("#playerGreeting").text("Hi " + name + "!");

$("#restartBtn").click(function () {
    startGame();
});

$("#startFullBtn").click(function () {
    startGame();
});

if (!$("#startFullBtn").length) {
    startGame();
}

function startGame() {
    score = 0;
    $("#scoreText").text("Score: 0");
    $("#message").text("");
    $("#wordButtons").show();

    clearInterval(timer);

    if ($("#difficulty").length) {
        timeLeft = Number($("#difficulty").val());
        $("#timerText").text("Time: " + timeLeft);

        timer = setInterval(function () {
            timeLeft--;
            $("#timerText").text("Time: " + timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timer);
                $("#wordButtons").hide();
                $("#message").text("Game Over!");
            }
        }, 1000);
    }

    newRound();
}

function newRound() {
    let colors = Object.keys(colorWords);
    currentColor = colors[Math.floor(Math.random() * colors.length)];

    $("#targetColor").text("Pick a " + currentColor + " word");
    $("#wordButtons").empty();

    for (let color in colorWords) {
        let word = colorWords[color][0];
        $("#wordButtons").append("<button class='btn btn-primary m-2 wordBtn'>" + word + "</button>");
    }
}

$(document).on("click", ".wordBtn", function () {
    let word = $(this).text();

    if (colorWords[currentColor].includes(word)) {
        score++;
        $("#message").text("Correct!");
    } else {
        score = 0;
        $("#message").text("Wrong! Score reset to 0.");
    }

    $("#scoreText").text("Score: " + score);

    if ($("#highScoreText").length) {
        let highScore = localStorage.getItem("highScore") || 0;

        if (score > highScore) {
            localStorage.setItem("highScore", score);
            $("#highScoreText").text("High Score: " + score);

            if ($("#highScoreModal").length) {
                $("#modalScoreText").text("New high score: " + score);
                let modal = new bootstrap.Modal(document.getElementById("highScoreModal"));
                modal.show();
            }
        } else {
            $("#highScoreText").text("High Score: " + highScore);
        }
    }

    if (timeLeft > 0 || !$("#difficulty").length) {
        newRound();
    }
});