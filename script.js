
const questions = [
    {
        question: "What does HTML stand for?",

        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],

        correctAnswer: 1
    },

    {
        question:
            "Which language is used to make a webpage interactive?",

        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        correctAnswer: 2
    },
    {
        question:
            "Which symbol is used for comments in JavaScript?",

        answers: [
            "<!-- -->",
            "//",
            "#",
            "/* */ only"
        ],

        correctAnswer: 1
    },
    {
        question:
            "Which keyword is used to declare a variable in JavaScript?",

        answers: [
            "variable",
            "let",
            "varName",
            "declare"
        ],

        correctAnswer: 1
    }

];
// GET HTML ELEMENTS
const questionElement =
    document.getElementById("question");

const answerButtons =
    document.getElementById("answer-buttons");

const nextButton =
    document.getElementById("next-btn");

const feedback =
    document.getElementById("feedback");

const questionNumber =
    document.getElementById("question-number");

const resultBox =
    document.getElementById("result");

const scoreElement =
    document.getElementById("score");

const totalElement =
    document.getElementById("total");

const restartButton =
    document.getElementById("restart-btn");

const progressBar =
    document.getElementById("progress-bar");

// VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// START QUIZ

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false;
    resultBox.style.display = "none";
    questionElement.style.display = "block";
    answerButtons.style.display = "flex";
    questionNumber.style.display = "block";
    feedback.style.display = "block";
    nextButton.style.display = "block";
    totalElement.textContent =questions.length;
    showQuestion();
}

// SHOW QUESTION
function showQuestion() {
    answerButtons.innerHTML = "";
    feedback.textContent = "";
    answerSelected = false;
    nextButton.disabled = true;
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent =currentQuestion.question;
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    // Progress
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width =progress + "%";

    // Create answer buttons
    currentQuestion.answers.forEach(
        (answer, index) => {
            const button =
                document.createElement("button");
            button.type = "button";

            button.classList.add(
                "answer-btn"
            );

            button.textContent =
                answer;

            button.addEventListener(
                "click",
                function () {

                    selectAnswer(index);

                }
            );
            answerButtons.appendChild(button);

        }
    );
}

function selectAnswer(selectedIndex) {

    // Prevent multiple selections
    if (answerSelected) {
        return;
    }
    answerSelected = true;
    const currentQuestion =  questions[currentQuestionIndex];
    const buttons = document.querySelectorAll( ".answer-btn" );


    // Enable Next button
    nextButton.disabled = false;

    // Selected answer
    buttons[selectedIndex]
        .classList.add("selected");

    // Check answer
    if (
        selectedIndex ===
        currentQuestion.correctAnswer
    ) {
        // Correct
        buttons[selectedIndex]
            .classList.add("correct");

        feedback.textContent =
            "✓ Correct Answer!";

        feedback.style.color =
            "#16a34a";
        score++;
    }

    else {

        // Wrong
        buttons[selectedIndex] .classList.add("wrong");

        // Show correct answer
        buttons[
            currentQuestion.correctAnswer
        ]
            .classList.add("correct");
        feedback.textContent = "✗ Wrong Answer!"; feedback.style.color ="#dc2626";
    }
    // Disable all answers
    buttons.forEach(
        button => {

            button.disabled = true;
        }
    );
}
// NEXT BUTTON
nextButton.addEventListener(
    "click",
    function () {

        if (!answerSelected) {
            return;
        }
        currentQuestionIndex++;
        if (
            currentQuestionIndex <
            questions.length
        ) {
            showQuestion();
        }
        else {
            showResult();
        }

    }
);

// SHOW RESULT

function showResult() {
    questionElement.style.display = "none";
    answerButtons.style.display = "none";
    questionNumber.style.display = "none";
    feedback.style.display = "none";
    nextButton.style.display = "none";
    resultBox.style.display = "block";
    scoreElement.textContent =score;
    totalElement.textContent = questions.length;
    progressBar.style.width = "100%";
}



// RESTART
restartButton.addEventListener(
    "click",
    function () {
        startQuiz();
    }
);

startQuiz();

