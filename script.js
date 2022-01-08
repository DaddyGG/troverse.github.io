class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}
let questions = [
    new Question("How many planets are there in the TROVERSE universe ?", ["8888", "10000", "7777", "11111"], "10000"),
    new Question("In which category can we place the TROVERSE's NFTs ?", ["P2E Game", "Art", "Collectibles", "Metaverse"], "P2E Game"),
    new Question("On which blockchain will we be able to mint the TROVERSE's NFTs ?", ["Solana", "BSC", "ETH", "AVAX"], "ETH"),
    new Question("What is the planned release date ?", ["Early Febuary", "Early March", "Late January", "Late Febuary"], "Early Febuary"),
    new Question("Guess who is not in the team ?", ["Nima", "Farzam", "Ash", "Paul"], "Paul"),
    new Question("What is the required level on the TROVERSE's Discord to obtain the Colonist role ?", ["10", "4", "15", "6"], "6"),
    new Question("What is the date of the first Twitter post ?", ["Sep 14, 2021", "Oct 14, 2021", "Dec 14, 2021", "Nov 14, 2021"], "Sep 14, 2021"),
    new Question("According to the roadmap, when is planned the 'Birth of life' ?", ["Q4 2023", "Q4 2022", "Q3 2022", "Q1 2023"], "Q4 2022"),
    new Question("According to the last annoucement, how many WL per day are given through the Discord ?", ["1", "50", "100", "0"], "1"),
    new Question("How much will cost 1 TROVERSE NFT ?", ["0.5 ETH", "0.1 ETH", "0.08 ETH", "TBA"], "TBA")
];

class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

const display = {
    elementShown: function (id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function () {
        endQuizHTML = `
      <h1>Congratulation !</h1>
        
        <h1>Mission accomplished</h1>
      <h3> Your score is : ${quiz.score} / ${quiz.questions.length}</h3>

        <div class="choices">
            <button onclick="location.href = 'https://www.troverse.io/';" style="font-size:150%" id="continueMission" class="btn">
                Continue your missions !
            </button>
        </div>

`;
        this.elementShown("quiz", endQuizHTML);
    },
    question: function () {
        this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function () {
        let choices = quiz.getCurrentQuestion().choices;

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function () {
                quiz.guess(guess);
                quizApp();
            }
        }
        // affichage choix + prise en compte du choix
        for (let i = 0; i < choices.length; i++) {
            this.elementShown("choice" + i, choices[i]);
            guessHandler("guess" + i, choices[i]);
        }
    },
    progress: function () {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown("progress", "Question " + currentQuestionNumber + " / " + quiz.questions.length);
    },



};

// Game logic
quizApp = () => {
    if (quiz.hasEnded()) {
        display.endQuiz();
    } else {
        display.question();
        display.choices();
        display.progress();
    }
}
// Create Quiz
let quiz = new Quiz(questions);
quizApp();
