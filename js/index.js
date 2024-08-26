const questions = [
    {
        question: 'Which language runs in a web browser?',
        answers: [
            {text : 'php' , correct: false},
            {text : 'javascript' , correct: true},
            {text : 'java' , correct: false},
            {text : 'c++' , correct: false}
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            {text : 'Central Style Sheets' , correct: false},
            {text : 'Cascading Style Sheets' , correct: true},
            {text : 'Cascading Simple Styles' , correct: false},
            {text : 'Cars SUV Styles' , correct: false}
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            {text : 'Hypertext Markup Language' , correct: true},
            {text : 'Hypertext Markdown Language' , correct: false},
            {text : 'Hypertext Markdown Language' , correct: false},
            {text : 'Hypertext Markdown Language' , correct: false}
        ]
    },
    {
        question: 'What year was JavaScript launched?',
        answers: [
            {text : '1996' , correct: false},
            {text : '1995' , correct: false},
            {text : '1994' , correct: true},
            {text : '1993' , correct: false}
        ]
            
    }
];

const questionElement = document.getElementById('question');
const anwserButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        anwserButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct; // set the data-correct attribute html dataset attribute
        }
        button.addEventListener('click', selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = 'none';
    while(anwserButtons.firstChild){
        anwserButtons.removeChild(anwserButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(anwserButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
            
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
    
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Restart';
    nextButton.style.display = 'block';
}

function handleNextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextQuestion();
    }else{

        startQuiz();
    }
});

startQuiz();

