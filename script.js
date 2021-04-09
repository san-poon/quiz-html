const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElem = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let currentQuestionIndex, correctAnswer;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})


// User click 'Start' button
function startGame() {
    console.log(`Game is started!`);
    
    //hide the 'Start' button
    startButton.classList.add('hide');
    
    shuffle(questions);
    currentQuestionIndex = 0;

    // show 'question-container' class
    questionContainerElem.classList.remove('hide');

    setNextQuestion();
}

// Set question to show
function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function resetState() {
    nextButton.classList.add('hide');

    // hide all template answers 
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }

}

function showQuestion(aQuestion) {
    questionElement.innerText = aQuestion.question;

    // Choose the correct answer and shuffle the answers
    allAnswers = aQuestion.answers;
    correctAnswer = allAnswers[0].text; // first element is the correct one
    shuffle(allAnswers);

    // Show answers text
    for(let answer of allAnswers) {
        // Create and set button text
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');

        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    }

    // Show 'Next' or 'Restart' button
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }

}


function selectAnswer(e) {
    const selectedButton = e.target; // e.target represents the clicked element
    if (selectedButton.innerText == correctAnswer) {
        selectedButton.classList.add('correct');
    } else selectedButton.classList.add('wrong');
}


// -------------- Quiz questions collection ----------
// Make sure first element in answer is the correct one.
const questions = [
    {
        question: 'HTML stands for?',
        answers: [
            {text: 'Hypertext Markup Language'},
            {text: 'HyperText Markup Language'}
        ]
    },
    {
        question: 'HTML stands for 2nd?',
        answers: [
            {text: 'Hypertext Markup Language'},
            {text: 'HyperText Markup Language'}
        ]
    },
    {
        question: 'HTML stands for 3rd time?',
        answers: [
            {text: 'Hypertext Markup Language'},
            {text: 'HyperText Markup Language'}
        ]
    }

]

//---------- Utility functions --------

// Fisher-Yates shuffle algorithm
function shuffle(anArray) {
    let currentIndex = anArray.length, tempValue, randIndex;

    // While there remain elements to shuffle
    while(0 !== currentIndex) {
        
        // Pick a remaining element
        randIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap it with current element
        tempValue = anArray[currentIndex];
        anArray[currentIndex] = anArray[randIndex];
        anArray[randIndex] = tempValue;
    }
}