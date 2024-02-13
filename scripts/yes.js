
let shuffledQuestions = undefined, currentQIndex = undefined;
let questionElement = document.getElementById('question');
let answerBtnsElement = document.getElementById('answer-btns');
const overlayBG = document.getElementById('overlay');
const progressBar = document.getElementById('progress');

window.onload = function() {
    
    setTimeout(function() {
        let p1 = document.getElementById('p1');
        p1.style.opacity = 1;
    }, 1000);
    setTimeout(function() {
        let p2 = document.getElementById('p2');
        p2.style.opacity = 1;
    }, 3000);
    setTimeout(function() {
        let prove = document.getElementById('prove');
        prove.style.opacity = 1;
    }, 5000);

}

function showQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQIndex = 0;
    overlayBG.style.opacity = 1;
    overlayBG.style.zIndex = 2;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQIndex]);
}

function resetState() {
    while (answerBtnsElement.firstChild) {
        answerBtnsElement.removeChild(answerBtnsElement.firstChild);
    }
    overlayBG.classList.remove('correct');
}

function showQuestion( question ) {
    questionElement.innerText = question.question;
    question.answers.forEach( answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add('h-14', 'rounded-md', 'transition-opacity', 'duration-150', 'hover:opacity-60', 'q-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener( 'click', selectAnswer);
        answerBtnsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selected = e.target;
    const correct = selected.dataset.correct;
    const currQuestion = shuffledQuestions[currentQIndex];
    setStatusClass(overlayBG, correct)
    setStatusClass(selected, correct);
    if (correct) {
        if (currQuestion.question === 'What is the best part about YOU?'){
            Array.from(answerBtnsElement.children).forEach(button => {
                setStatusClass(button, correct);
            });
        }
        Array.from(answerBtnsElement.children).forEach(button => {
            button.removeEventListener('click', selectAnswer);
        });
        updateProgress();
        setTimeout(function() {
            if (shuffledQuestions.length > currentQIndex+1){
                currentQIndex++;
                setNextQuestion();
            }
            else {
                window.location.href = "finished.html";
            }
        }, 2000);
    }
}

function setStatusClass( element, correct ){
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    }
    else {
        element.classList.add('wrong');
    }
}

function clearStatusClass( element ) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function updateProgress() {
    const newLength = Math.floor(progressBar.parentElement.clientWidth / questions.length) * (currentQIndex+1) +1;
    progressBar.style.width = `${newLength}px`;
}

const questions = [
    {
        question: 'What is my favorite animals?',
        answers: [
            {text: 'Fish', correct: false},
            {text: 'Dog', correct: true},
            {text: 'Cat', correct: true},
            {text: 'Lion', correct: false}
        ]
    },
    {
        question: 'What is my favorite color?',
        answers: [
            {text: 'Red', correct: false},
            {text: 'Black', correct: true},
            {text: 'Green', correct: false},
            {text: 'Orange', correct: false}
        ]
    },
    {
        question: 'First Simba?',
        answers: [
            {text: 'November 5th', correct: true},
            {text: 'December 6th', correct: false},
            {text: 'October 18th', correct: false},
            {text: 'October 21th', correct: false}
        ]
    },
    {
        question: 'Exchange of Promise Ring?',
        answers: [
            {text: 'January 10th', correct: false},
            {text: 'January 6th', correct: false},
            {text: 'January 9th', correct: true},
            {text: 'Janury 11th', correct: false}
        ]
    },
    {
        question: 'First Dinner?',
        answers: [
            {text: 'September 9th', correct: false},
            {text: 'September 10th', correct: false},
            {text: 'September 11th', correct: false},
            {text: 'September 12th', correct: true}
        ]
    },
    {
        question: 'First Meeting?',
        answers: [
            {text: 'September 9th', correct: true},
            {text: 'September 10th', correct: false},
            {text: 'September 11th', correct: false},
            {text: 'September 12th', correct: false}
        ]
    },
    {
        question: 'What is the best part about YOU?',
        answers: [
            {text: 'Your Eyes', correct: true},
            {text: 'Your Smile', correct: true},
            {text: 'Your Laugh', correct: true},
            {text: 'All', correct: true}
        ]
    },
]