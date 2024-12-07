const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        correct: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: "Mars",
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4",
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const timeLeftDisplay = document.getElementById("time-left");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const finalScore = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

// Start the quiz
loadQuestion();

// Function to load a question
function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectAnswer(option));
        optionsList.appendChild(li);
    });
    startTimer();
}

// Reset timer and options
function resetState() {
    clearInterval(timer);
    timeLeft = 10;
    timeLeftDisplay.textContent = timeLeft;
    optionsList.innerHTML = "";
    nextBtn.style.display = "none";
}

// Timer countdown
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showNextButton();
        }
    }, 1000);
}

// Handle answer selection
function selectAnswer(selectedOption) {
    clearInterval(timer);
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct) {
        score++;
    }
    showNextButton();
}

// Show next button
function showNextButton() {
    nextBtn.style.display = "inline-block";
}

// Load the next question
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

// Show final score
function showScore() {
    document.getElementById("question-container").classList.add("hidden");
    nextBtn.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    finalScore.textContent = `${score} out of ${quizData.length}`;
}

// Restart quiz
restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("question-container").classList.remove("hidden");
    scoreContainer.classList.add("hidden");
    loadQuestion();
});