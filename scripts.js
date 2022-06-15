const url = 'questions.json';
const question = document.getElementById("question_text");
const button_1 = document.getElementById("answer_1");
const button_2 = document.getElementById("answer_2");
const button_3 = document.getElementById("answer_3");
const button_4 = document.getElementById("answer_4");
const question_no = document.getElementById("question-count");
const home = document.getElementById("home");
const right_answers_text = document.getElementById("right-answers");
let right_answers = 0;

// warning box
const warning_box = document.getElementById("warning-box");
const button_abandon = document.getElementById("button-abandon");
const button_continue = document.getElementById("button-continue");

// start quiz
const button_start = document.getElementById("button_start");
const quiz_start_div = document.getElementById("quiz-start-box");
const quiz_start_message = document.getElementById("quiz-start-message");

// get start button to display quiz ----MODIFY
button_start.addEventListener("click", () => {
    quiz_start_div.classList.add("hide");
    button_next.innerText = "Next";
    htmlQuiz.classList.remove("hide");
    right_answers = 0;
    startQuiz();
})

// links from the bootstrap navbar which display: about section and quizes
const aboutLink = document.getElementById("navbar-about");
const aboutText = document.getElementById("about-text");
const htmlLink = document.getElementById("navbar-html");
const htmlQuiz = document.getElementById("html-quiz");

// display home and about text on click on navbar
aboutLink.addEventListener("click", () => {
    aboutText.classList.remove("hide");
    home.classList.remove("hide");
})

// quiz end screen
const quiz_end_box = document.getElementById("quiz-end-box");


// display html quiz on click of navbar link
htmlLink.addEventListener("click", () => {
    // check if a quiz is currently solved == the quiz div doesn't have the hide class
    // if (!htmlQuiz.classList.contains("hide")) {
    //     quiz_start_message.innerText = "Your quiz progress will be lost if you continue.";
    //     button_start.innerText = "Continue";
    //     quiz_start_div.classList.remove("hide");
    // } else {
    //     aboutText.classList.add("hide");
    //     home.classList.add("hide");
    //     htmlQuiz.classList.add("hide");
    //     quiz_start_message.innerText = "Ready to start your HTML quiz?";
    //     quiz_start_div.classList.remove("hide");
    // }

    // if the quiz started and the HTML--button/any other is pressed
    if (!htmlQuiz.classList.contains("hide")) {
        console.log("QUIZ ALREADY STARTED");
        // show --progress  will be lost--- window
        warning_box.classList.remove("hide");
        htmlQuiz.classList.add("hide");
        // if click continue, progress is erased

        // if click not continue --- this window dissapears and quiz is seen again
        button_abandon.addEventListener("click", () => {
            htmlQuiz.classList.remove("hide");
            warning_box.classList.add("hide");
        })

        // abandon and start the quiz again
        button_continue.addEventListener("click", () => {
            warning_box.classList.add("hide");
            clearScreen();
            quiz_end_box.classList.add("hide");
            quiz_start_message.innerText = "Ready to start your HTML quiz?";
            quiz_start_div.classList.remove("hide");
        })

    } else { // if the quiz hasn't started and the --progress will be lost is not visible--, go to start quiz box
        if (warning_box.classList.contains("hide")) {
            clearScreen();
            quiz_end_box.classList.add("hide");
            quiz_start_message.innerText = "Ready to start your HTML quiz?";
            quiz_start_div.classList.remove("hide");
        }

    }

    // aboutText.classList.add("hide");
    // home.classList.add("hide");
    // htmlQuiz.classList.add("hide");
    // quiz_end_box.classList.add("hide");
    // quiz_start_message.innerText = "Ready to start your HTML quiz?";
    // quiz_start_div.classList.remove("hide");
})

function clearScreen() {
    aboutText.classList.add("hide");
    home.classList.add("hide");
    htmlQuiz.classList.add("hide");
}


// change button color on selection (click)
button_1.addEventListener("click", changeColorOnSelection);
button_2.addEventListener("click", changeColorOnSelection);
button_3.addEventListener("click", changeColorOnSelection);
button_4.addEventListener("click", changeColorOnSelection);

const button_next = document.getElementById("button_next");
button_next.addEventListener("click", changeQuestion);

// the questions array of objects, the current index in the array
let questions;
let currentQuestionIndex = 0;

// start the quiz with the first question
copyHTMLJsonData();

function copyHTMLJsonData() {
    // copy data from JSON and populate with the first question
    fetch("questions.json") // fetch(url) ---- for json file on the same level
        .then(res => res.json())
        .then(data => {
            // copy data from JSON into local variable
            questions = JSON.parse(JSON.stringify(data));

            startQuiz();

            // question.innerText = questions[0].question;
            // button_1.innerText = questions[0].answers[0];
            // button_2.innerText = questions[0].answers[1];
            // button_3.innerText = questions[0].answers[2];
            // button_4.innerText = questions[0].answers[3];

            // // set question count
            // currentQuestionIndex = 0;
            // question_no.innerText = "Question:  " + (currentQuestionIndex + 1) + "/" + questions.length;
        })
        .catch((error) => {
            console.log(error);
        })
}

function copyCSSJsonData() {
    fetch("jsonData/cssQuestions.json") // fetch(url) ---- for json file on the same level
        .then(res => res.json())
        .then(data => {
            // copy data from JSON into local variable
            const qqq = JSON.parse(JSON.stringify(data));

            console.log("CSS JSON +++++++++++++ " + qqq[0].question);

        })
        .catch((error) => {
            console.log(error);
        })
}

copyCSSJsonData();

function startQuiz() {
    question.innerText = questions[0].question;
    button_1.innerText = questions[0].answers[0];
    button_2.innerText = questions[0].answers[1];
    button_3.innerText = questions[0].answers[2];
    button_4.innerText = questions[0].answers[3];

    // set question count
    currentQuestionIndex = 0;
    question_no.innerText = "Question:  " + (currentQuestionIndex + 1) + "/" + questions.length;
}



function changeColorOnSelection(event) {
    // change the bg of the selected button and make the rest unselected
    switch (event.target.id) {
        case "answer_1":
            button_1.classList.add("selected-answer");
            button_2.classList.remove("selected-answer");
            button_3.classList.remove("selected-answer");
            button_4.classList.remove("selected-answer");
            // button_1.style.backgroundColor = "#F5FEC0";
            // button_2.style.backgroundColor = "#FFEDED";
            // button_3.style.backgroundColor = "#FFEDED";
            // button_4.style.backgroundColor = "#FFEDED";
            break;
        case "answer_2":
            button_1.classList.remove("selected-answer");
            button_2.classList.add("selected-answer");
            button_3.classList.remove("selected-answer");
            button_4.classList.remove("selected-answer");
            // button_2.style.backgroundColor = "#F5FEC0";
            // button_1.style.backgroundColor = "#FFEDED";
            // button_3.style.backgroundColor = "#FFEDED";
            // button_4.style.backgroundColor = "#FFEDED";
            break;
        case "answer_3":
            button_1.classList.remove("selected-answer");
            button_2.classList.remove("selected-answer");
            button_3.classList.add("selected-answer");
            button_4.classList.remove("selected-answer");
            // button_3.style.backgroundColor = "#F5FEC0";
            // button_1.style.backgroundColor = "#FFEDED";
            // button_2.style.backgroundColor = "#FFEDED";
            // button_4.style.backgroundColor = "#FFEDED";
            break;
        case "answer_4":
            button_1.classList.remove("selected-answer");
            button_2.classList.remove("selected-answer");
            button_3.classList.remove("selected-answer");
            button_4.classList.add("selected-answer");
            // button_4.style.backgroundColor = "#F5FEC0";
            // button_1.style.backgroundColor = "#FFEDED";
            // button_2.style.backgroundColor = "#FFEDED";
            // button_3.style.backgroundColor = "#FFEDED";
            break;
    }
    // button_1.style.backgroundColor = "#F5FEC0";
    // use for finding if no of answer == with questions[currentQuestionIndex].correct_answer 
    console.log(event.target.id);
}

function deselectAllAnswers() {
    button_1.classList.remove("selected-answer");
    button_2.classList.remove("selected-answer");
    button_3.classList.remove("selected-answer");
    button_4.classList.remove("selected-answer");
}

function changeQuestion() {
    // console.log(questions.length);
    console.log("CORRECT  " + questions[currentQuestionIndex].correct_answer);

    //check if an answer is selected---if not, don.t change the question
    if (button_1.classList.contains("selected-answer") || button_2.classList.contains("selected-answer") ||
        button_3.classList.contains("selected-answer") || button_4.classList.contains("selected-answer")) {

        // DEBUG
        switch (true) {
            case button_1.classList.contains("selected-answer"):
                console.log("ANSWER GIVEN: " + button_1.id.substring(7));
                break;
            case button_2.classList.contains("selected-answer"):
                console.log("ANSWER GIVEN: " + button_2.id.substring(7));
                break;
            case button_3.classList.contains("selected-answer"):
                console.log("ANSWER GIVEN: " + button_3.id.substring(7));
                break;
            case button_4.classList.contains("selected-answer"):
                console.log("ANSWER GIVEN: " + button_4.id.substring(7));
                break;
        }
        // END DEBUG

        // verify if the correct answer is the one selected and count the right answers
        console.log("RIGHT ANSWER: " + questions[currentQuestionIndex].correct_answer.toString());
        // match correct answer with the button id number, and verify if it is selected by user
        switch (questions[currentQuestionIndex].correct_answer.toString()) {
            // the number of the answer is at the end of the id
            case button_1.id.substring(7):
                if (button_1.classList.contains("selected-answer")) {
                    // count answer as RIGHT 
                    right_answers++;
                    // console.log("ANSWER GIVEN: " + button_1.id.substring(7));
                }
                break;
            case button_2.id.substring(7):
                if (button_2.classList.contains("selected-answer")) {
                    // count answer as RIGHT
                    right_answers++;
                    // console.log("ANSWER GIVEN: " + button_2.id.substring(7));
                }
                break;
            case button_3.id.substring(7):
                if (button_3.classList.contains("selected-answer")) {
                    // count answer as RIGHT
                    right_answers++;
                    // console.log("ANSWER GIVEN: " + button_3.id.substring(7));
                }
                break;
            case button_4.id.substring(7):
                if (button_4.classList.contains("selected-answer")) {
                    // count answer as RIGHT
                    right_answers++;
                    // console.log("ANSWER GIVEN: " + button_4.id.substring(7));
                }
                break;
            default:
                console.log("No BUTTON SELECTED");
        }

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

            // if is the last question, change Next to Finish---button
            if (currentQuestionIndex == questions.length - 1) {
                button_next.innerText = "Finish";
            }

        } else {
            // end of quiz + hide quiz, display results, update current question
            // alert("enddddddddddddddd " + right_answers);
            right_answers_text.innerText = right_answers + "/" + questions.length;
            htmlQuiz.classList.add("hide");
            quiz_end_box.classList.remove("hide");
            currentQuestionIndex = 0;

            // deselect all answers for new quiz
            deselectAllAnswers();

        }

    }


}