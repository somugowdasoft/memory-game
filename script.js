const gameBoard = document.querySelector('.game-board');
const resetButton = document.getElementById('reset');
// set the cards data
const cardsArray = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

// initaily card values
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// sorting the array items
function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

// create the game board
function createBoard() {
    const shuffledArray = shuffle(cardsArray);
    shuffledArray.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// when click the board showing the board data.
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
    } else {
        unflipCards();
    }
}

// disabling cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// setting time out for cards
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}


function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
// resetting the borad
function resetGame() {
    gameBoard.innerHTML = '';
    createBoard();
}

resetButton.addEventListener('click', resetGame);

createBoard();
