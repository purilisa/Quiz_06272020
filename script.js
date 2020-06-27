// var timer = $("#timer");
var mainEl = document.getElementById("main");
var startquiz = document.getElementById("startquiz");
var quizFirstPage = document.getElementById("hidecontainer");
var timer = document.getElementById("timer");
var container = document.querySelector(".container");
var quizzcontainer = document.querySelector("#quizzcontainer");
var questioncontainer = document.querySelector(".questions");
var scorecontainer = document.querySelector(".scoreContainershow");
var answercontainer = document.querySelector(".answers");
var gethighscore = document.getElementById("Highscore");
var initial = document.querySelector("#yourInitial");
var getHighScore = document.querySelector("#highScore");
var submitInitials = document.querySelector("#submitInitials");
var displayInitial = document.querySelector(".initialDisplay");
var displayScore = document.querySelector(".scoreDisplay");
var deleteQuizResults = document.querySelector("#deleteQuizResults");
var secondsLeft = 200;
var highscore = 0;
var currQuestion = 0;

var nextButton = document.createElement("button");
nextButton.innerText = "Next";
nextButton.style.backgroundColor = "darkgreen";
nextButton.style.borderRadius = "5px";
nextButton.style.color = "white";
nextButton.style.fontSize = "25px";
quizzcontainer.appendChild(nextButton);
nextButton.setAttribute("id", "quizNextButton");
var correct = "no";
var answerEl = "";
var firstAns = "";
var secondAns = "";
var thirdAns = "";
var userInitial = "";
var next = document.querySelector("#quizNextButton");
var AnsArray = [];


// hide start page of the quiz
function hideFirstPage() {
    quizFirstPage.style.display = "none";
}

//display the quiz
function displayQuizzPage() {
    quizzcontainer.style.display = "block";
}
//hide once quiz starts
function hideQuizzPage() {
    quizzcontainer.style.display = "none";
}
//display once quiz is complete
function displayScorePage() {
    scorecontainer.style.display = "block";
}

//Questions and Answers Array
var questAndAnsObject = [{
        questions: "1) How do you group selectors? ",
        answers: ["Seperate each selector with a comma", "Seperate each selector a with a plus sign", "Seperate each selector with a space"],
        correctAns: 0
    },
    {
        questions: "2) What is the default value of the position property? ",
        answers: ["fixed", "absolute", "relative", "static"],
        correctAns: 3
    },
    {
        questions: "3) When using padding properties, are you allowed to use negative values? ",
        answers: ["Yes", "No"],
        correctAns: 1
    }
]

//Will initiate quiz
function startQuiz() {
    hideFirstPage();
    currQuestion = 0;
    displayQuizzPage();
    decrementTimer();
    displayQuestions();

}
//will display quizz questions and answers
function displayQuestions() {
    if (questAndAnsObject.length === currQuestion) {
        endGame();
        return; //stops this method from exec
    }

    var question = questAndAnsObject[currQuestion].questions;
    var answer = questAndAnsObject[currQuestion].answers;
    var correctAns = questAndAnsObject[currQuestion].correctAns;

    answercontainer.innerHTML = "";
    questioncontainer.innerHTML = question;
    for (var i = 0; i < answer.length; i++) {
        var answerEl = document.createElement("button");
        answerEl.style.display = "inline-block";
        answerEl.style.width = "50%";
        answerEl.style.marginRight = "10rem";
        answerEl.style.marginBottom = "2rem";
        answerEl.style.backgroundColor = "darkgreen";
        answerEl.style.color = "white";
        answerEl.classList.add('answerClass');
        answerEl.innerText = answer[i];
        answerEl.addEventListener("click", verifyQuizAns);
        correct = "no";
        if (i === correctAns) {
            correct = "yes";
        }

        answerEl.setAttribute("value", correct);
        answercontainer.appendChild(answerEl);

    }
    currQuestion++;
}
//validate answer
function verifyQuizAns() {
    var answers = document.querySelectorAll(".answerClass");

    for (let index = 0; index < answers.length; index++) {
        var ans = answers[index];
        if (ans.value === "yes") {
            ans.style.backgroundColor = "yellow";
            ans.style.color = "green";
        } else {
            ans.style.backgroundColor = "red";
            ans.style.color = "white";
        }

    }

    if (this.value === "yes") {
        alert("Correct Answer!!");
        highscore += 10;

    } else {
        secondsLeft -= 5;
        alert("Wrong Answer, your quiz time decremented by " + (5));
        if (secondsLeft == 0) {
            endGame();
        }
    }
}

//continue quiz with next question in line
function goToNextQuestion() {
    questioncontainer.innerHTML = "";
    displayQuestions();

}

//end quiz, total score and display it on new score page
function endGame() {
    hideQuizzPage();
    displayScorePage();
    alert("You have completed this quiz!");
    displayHighScore();
}

//countdown from secondsleft
function decrementTimer() {

    $("#timer").text("Time left in seconds: " + secondsLeft);
    var timerInterval = setInterval(function() {
        secondsLeft--;
        if (secondsLeft <= 0) {
            stop();
        }
        $("#timer").text("Time left in seconds: " + secondsLeft);
    }, 1000);

    function stop() {
        clearInterval(timerInterval);
        endGame();
    }
}

//gets highscore and displays on score page
function displayHighScore() {
    getHighScore.value = highscore;
}

function setDataInLocalStorage() {
    //get data to store in local storage
    var userObj = {
        initials: initial.value,
        score: highscore
    };
    localStorage.setItem("userInfo", JSON.stringify(userObj));
    return userObj;
}

function getDataFromLocalStorage() {

    var dataFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
    displayInitial.innerText = dataFromLocalStorage.initials;
    displayScore.innerText = " your score is " + dataFromLocalStorage.score;

    document.querySelector(".scoretitle").style.display = "block";
    deleteQuizResults.style.display = "inline-block";

}


function deleteResults() {

    localStorage.removeItem("userInfo");
    displayScore.innerHTML = "";
    displayInitial.innerHTML = "";
    deleteQuizResults.style.display = "none";
    if (deleteQuizResults.style.display === "none") {

        document.querySelector(".scoretitle").style.display = "none";
    }
}

//Eventlisteners
$("#startquiz").click(startQuiz);
nextButton.addEventListener("click", goToNextQuestion);

//once user submit initials, clears out total score and user initials
submitInitials.addEventListener("click", function(event) {
    event.preventDefault();
    setDataInLocalStorage();
    getDataFromLocalStorage();

    highscore = "";
    initial.value = "";
    getHighScore.value = "";


});
//onclicking delete results clears out display of quiz score data
$("#deleteQuizResults").on("click", deleteResults);