const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Bangalore", correct: false },
            { text: "Chennai", correct: false }
        ]
    },
    {
        question: "Which language is used to create web page structure?",
        answers: [
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "HTML", correct: true },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style System", correct: false },
            { text: "Creative Style Sheets", correct: false },
            { text: "Color Style System", correct: false }
        ]
    },
    {
        question: "Which company developed Java?",
        answers: [
            { text: "Google", correct: false },
            { text: "Microsoft", correct: false },
            { text: "Sun Microsystems", correct: true },
            { text: "Apple", correct: false }
        ]
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        answers: [
            { text: "##", correct: false },
            { text: "//", correct: true },
            { text: "**", correct: false },
            { text: "<!-- -->", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const numberElement = document.getElementById("question-number");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");

function showQuestion() {

    nextButton.disabled = true;
    answersElement.innerHTML = "";

    numberElement.innerText =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    questionElement.innerText =
        questions[currentQuestion].question;

    questions[currentQuestion].answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;
        button.classList.add("answer-btn");

        button.addEventListener("click", function() {
            selectAnswer(button, answer.correct);
        });

        answersElement.appendChild(button);
    });
}

function selectAnswer(selectedButton, correct) {

    if (correct) {
        score++;
    }

    Array.from(answersElement.children).forEach(button => {

        button.disabled = true;

        const answer = questions[currentQuestion].answers.find(
            item => item.text === button.innerText
        );

        if (answer.correct) {
            button.classList.add("correct");
        }
    });

    if (!correct) {
        selectedButton.classList.add("wrong");
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", function() {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {

    document.getElementById("quiz").classList.add("hide");
    document.getElementById("result").classList.remove("hide");

    document.getElementById("score").innerText =
        "Your Score: " + score + " / " + questions.length;
}

function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz").classList.remove("hide");
    document.getElementById("result").classList.add("hide");

    showQuestion();
}

window.restartQuiz = restartQuiz;

showQuestion();