const data = [
    {
        id: 1,
        question: 'Kto jest prezydentem Polski?',
        answers: [
            { answer: "Andrzej Duda", isCorrect: true },
            { answer: 'Lech Wałęsa', isCorrect: false },
            { answer: 'Donald Tusk', isCorrect: false },
            { answer: 'Jarosław Kaczyński', isCorrect: false },
        ],
    },
    {
        id: 2,
        question: 'Kto jest kapitanem reprezentacji Polski w piłce nożnej? ',
        answers: [
            { answer: "Kuba Błaszczykowski", isCorrect: false },
            { answer: 'Kamil Glik', isCorrect: false },
            { answer: 'Robert Lewandowski', isCorrect: true },
            { answer: 'Grzegorz Krychowiak', isCorrect: false },
        ],
    },
    {
        id: 3,
        question: 'Ilu sąsiadów ma Polska?',
        answers: [
            { answer: 'Cztery', isCorrect: false },
            { answer: 'Pięć', isCorrect: false },
            { answer: 'Sześć', isCorrect: false },
        ],
    }
];
const gameScreen = document.querySelector('.game');
const resultScreen = document.querySelector('.result');
const question = document.querySelector('.question');
const answersContainer = document.querySelector('.answers');
const submit = document.querySelector('.submit');
const play = document.querySelector('.play');

let qIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let selectedAnswer;

const showQuestion = (qNumber) => {
    if (qIndex === data.length) return showResult();
    selectedAnswer = null;
    question.textContent = data[qNumber].question;
    answersContainer.innerHTML = data[qNumber].answers
        .map(
            (item, index) => `
        <div class="answer">
          <input type="radio" id=${index} name="answer" value=${item.isCorrect}>
          <label for=${index}>${item.answer}</label>
        </div>
      `
        )
        .join("");

    selectAnswer(); // ma ustawić nasłuchiwanie na te inputy
};

const selectAnswer = () => {
    answersContainer.querySelectorAll("input").forEach((el) => {
        el.addEventListener('click', (e) => {
            selectedAnswer = e.target.value;
        })
    })
}

const submitAnswer = () => {
    submit.addEventListener('click', () => {
        if (selectedAnswer !== null) {
            if (selectedAnswer === "true") {
                correctCount++;
            } else {
                wrongCount++;
            }
            console.log(correctCount, wrongCount);
            qIndex++
            showQuestion(qIndex);
        } else {
            alert('Select an answer!')
        }
    })
}
const showResult = () => {
    resultScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    resultScreen.querySelector(".correct").textContent = `Correct
    answers: ${correctCount} `;
    resultScreen.querySelector(".wrong").textContent = `Wrong answers:
    ${wrongCount} `;
    resultScreen.querySelector('.score').textContent = `Score =
    ${(correctCount - wrongCount) * 10} `
}
const playAgain = () => {
    qIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    total = 0;
    showQuestion(qIndex);
}
play.addEventListener("click", () => {
    resultScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    playAgain();
})

showQuestion(qIndex);
// submit.addEventListener('click', submitAnswer);
submitAnswer();