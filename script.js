const questions = [
  {
    question: "why is it so big?",
    answers: [
      { text: "because..", correct: false },
      { text: "is it a problem?", correct: false },
      { text: "peeks also have great depths", correct: false },
      { text: "it is what it is", correct: true },
    ],
  },
  {
    question:
      "In a song lyrics tere chote chote.. what is song writer refering to?",
    answers: [
      { text: "balls", correct: false },
      { text: "eyes", correct: true },
      { text: "lemons", correct: false },
      { text: "melons", correct: false },
    ],
  },
  {
    question: "how deep is too deep?",
    answers: [
      { text: "Friedrich Nietzsche", correct: false },
      { text: "depth comes when surface is destroyed", correct: true },
      { text: "there is no limit", correct: false },
      { text: "1 inch", correct: false },
    ],
  },
  {
    question: "smallest thing on planet earth?",
    answers: [
      {
        text: "bacteria",
        correct: false,
      },
      { text: "my bf's di*k", correct: false },
      { text: "the quark", correct: false },
      { text: "Darshi", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("ans-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  let currentQuestionIndex = 0;
  let score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerHTML = answers.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  currentQuestionIndex = -1;
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex === -1) {
    startQuiz();
  } else if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
