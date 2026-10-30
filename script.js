// JAVA ARRAYS - INTERACTIVE PLAYGROUND

let currentArray = [10, 20, 30, 40, 50];

function createArray() {
  let input = document.getElementById("arrayInput").value;
  let output = document.getElementById("arrayOutput");
  let result = document.getElementById("result");

  let values = input.split(",").map((value) => value.trim());

  if (
    input.trim() === "" ||
    values.some((value) => value === "" || !Number.isFinite(Number(value)))
  ) {
    result.textContent = "Please enter valid numbers separated by commas.";
    output.innerHTML = "";
    currentArray = [];
    return;
  }

  currentArray = values.map(Number);

  output.innerHTML = "";

  currentArray.forEach((value, index) => {
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.innerHTML = `<span>Index ${index}</span><strong>${value}</strong>`;
    output.appendChild(cell);
  });

  result.textContent =
    "Array created successfully! Total elements: " + currentArray.length;
}

function accessElement() {
  let index = Number(document.getElementById("indexInput").value);
  let result = document.getElementById("result");

  if (document.getElementById("indexInput").value === "") {
    result.textContent = "Please enter an index.";
    return;
  }

  if (!Number.isInteger(index) || index < 0 || index >= currentArray.length) {
    result.textContent =
      "Invalid index! Valid indexes are 0 to " + (currentArray.length - 1);
    return;
  }

  result.textContent =
    "Element at index " + index + " = " + currentArray[index];
}

createArray();

// JAVA ARRAYS QUIZ

const questions = [
  {
    question: "1. What is the starting index of an array in Java?",
    options: ["1", "0", "-1", "2"],
    answer: 1,
  },
  {
    question: "2. Which keyword is used to create an array in Java?",
    options: ["class", "static", "new", "void"],
    answer: 2,
  },
  {
    question: "3. Which property is used to find array size?",
    options: ["size()", "length", "count()", "index"],
    answer: 1,
  },
  {
    question: "4. Which data structure stores elements in rows and columns?",
    options: ["1D Array", "2D Array", "String", "Variable"],
    answer: 1,
  },
  {
    question: "5. What happens when an invalid array index is accessed?",
    options: [
      "NullPointerException",
      "Compile Error",
      "ArrayIndexOutOfBoundsException",
      "No Error",
    ],
    answer: 2,
  },
  {
    question: "6. Can we change the length of an existing Java array?",
    options: ["Yes", "No", "Only using loops", "Only for integers"],
    answer: 1,
  },
  {
    question: "7. Which loop is commonly used to traverse an array?",
    options: ["for loop", "if statement", "switch", "break"],
    answer: 0,
  },
];

let questionIndex = 0;
let totalScore = 0;
let answered = false;

function loadQuestion() {
  let questionElement = document.getElementById("question");
  let optionsElement = document.getElementById("options");
  let resultElement = document.getElementById("quizResult");
  let nextButton = document.getElementById("nextButton");

  let q = questions[questionIndex];

  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";
  resultElement.textContent = "";
  nextButton.textContent = "Next Question";
  nextButton.style.display = "inline-block";
  answered = false;

  q.options.forEach((option, index) => {
    let button = document.createElement("button");
    button.className = "option";
    button.textContent = option;

    button.addEventListener("click", function () {
      checkAnswer(index);
    });

    optionsElement.appendChild(button);
  });

  document.getElementById("score").textContent =
    "Question " + (questionIndex + 1) + " of " + questions.length;
}

function checkAnswer(selected) {
  if (answered) return;

  answered = true;

  let q = questions[questionIndex];
  let buttons = document.querySelectorAll(".option");
  let resultElement = document.getElementById("quizResult");

  if (selected === q.answer) {
    totalScore++;
    resultElement.textContent = "Correct answer! Well done.";
  } else {
    resultElement.textContent =
      "Incorrect! Correct answer: " + q.options[q.answer];
  }

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === q.answer) {
      button.classList.add("correct");
    } else if (index === selected) {
      button.classList.add("wrong");
    }
  });
}

function nextQuestion() {
  if (!answered) {
    document.getElementById("quizResult").textContent =
      "Please select an answer first.";
    return;
  }

  questionIndex++;

  if (questionIndex < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("question").textContent = "Quiz Completed!";

    document.getElementById("options").innerHTML = "";

    document.getElementById("quizResult").textContent =
      "Your final score: " + totalScore + " / " + questions.length;

    document.getElementById("nextButton").textContent = "Restart Quiz";

    document.getElementById("nextButton").onclick = function () {
      questionIndex = 0;
      totalScore = 0;
      loadQuestion();
    };

    document.getElementById("score").textContent =
      "Keep practicing Java Arrays!";
  }
}

loadQuestion();
