var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 10;
var intervalId = 0;
var questionNum = 0;
var intervalIdTime = 0;
var clicked = 0;
var timeoutId = 0;
var timeoutId1 = 0;
var timeoutId2 = 0;
var userAnswer = "";
var audio = 0;

var questionsArr = [
    { theQuestion: "What is the hottest planet in the solar system?", choice1: "Mercury", choice2: "Earth", choice3: "Venus", theAnswer: "Venus", image: "assets/images/Venus.jpg" },
    { theQuestion: "What is the name of the most powerful geyser located in Yellowstone National Park?", choice1: "Steamboat Geyser", choice2: "Castle Geyser", choice3: "Giant Geyser", theAnswer: "Steamboat Geyser", image: "assets/images/SteamboatGeyser.jpg" },
    { theQuestion: "Glass is made of what?", choice1: "Rock", choice2: "Sand", choice3: "Marble", theAnswer: "Sand", image: "assets/images/Sand.jpg" },
    { theQuestion: "What is the lowest in North America at 282 feet below sea level?", choice1: "Badwater Basin", choice2: "Salton Sea", choice3: "Dead Sea", theAnswer: "Badwater Basin", image: "assets/images/BadwaterBasin.jpg" },
    { theQuestion: "Almost _ of the earths surface is covered by water.", choice1: "one-half", choice2: "three-fourths", choice3: "two-thirds", theAnswer: "two-thirds", image: "assets/images/Earth.jpg" }, 
];

$("#done").on("click", startGame);
$("#start").on("click", startGame);
$(".choices").click(choiceSelected);
//
function startGame() {
    if (questionNum >= questionsArr.length) {
        endGame();
    } else {
        $("#tallies").hide();
        $("#answer").hide();
        $("#questions").show();
        insertQuestion();
        clearInterval(intervalId);
        intervalId = setInterval(loadQuestion, 14000);
    }
}
//
function insertQuestion() {
    time = 7;
    clearInterval(intervalIdTime);
    intervalIdTime = setInterval(countTime, 1000);
    $("#startDiv").hide();
    $("#questions").show();
    $("#divToInsert").html(`<h1 class="question"><b>${questionsArr[questionNum].theQuestion}</b></h1>
            <p><button class="choices" name="q${questionNum}1" id="q${questionNum}1" value="${questionsArr[questionNum].choice1}"> ${questionsArr[questionNum].choice1}</button></p> 
            <p><button class="choices" name="q${questionNum}2" id="q${questionNum}2" value="${questionsArr[questionNum].choice2}"> ${questionsArr[questionNum].choice2}</button></p> 
            <p><button class="choices" name="q${questionNum}3" id="q${questionNum}3" value="${questionsArr[questionNum].choice3}"> ${questionsArr[questionNum].choice3}</button>
            </p>`);

    $(".choices").click(choiceSelected);

    clearTimeout(timeoutId);
    timeoutId = setTimeout(displayAnswer, 10000);
}
//function to load the question
function loadQuestion() {
    if (questionNum >= questionsArr.length) {
        endGame();
    } else {
        $("#answer").hide();
        $("#questions").show();
        insertQuestion();
    }
}
//
function displayAnswer() {
    clearInterval(intervalIdTime);
    $("#questions").hide();
    checkQuestion(userAnswer);
    $("#answer").show();
    questionNum++;
    userAnswer="";
}
//function to count the timer & insert it to myTimer
function countTime() {
    $("#myTimer").text(time);
    time--;
}
//function to end game hide questions div & show scores div
function endGame() {
    if (correct>=3) {loadSong(1);}
    else {loadSong(0);}
    $("#correct").text(correct);
    $("#incorrect").text(incorrect);
    $("#noAnswer").text(unanswered);
    questionNum = 0;
    clearInterval(intervalIdTime);
    clearInterval(intervalId);
    clearTimeout(timeoutId1);
    clearTimeout(timeoutId2);
    $("#answer").hide();
    $("#questions").hide();
    $("#tallies").show();
    correct = 0;
    incorrect = 0;
    unanswered = 0;
}
//
function choiceSelected() {
    if ($(this).val()) userAnswer=$(this).val();
    else userAnswer="";
    clearInterval(intervalIdTime);
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    clearTimeout(timeoutId1);
    //checkQuestion(userAnswer);
    timeoutId1 = setTimeout(displayAnswer, 900);
    clearTimeout(timeoutId2);
    timeoutId2 = setTimeout(startGame, 5000);
}
//
function checkQuestion(val) {
    var str = "";
    if (!val) {
        loadSong(0);
        str = "<h1 class='card-title'>Time's Up!</h1>"+"<h2 class='card-title'>The correct answer is <p>"+questionsArr[questionNum].theAnswer+"</p></h2>";
        str += "<img class='imageAnswer' src='"+questionsArr[questionNum].image+"' >";
        unanswered++;
    } else if (val === questionsArr[questionNum].theAnswer) {
        loadSong(1);
        str = "<h1 class='card-title'>Congratulations!</h1>"+"<h2 class='card-title'>You selected the correct answer <p>"+questionsArr[questionNum].theAnswer+"</p></h2>";
        str += "<img class='imageAnswer' src='"+questionsArr[questionNum].image+"' >";
        correct++;
    } else if (val !== questionsArr[questionNum].theAnswer) {
        loadSong(0);
        str = "<h1 class='card-title'>Wrong Answer!</h1>"+"<h2 class='card-title'>The correct answer is <p>"+questionsArr[questionNum].theAnswer+"</p></h2>";
        str += "<img class='imageAnswer' src='"+questionsArr[questionNum].image+"' >";
        incorrect++;
    }
    $("#divToInsertAnswer").html(str);
}
//function to load different sound clips on different scenarios
function loadSong(flag) {
    var audioToPlay = "";
    if (flag==0) audioToPlay = "assets/audio/SadTrombone.mp3";
    else if (flag==1) audioToPlay = "assets/audio/Applause.mp3";
    audio = new Audio(audioToPlay);
    audio.play();
}