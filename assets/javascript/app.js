//========================================================================================
//QUESTION AND ANSWER VARIABLES
var triviaQuestions = [
    { q: "In which country did golf originate?",
        answers: [
            {a: "England", c: "incorrect"},
            {a: "Ireland", c: "incorrect"},
            {a: "Scotland", c: "correct"},
            {a: "Portgugal", c: "incorrect"}]},
    { q: "Which professional golfer hold the most major titles?",
        answers: [
            {a: "Jack Nicklaus", c: "correct"},
            {a: "Tiger Woods", c: "incorrect"},
            {a: "Gary Player", c: "incorrect"},
            {a: "Byron Nelson", c: "incorrect"}]},
    { q: "Which professional golfer is the current Fedex Cup winner?",
        answers: [
            {a: "Brooks Koepka", c: "incorrect"},
            {a: "Tiger Woods", c: "incorrect"},
            {a: "Rory McIlroy", c: "correct"},
            {a: "Justin Thomas", c: "incorrect"}]},
    { q: "When was golf first added to the Olympics?",
        answers: [
            {a: "2016", c: "incorrect"},
            {a: "1904", c: "correct"},
            {a: "1976", c: "incorrect"},
            {a: "1776", c: "incorrect"}]},
    { q: "Which club does a player typically hit the most during a round?",
        answers: [
            {a: "Driver", c: "incorrect"},
            {a: "Iron", c: "incorrect"},
            {a: "Wedge", c: "incorrect"},
            {a: "Putter", c: "correct"}]},
];
//GAMEPLAY VARIABLES
var ansCorrect = 0;
var ansIncorrect = 0;
var qCount = 0;
var unanswered = 0;
var gameRunning = true;
var questionPage = true;

//TIMER VARIABLES
var timeLeft = 15;
var intervalID;

//LOOPING VARIABLES
var triviaIndex = 0;
var questionIndex = "";
var answerIndex = [];
var currentCorrect = "";

//========================================================================================

//========================================================================================
//FUNCTION FOR DOCUMENT READY AND RUN GAME
$(document).ready(function () {
    $(document).on("click", ".answerClick", function() {
        var answerChoice = ($(this).attr("answer-value"));
        console.log("answer choice:" + answerChoice);
        if (answerChoice === "correct") {
        
            qCount++;
            //console.log("qCount = " + qCount);
            ansCorrect++;
            $("#correct").html(ansCorrect)
            console.log("c: " + ansCorrect);
            correct = true;
            loadAnswerpage();
            questionPage = false;
        } else if (answerChoice !== "correct") {
            qCount++;
            //console.log("qCount = " + qCount);
            ansIncorrect++;
            $("#incorrect").html(ansIncorrect)
            console.log("i: " + ansIncorrect);
            correct = false;
            loadAnswerpage();
            questionPage = false;
        }
        if (qCount === 5) {
            loadFinalPage();
        }
    })

});
//========================================================================================


//GAME RESET FUNCTIONS
//========================================================================================

//CLICK HANDLER FOR START/RESET GAME
$("#initialize").on("click", function() {
    gameReset();
})

//GAME RESET FUNCTION
function gameReset() {
    score = 0;
    ansIncorrect = 0;
    ansCorrect = 0;
    unaswered = 0;
    qCount = 0;
    triviaIndex = 0;
    questionIndex = "";
    answerIndex = [];
    gameRunning = true;
    questionPage = true;
    loadGamePage();
};
//========================================================================================


//GAMEPLAY FUNCTIONS
//========================================================================================

//CLEAR FIELDS AND LOAD QUESTIONS AND ANSWERS
function loadQuestion() {
    //clear the fields
    $(".questionField").empty();
    $(".answerField").empty();
    //pick question to load
    questionCurrent = triviaQuestions[triviaIndex].q;
    $(".questionField").html(questionCurrent);
    //find answers and load
    answerIndex = [triviaQuestions[triviaIndex].answers[0].a, triviaQuestions[triviaIndex].answers[1].a, triviaQuestions[triviaIndex].answers[2].a, triviaQuestions[triviaIndex].answers[3].a];
    check = [triviaQuestions[triviaIndex].answers[0].c, triviaQuestions[triviaIndex].answers[1].c, triviaQuestions[triviaIndex].answers[2].c, triviaQuestions[triviaIndex].answers[3].c];
    for (var i = 0; i < triviaQuestions.length; i++) {
        var answerClick = $("<button>");
        answerClick.addClass("answerClick");
        answerClick.attr("answer-value", check[i]);
        answerClick.text(answerIndex[i]);
        $(".answerField").append(answerClick);
    }
    currentAnswer = check.indexOf("correct");
    console.log("index: " + currentAnswer);
    currentAnswer = answerIndex[currentAnswer];
    console.log("correct: " + currentAnswer);
    if (currentAnswer === "correct") {
        questionCurrent++;
        console.log("current: " + questionCurrent);
    }
    if (qCount === 5) {
        loadFinalPage();
    }
};

//FUNCTION FOR LOADING PAGE AFTER INIT
function loadGamePage() {
    $("#timertext").html("You have 15 seconds to choose an answer.");
    loadQuestion();
    timeLeft = 15;
    $("#timerplace").html("Time left: " + timeLeft + (" seconds."));
    correct = "";
    clearInterval(intervalID);
    intervalID = setInterval(timerCountdown, 1000);
}

//FUNCTION FOR LOADING NEXT QUESTION
function loadNextPage() {
    if (qCount === 5) {
        loadFinalPage();
    } else if (questionPage === false) {
        loadGamePage();
        questionPage = true;
    } else {
        unaswered++;
        //console.log(unaswered);
        loadAnswerpage();
        questionPage = false;
    }
}

//FUNCTION TO CALL ANSWER PAGE
function loadAnswerpage() {
    triviaIndex++;
    //console.log(triviaIndex);
    timeLeft = 3;
    $("#timerplace").html("You have " + timeLeft + " seconds until the next question.");
    $(".questionField").empty();
    $(".answerField").empty();
    if (correct === true) {
        $(".answerField").html("Good job!! That is correct.");
    } else if (correct === false) {
        $(".answerField").html("Womp Womp. Swing and a miss.");
    } else {
        $(".answerField").html("Unfortunately you did not answer that one.");
    }
    //qCount++;
    console.log("count" + qCount,"correct" + correct);
    clearInterval(intervalID);
    intervalID = setInterval(timerCountdown, 1000);
}

//FUNCTION FOR LOADING END GAME PAGE
function loadFinalPage() {
    if (qCount === 5) {
    $(".questionField").empty();
    $(".answerField").empty();
    $("#timerplace").empty();
    $(".resultsField").html("Your results: " + ansCorrect + " correct, " + ansIncorrect + " incorrect, and " + unanswered + " unanswered questions. Great work!!");
    var doItAgain = $("<button>");
    doItAgain.addClass("startover");
    doItAgain.text("Wanna play another round?");
    $(".answerField").append(doItAgain);
    $(document).on("click", ".startover", function() {
        gameReset();
    })
}
}

//TIMER
function timerCountdown() {
    timeLeft--;
    if (questionPage === true) {
        $("#timerplace").html("Time left: " + timeLeft + (" seconds."));
    } else {
        $("#timerplace").html("Next question in " + timeLeft + (" seconds."));
    }
    if (timeLeft === 0) {
        loadNextPage();
    }
}
//========================================================================================