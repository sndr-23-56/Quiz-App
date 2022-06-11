const url = 'questions.json';
const question = document.getElementById("question_text");
const button_1 = document.getElementById("answer_1");
const button_2 = document.getElementById("answer_2");
const button_3 = document.getElementById("answer_3");
const button_4 = document.getElementById("answer_4");
const question_no = document.getElementById("question-count");
const home = document.getElementById("home");

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

// display html quiz on click of navbar link
htmlLink.addEventListener("click", () => {
    htmlQuiz.classList.remove("hide");
    aboutText.classList.add("hide");
    home.classList.add("hide");
})

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
copyJsonData();

function copyJsonData() {
    // copy data from JSON and populate with the first question
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // copy data from JSON into local variable
            questions = JSON.parse(JSON.stringify(data));

            question.innerText = questions[0].question;
            button_1.innerText = questions[0].answers[0];
            button_2.innerText = questions[0].answers[1];
            button_3.innerText = questions[0].answers[2];
            button_4.innerText = questions[0].answers[3];

            // set question count
            question_no.innerText = "Question:  " + (currentQuestionIndex + 1) + "/" + questions.length;
        })
        .catch((error) => {
            console.log(error);
        })
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
        switch (questions[currentQuestionIndex].correct_answer.toString()) {
            // the number of the answer is at the end of the id
            case button_1.id.substring(7):
                if (button_1.classList.contains("selected-answer")) {
                    // count answer as RIGHT
                    // console.log("ANSWER GIVEN: " + button_1.id.substring(7));
                }
                break;
            case button_2.id.substring(7):
                if (button_2.classList.contains("selected-answer")) {
                    // count answer as RIGHT
                    // console.log("ANSWER GIVEN: " + button_2.id.substring(7));
                }
                break;
            case button_3.id.substring(7):
                if (button_3.classList.contains("selected-answer")) {
                    // count answer as RIGHT
                    // console.log("ANSWER GIVEN: " + button_3.id.substring(7));
                }
                break;
            case button_4.id.substring(7):
                if (button_4.classList.contains("selected-answer")) {
                    // count answer as RIGHT
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
            button_1.classList.remove("selected-answer");
            button_2.classList.remove("selected-answer");
            button_3.classList.remove("selected-answer");
            button_4.classList.remove("selected-answer");

            // change question count
            question_no.innerText = "Question:  " + (currentQuestionIndex + 1) + "/" + questions.length;

            // if is the last question, change Next to Finish---button
            if (currentQuestionIndex == questions.length - 1) {
                button_next.innerText = "Finish";
            }

        } else {
            // end of quiz + hide quiz, display results
            alert("enddddddddddddddd");
        }



    }
}