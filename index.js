"use strict";
// ------------------------------------------VERSION 1.0 [Wireframe]---------------------------------------
let questionNum = 1;
let correctAnswers = 0;

const createQuestionSet = [
  {
    number: 1,
    text: `What is Nike's trademark logo called?`,
    ans1: `(a) Check`,
    ans2: `(b) Swoosh`,
    ans3: `(c) Zip Curve`
  },

  {
    number: 2,
    text: `Who founded Adidas`,
    ans1: `(a) Phil Knight`,
    ans2: `(b) Adolf Dassler`,
    ans3: `(c) Tinker Hatfield`
  },

  {
    number: 3,
    text: `Which one of these shoes has NOT been showcased in a movie?`,
    ans1: `(a) Air Jordan 11 "Space Jam"`,
    ans2: `(b) Yeezy 350 Boost "Beluga"`,
    ans3: `(c) Nike "Air Mag"`
  },
  {
    number: 4,
    text: ` Where is Nike HQ lcoated?`,
    ans1: `(a) Los Angeles, California`,
    ans2: `(b) Beaverton, Oregon`,
    ans3: `(c) Seattle, Washington`
  },
  {
    number: 5,
    text: `Which one of these designers has not designed a shoe for Nike?`,
    ans1: `(a) Virgil Abloh`,
    ans2: `(b) Phil Knight`,
    ans3: `(c) Christian Tresser`
  }
];

//All Answers Object
const ANSWERS = [
  `(b) Swoosh`,
  `(b) Adolf Dassler`,
  `(b) Yeezy 350 Boost "Beluga"`,
  `(b) Beaverton, Oregon`,
  `(b) Phil Knight`
];

/* Create arrays of questions and answers */

/* Render the first question set*/

//Start Button function
function startButton() {
  $("#js-start-button").click(function(event) {
    nextQuestion();
  });
}

//Next Question Render Function
function nextQuestion() {
  const question = createQuestionSet[questionNum - 1];
  const questionsAnswered = questionNum - 1;
  $("#start-page").html(
    questionTemplate(correctAnswers, question, questionsAnswered)
  );
}

//Question Templates
function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
      <section id="quiz-app" role="main">
    <div id ="question-title">
      <h2 id="question">${question.text}</h2>
     </div> 
      <form id= "js-form">
        <fieldset>
        <br>
          <label>
            <input class="answer" type="radio" name="option" checked></input>
            <span>${question.ans1}</span>
          </label>
          <br>
          <label>
            <input class="answer" type="radio" name="option"></input>
            <span>${question.ans2}</span>
          </label>
          <br>
          <label>
            <input class="answer" type="radio" name="option"></input>
            <span>${question.ans3}</span>
          </label>
          <br>
        </fieldset>  
      </form>
      <button id="js-submit-button">Submit</button>
      <div id="status-bar">
      <span id="question-count">Question: ${question.number}/5</span> <br>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
      </div> 
    </section>
    `;
}

//Submit Button function
function submitButton() {
  $("#start-page").on("click", "#js-submit-button", function(event) {
    event.preventDefault();
    const answer = $("input:checked").siblings("span");
    const userIsCorrect = userAnswer(answer);
    if (userIsCorrect) {
      rightFeedback();
    } else {
      wrongFeedback();
    }
  });
}

//Next Question button function
function nextButton() {
  $("#start-page").on("click", "#js-next-button", function(event) {
    if (questionNum === 5) {
      resultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
    }
  });
}
/* Render the first question set*/

/* Question Logics & Rendering */

//Check if its the right answer
function userAnswer(answer) {
  if (answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

//Generate correct answer feedback
function rightFeedback() {
  $("#start-page").html(correctFeedback(questionNum));
  iterateCorrectAnswers();
}

//Correct answer 
// const correctFeedback = `
//     <section id="feedback-page" role="main">
//       <h2 >Correct! The right answer is: ${ANSWERS[questionNum - 1]}</h2>
//     </section>
//     <button id="js-next-button">Next</button>
//   `;

function correctFeedback(questionNum) {
  return `
      <section id="feedback-page" role="main">
        <h2>Correct! The right answer is: ${ANSWERS[questionNum - 1]
        }!</h2>
      </section>
      <button id="js-next-button">Next</button>
  `;
}

//Wrong answer 
function wrongFeedback() {
  $("#start-page").html(wrongTemplate(questionNum));
}

//Wrong answer feedback UI template
function wrongTemplate(questionNum) {
  return `
      <section id="feedback-page" role="main">
        <h2>Sorry, wrong answer! The right answer was ${
          ANSWERS[questionNum - 1]
        }!</h2>
      </section>
      <button id="js-next-button">Next</button>
  `;
}

//Iterate through questions function
function iterateQuestion() {
  questionNum++;
}

//Iterate through correct answers
function iterateCorrectAnswers() {
  correctAnswers++;
}

/* Question Logics & Rendering */

//Results page UI template
function resultsPage(correctAnswers) {
  $("#start-page").html(`
      <section id="final-page">
        <h2>Final Score: ${correctAnswers} out of 5</h2>
      </section>
      <button id="js-restart-button">Try Again?</button>
    `);
}

//Restart Button Function
function restartButton() {
  $("#start-page").on("click", "#js-restart-button", function(event) {
    questionNum = 1;
    correctAnswers = 0;
    //Recursion to call nextQuestion method
    nextQuestion();
  });
}

//Function to handle button clicks (Recursion)
function handleButtons() {
  startButton();
  submitButton();
  nextButton();
  restartButton();
}

//Call action button that sets all the other functions
handleButtons();
