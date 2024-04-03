
const questions = [
    {
        question: "Other than Haaland, which City player scored a hat-trick this season?",
        answers: [
            {text: "Phil Foden",correct: true},
            {text: "Julian Alvarez",correct: false},
            {text: "Kevin De Bruyne",correct: false},
            {text: "Jeremy Doku",correct: false },
        ]
    },
    {
        question: "Which team had six players sent off this season?",
        answers: [
            {text: "Chelsea",correct: false},
            {text: "Leeds",correct: false},
            {text: "Spurs",correct: false},
            {text: "Wolves",correct: true},
        ]
    },
    {
        question: "Which of these teams scored the same number of goals this season?",
        answers: [
            {text: "Man City and Liverpool",correct: false},
            {text: "Aston Villa and Leicester",correct: true},
            {text: "Newcastle and Leeds",correct: false},
            {text: "Arsenal and Tottenham",correct: false},
        ]
    },
    {
        question: "For how many days were Arsenal top of the league?",
        answers: [
            {text: "162",correct: false},
            {text: "204",correct: false},
            {text: "248",correct: true},
            {text: "282",correct: false},
        ]
    },
    {
        question: "Which club scored the fewest goals in the division but still stayed up?",
        answers: [
            {text: "Wolves",correct: true},
            {text: "Everton",correct: false},
            {text: "Bournemouth",correct: false},
            {text: "Chelsea",correct: false},
        ]
    },
    {
        question: "What was the average attendance at Premier League games this season?",
        answers: [
            {text: "35,888",correct: false},
            {text: "40,232",correct: true},
            {text: "45,624",correct: false},
            {text: "50,910",correct: false},
        ]
    },
    {
        question: "Which team put out a starting XI made up entirely of British players?",
        answers: [
            {text: "Bournemouth",correct: false},
            {text: "Newcastle",correct: false},
            {text: "Crystal Palace",correct: false},
            {text: "Nottingham Forest",correct: true},
        ]
    },
    {
        question: "Who missed four penalties – the most ever missed in a single Premier League season?",
        answers: [
            {text: "Wilfried Zaha",correct: false},
            {text: "Aleksander Mitrovic",correct: true},
            {text: "Riyad Mahrez",correct: false},
            {text: "Mac Allister",correct: false},
        ]
    },
    {
        question: "Who was the only player to be sent off twice in the league this season?",
        answers: [
            {text: "Koulibaly",correct: false},
            {text: "Casemiro",correct: true},
            {text: "Rodri",correct: false},
            {text: "Rice",correct: false},
        ]
    },
    {
        question: "Which team won a game while having just 18% of possession?",
        answers: [
            {text: "West Hem",correct: false},
            {text: "Everton",correct: false},
            {text: "Brentford",correct: false},
            {text: "Nottingham Forest",correct: true},
        ]
    }
];

const questionElement = document.getElementById("question"); 
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById('next-btn');
const clearButton = document.getElementById('clear-res-btn');

let currentQuestionIndex = 0;
let score = 0;

//first screen dikhane wala code/ quiz start hone wala code
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    reset();
    clearButton.style.cursor = "no-drop";
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

// new ques k liye previous screen clear karne ka function 
function reset(){
    clearButton.style.display = "inline-block";
    nextButton.style.display = "inline-block";
    // nextButton.disabled = true;
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//answer select karne par execute hone wala code
function selectAnswer(e){
    clearButton.style.cursor = "pointer";
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        //disable karne se user multiple times option select nhi kar sakta
        button.disabled = true;
    });
    nextButton.style.display = "inline-block";
    clearButton.style.display  = "inline-block";
}


//clear response button ki functionality
function clearAnswer(){
    clearButton.style.cursor = "no-drop";
    let foundCorrect = false;
    Array.from(answerButtons.children).forEach(button => {
        if(button.classList.contains("correct")){
            foundCorrect = true;
        }
        button.classList.remove("correct", "incorrect");
        button.disabled = false;
    });
        if(foundCorrect){
            score = score - 1;
            if(score < 0){
                score = 0; // to avoid -ve score
            }
        }
    }
            
clearButton.addEventListener('click', clearAnswer);



// score dikhane ka code
function showScore(){
    reset();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}.`;
    // nextButton.style.display = "block";
    clearButton.style.display = 'none';
    nextButton.style.width = "100%";
    nextButton.style.marginLeft = "0px";
    // clearButton.style.cursor = "no-drop";
    nextButton.innerHTML = 'Play Again!';

}

//next button ki functionality
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        nextButton.style.width = "39%";
        nextButton.style.marginLeft = "45px";
        startQuiz();
    }
})


startQuiz()

