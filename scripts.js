const url = 'questions.json';
// link the heading for the question to a constant
const question = document.getElementById("question_text");

// link the buttons for the answers to constants
const button_1 = document.getElementById("answer_1");
const button_2 = document.getElementById("answer_2");
const button_3 = document.getElementById("answer_3");
const button_4 = document.getElementById("answer_4");

// the heading which displays the question count
const question_no = document.getElementById("question-count");

const right_answers_text = document.getElementById("right-answers");
const right_answers_message = document.getElementById("end-quiz-message");
let right_answers = 0;
let user_answers = [];

// warning box at leaving quiz
const warning_box = document.getElementById("warning-box");

// the buttons from the warning box
const button_abandon = document.getElementById("button-abandon");
const button_continue = document.getElementById("button-continue");

// start quiz box and its button and message
const button_start = document.getElementById("button_start");
const quiz_start_div = document.getElementById("quiz-start-box");
const quiz_start_message = document.getElementById("quiz-start-message");


// links from the bootstrap navbar which display about section and quizes
const aboutLink = document.getElementById("navbar-about");
const htmlLink = document.getElementById("navbar-html");
const quizArea = document.getElementById("quiz-area");
const css_link = document.getElementById("navbar-css");
const javascriptlink = document.getElementById("navbar-js");

// home and about areas
// const home = document.getElementById("home");
const aboutText = document.getElementById("about-text");

// quiz end screen
const quiz_end_box = document.getElementById("quiz-end-box");

// Q&A box with answers
const questions_and_answers_box = document.getElementById("quiz-answers-box");

// the questions array of objects, the current index in the array
let questions;
let currentQuestionIndex = 0;

// the css and html arrays of question objects
let css_questions;
let html_questions;
let javascript_questions;
let current_quiz = 1; // 1=html, 2=css, 3=js
let current_quiz_name = "";

// copy all the json data in local arrays of objects
copyHTMLJsonData();
copyCSSJsonData();
copyJavascriptJSONData();

function copyHTMLJsonData() {
    // extract data from thr HTML JSON
    fetch("jsonData/HTMLquestions.json") // fetch(url) ---- for json file on the same level
        .then(res => res.json())
        .then(data => {
            // copy data from JSON into local variable
            html_questions = JSON.parse(JSON.stringify(data));
        })
        .catch((error) => {
            console.log(error);
        })
}

function copyCSSJsonData() {
    // extract data from the CSS JSON
    fetch("jsonData/cssQuestions.json") // fetch(url) ---- for json file on the same level
        .then(res => res.json())
        .then(data => {
            // copy data from JSON into local variable
            css_questions = JSON.parse(JSON.stringify(data));
        })
        .catch((error) => {
            console.log(error);
        })
}

function copyJavascriptJSONData() {
    // extract data from the Javascript JSON
    fetch("jsonData/javascriptQuestions.json") // fetch(url) ---- for json file on the same level
        .then(res => res.json())
        .then(data => {
            // copy data from JSON into local variable
            javascript_questions = JSON.parse(JSON.stringify(data));
        })
        .catch((error) => {
            console.log(error);
        })
}

// get start button to display quiz ----MODIFY
button_start.addEventListener("click", () => {
    quiz_start_div.classList.add("hide");
    aboutText.classList.add("hide");
    // home.classList.add("hide");
    button_next.innerText = "Next";
    quizArea.classList.remove("hide");
    right_answers = 0;
    startQuiz();
})

// display home and about text on click on navbar
aboutLink.addEventListener("click", () => {
    aboutText.classList.remove("hide");
    // home.classList.remove("hide");
})

// move to css quiz
css_link.addEventListener("click", () => {
    questions = css_questions;
    current_quiz = 2;
    current_quiz_name = "CSS";
    runQuiz();
})

// move to js quiz
javascriptlink.addEventListener("click", () => {
    questions = javascript_questions;
    current_quiz = 3;
    current_quiz_name = "JavaScript";
    runQuiz();
})

// run quiz accordingly to user will
function runQuiz() {
    // if the quiz started and user wants to start another quiz or the same one
    if (!quizArea.classList.contains("hide")) {
        // show --progress will be lost-- window
        warning_box.classList.remove("hide");
        quizArea.classList.add("hide");

        // do not continue and resume from cureent quiz
        button_abandon.addEventListener("click", () => {
            quizArea.classList.remove("hide");
            warning_box.classList.add("hide");
        })

        // abandon and start the quiz again, progress is lost
        button_continue.addEventListener("click", () => {
            warning_box.classList.add("hide");
            clearScreen();
            quiz_end_box.classList.add("hide");
            personalizeStartQuizMessage();
            quiz_start_div.classList.remove("hide");
        })

    } else {
        // if none of the quizes started, proceed with the selected one and go to start quiz box
        if (warning_box.classList.contains("hide")) {
            clearScreen();
            quiz_end_box.classList.add("hide");
            personalizeStartQuizMessage();
            quiz_start_div.classList.remove("hide");
        }
    }
}

/**
 * Personalize the start message accordingly to the current quiz.
 */
function personalizeStartQuizMessage() {
    // 1 = html, 2 = css, 3 = js
    switch (current_quiz) {
        case 1:
            quiz_start_message.innerText = "Ready to start your HTML quiz?";
            break;
        case 2:
            quiz_start_message.innerText = "Ready to start your CSS quiz?";
            break;
        case 3:
            quiz_start_message.innerText = "Ready to start your Javascript quiz?";
            break;
        default:
            quiz_start_message.innerText = "Ready to start your quiz?";
    }
}

// display html quiz on click of navbar link
htmlLink.addEventListener("click", () => {
    questions = html_questions;
    current_quiz = 1;
    current_quiz_name = "HTML";
    runQuiz();
})

function clearScreen() {
    aboutText.classList.add("hide");
    // home.classList.add("hide");
    quizArea.classList.add("hide");
    questions_and_answers_box.classList.add("hide");
}

// change answer buttons color on click
button_1.addEventListener("click", changeColorOnSelection);
button_2.addEventListener("click", changeColorOnSelection);
button_3.addEventListener("click", changeColorOnSelection);
button_4.addEventListener("click", changeColorOnSelection);

const button_next = document.getElementById("button_next");
button_next.addEventListener("click", changeQuestion);

/**
 * Populate the quiz box with the first question from the current quiz.
 */
function startQuiz() {
    // clearInterval(intervalID);
    question.innerText = questions[0].question;
    button_1.innerText = questions[0].answers[0];
    button_2.innerText = questions[0].answers[1];
    button_3.innerText = questions[0].answers[2];
    button_4.innerText = questions[0].answers[3];

    // set the index of the current question, and display it
    currentQuestionIndex = 0;
    question_no.innerText = "Question:  " + (currentQuestionIndex + 1) + "/" + questions.length;

    // set the name of the quiz
    $("#quiz-name").text("The " + current_quiz_name + " quiz");
}

// 
/**
 * Change the background of the selected answer(button) and make the other answers unselected.
 * @param {*} event the event that triggered/called this function (an button which contains an answer)
 */
function changeColorOnSelection(event) {
    // select (change color) only the button from which the event was triggered and deselects the rest
    switch (event.target.id) {
        case "answer_1":
            button_1.classList.add("selected-answer");
            button_2.classList.remove("selected-answer");
            button_3.classList.remove("selected-answer");
            button_4.classList.remove("selected-answer");
            break;
        case "answer_2":
            button_1.classList.remove("selected-answer");
            button_2.classList.add("selected-answer");
            button_3.classList.remove("selected-answer");
            button_4.classList.remove("selected-answer");
            break;
        case "answer_3":
            button_1.classList.remove("selected-answer");
            button_2.classList.remove("selected-answer");
            button_3.classList.add("selected-answer");
            button_4.classList.remove("selected-answer");
            break;
        case "answer_4":
            button_1.classList.remove("selected-answer");
            button_2.classList.remove("selected-answer");
            button_3.classList.remove("selected-answer");
            button_4.classList.add("selected-answer");
            break;
    }
    // console.log(event.target.id);
}

/**
 * Make all the buttons with question answers unselected by removing the selection class.
 */
function deselectAllAnswers() {
    button_1.classList.remove("selected-answer");
    button_2.classList.remove("selected-answer");
    button_3.classList.remove("selected-answer");
    button_4.classList.remove("selected-answer");
}

/**
 * Move to the next question in the current quiz and save the user progress.
 * 
 * Save the user answer and the correct answer for current question .
 * Update the quiz area with the correct text.
 * Display quiz end box if there are no questions left.
 */
function changeQuestion() {
    //check if an answer is selected, if not, do not change the question
    if (button_1.classList.contains("selected-answer") || button_2.classList.contains("selected-answer") ||
        button_3.classList.contains("selected-answer") || button_4.classList.contains("selected-answer")) {

        // record the user current answer in an array for the quiz report
        recordUserAnswer();

        // for the current question verify if the correct answer is the one selected and count it as right using a variable
        recordCorrectAnswer();

        // if there are any questions left, populate quiz with the next question
        if (currentQuestionIndex + 1 < questions.length) {
            currentQuestionIndex++;
            question.innerText = questions[currentQuestionIndex].question;
            button_1.innerText = questions[currentQuestionIndex].answers[0];
            button_2.innerText = questions[currentQuestionIndex].answers[1];
            button_3.innerText = questions[currentQuestionIndex].answers[2];
            button_4.innerText = questions[currentQuestionIndex].answers[3];

            // make all buttons unselected by removing selection class
            deselectAllAnswers();

            // change question count
            question_no.innerText = "Question:  " + (currentQuestionIndex + 1) + "/" + questions.length;

            // if is the last question, change the text of the --Next-- button to --Finish--
            if (currentQuestionIndex == questions.length - 1) {
                button_next.innerText = "Finish";
            }

        } else {
            // if there are no questions left
            right_answers_text.innerText = right_answers + "/" + questions.length;
            // display a personalized message for different levels of solving
            if (right_answers < questions.length / 2) {
                right_answers_message.innerText = "You completed the quiz! Looks like you had some difficulties with it. Maybe try again.";
            } else if (right_answers >= questions.length / 2 && right_answers < questions.length) {
                right_answers_message.innerText = "You completed the quiz! You did a great job!"
            } else if (right_answers === questions.length) {
                right_answers_message.innerText = "You completed the quiz! You did an awesome job!"
            }

            // hide quiz, display end-quiz window with correct no of answers, update current question
            quizArea.classList.add("hide");
            quiz_end_box.classList.remove("hide");
            currentQuestionIndex = 0;

            // deselect all answers for a new quiz
            deselectAllAnswers();
        }

    }
}

/**
 * Save the user answer to the current question in an array.
 */
function recordUserAnswer() {
    switch (true) {
        // verify which answer is selected (1, 2, 3 or 4)
        case button_1.classList.contains("selected-answer"):
            // record user answer index
            user_answers.push(1);
            break;
        case button_2.classList.contains("selected-answer"):
            // record user answer index
            user_answers.push(2);
            break;
        case button_3.classList.contains("selected-answer"):
            // record user answer index
            user_answers.push(3);
            break;
        case button_4.classList.contains("selected-answer"):
            // record user answer index
            user_answers.push(4);
            break;
    }
}

/**
 * Check if the user answer to the current question is correct and count it as right.
 */
function recordCorrectAnswer() {
    // match correct answer number with one of the button id numbers, and verify if the button is selected by user
    switch (questions[currentQuestionIndex].correct_answer.toString()) {
        // the number of the answer is at the end of the buttons id
        case button_1.id.substring(7):
            if (button_1.classList.contains("selected-answer")) {
                // count answer as RIGHT 
                right_answers++;
            }
            break;
        case button_2.id.substring(7):
            if (button_2.classList.contains("selected-answer")) {
                // count answer as RIGHT
                right_answers++;
            }
            break;
        case button_3.id.substring(7):
            if (button_3.classList.contains("selected-answer")) {
                // count answer as RIGHT
                right_answers++;
            }
            break;
        case button_4.id.substring(7):
            if (button_4.classList.contains("selected-answer")) {
                // count answer as RIGHT
                right_answers++;
            }
            break;
        default:
            console.log("NO BUTTON SELECTED");
    }
}

// restart button for quiz end box 
const restart_button = document.getElementById("button_restart");
restart_button.addEventListener("click", restartQuiz);

// hides quiz end box and displays the begin quiz box
// restarts form end quiz and report boxes
function restartQuiz() {
    quiz_end_box.classList.add("hide");
    quiz_start_div.classList.remove("hide");
    questions_and_answers_box.classList.add("hide");
    aboutText.classList.add("hide");
    // home.classList.add("hide");

    // empty user answers array
    while (user_answers.length >= 1) {
        user_answers.pop();
    }
    // console.log(user_answers);
}

// button for displaying q&a
const display_answers = document.getElementById("button_answers");
display_answers.addEventListener("click", displayAnswers);

//button for restarting quiz from report box
const restart_from_report_button = document.getElementById("button-restart-from-report");
restart_from_report_button.addEventListener("click", restartQuiz);


/**
 * Display questions and answers for current quiz
 */
function displayAnswers() {
    // hide end quiz box and display Q&A results box
    quiz_end_box.classList.add("hide");
    questions_and_answers_box.classList.remove("hide");

    // empty the report div for a future quiz report
    $("#qa").empty();

    // using jQuery, move through all the quiz questions and append them to the report as headings and paragraphs
    for (let i = 0; i < questions.length; i++) {
        // append the question withe its number
        $(".questions-answers").append("<h3 class=\"report-question\">" + (i + 1) + ". " + escapeSpecialCharacters(questions[i].question) + "</h3>");

        // go through the 4 answers of the question and append them in order and with the right color color
        // red - answer is selected and wrong
        // green - answer selected and right
        // pink - answer was not selected
        for (let j = 1; j < 5; j++) {
            // check if the current answer is the right one - display it green
            // it and may or may not be selected by the user
            if (j === questions[i].correct_answer) {
                $(".questions-answers").append(
                    "<p class=\"report green\">" + escapeSpecialCharacters(questions[i].answers[j - 1]) + " </p> ");
            }
            // check if the current quiestion's correct answer is not the user answer 
            if (questions[i].correct_answer != user_answers[i]) {
                // for the current question the current answer is selected by the user - display it red
                if (j === user_answers[i]) {
                    $(".questions-answers").append(
                        "<p class=\"report red\">" + escapeSpecialCharacters(questions[i].answers[j - 1]) + " </p> ");
                }
            }
            // check if the current answer is not the user's choice, nor the right one - display it pink
            if (j != user_answers[i] && j != questions[i].correct_answer) {
                $(".questions-answers").append(
                    "<p class=\"report\">" + escapeSpecialCharacters(questions[i].answers[j - 1]) + " </p> ");
            }
        }
        // after each question which is not the last one, display a separation line
        if (i < questions.length - 1) {
            $(".questions-answers").append("<hr>");
        }
    }
}

/**
 * Transform a string by escaping some of the special characters in it.
 * @param {String} text the string which may contain some special characters which need to be displayed 
 * @returns a String with special characterd escaped
 */
function escapeSpecialCharacters(text = "") {
    let transformedText = "";
    for (let letterPosition = 0; letterPosition < text.length; letterPosition++) {
        if (text[letterPosition] === "<") {
            transformedText = transformedText + "&lt;";
        } else if (text[letterPosition] === ">") {
            transformedText = transformedText + "&gt;";
        } else {
            transformedText = transformedText + text[letterPosition];
        }
    }
    return transformedText;
}

const welcome_text = document.getElementById("welcome-area-txt");

// text to be animated in the welcome area
let finalMessage = "Take a quiz now!";
let message = "";
let currentMessageIndex = 0;
// addLetter();

// const intervalID = setInterval(addLetter, 300);

/**
 * Make animation for welcome area text by displaying it letter by letter.
 */
function addLetter() {
    if (message.length === finalMessage.length) {
        message = "T";
        currentMessageIndex = 1;
        // console.log(message);
        welcome_text.innerText = message + "_";
    } else if (message.length < finalMessage.length) {
        message = message + finalMessage[currentMessageIndex];
        currentMessageIndex++;
        // console.log(message);
        if (message.length === finalMessage.length) {
            welcome_text.innerText = message;
        } else {
            welcome_text.innerText = message + "_";
        }
    }
}

// comment for ssh on github