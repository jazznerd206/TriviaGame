//QUESTION AND ANSWER VARIABLES
var triviaQuestions = [
    { q: "In which country did golf originate?",
        answers: [
            {a: "England", c: "correct"},
            {a: "Ireland", c: "incorrect"},
            {a: "Scotland", c: "incorrect"},
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
score = 0;
var wins = 0;
var losses = 0;
var qCount = 0;
var unaswered = 0;
var correct = false;
var gameRunning = false;
var questionPage = false;

//TIMER VARIABLES
var timeLeft = 15;

//LOOPING VARIABLES
var triviaIndex = 0;
var questionIndex = "";
var answerIndex = [];
var currentCorrect = "";

//CLICK HANDLER FOR START GAME
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
    loadQuestion();
};

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
    for (var i = 0; i < 4; i++) {
        var answerClick = $("<button>");
        answerClick.addClass("answerClick");
        answerClick.attr("answer-value", check)
        answerClick.text(answerIndex[i]);
        $(".answerField").append(answerClick);
    }};
