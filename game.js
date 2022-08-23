var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var start = false;
var level = 0;
// this code is for starting the game i.e press any key to start the game
$(document).keypress(function () {
    if (start == false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

// code for button click
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

//it is the main code for the game
function nextSequence() {

    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    // increase level by 1 everytime nextsequence is called
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

// function for playing sound
function playSound(name) {
    var audio = new Audio("sounds\\" + name + ".mp3");
    audio.play();
}

// function for animation while clicking button
function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

//1. Create a new function called startOver().
function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    start = false;
}