'use strict';

const btnsContainer = document.querySelector('.btns-game');
const btnRock = document.querySelector('.btn-rock');
const btnPaper = document.querySelector('.btn-paper');
const btnScissors = document.querySelector('.btn-scissors');
const bet0 = document.querySelector('.bet--0');
const bet1 = document.querySelector('.bet--1');
const score0 = document.querySelector('.score--0');
const score1 = document.querySelector('.score--1');
const gameMessageEl = document.querySelector('.game-message');
const btnReset = document.querySelector('.btn-reset');
const btnIcon = document.querySelector('.btn-icon');

let userFinalScore = 0;
let computerFinalScore = 0;

// Image element helper function
const createImgEl = function (iconName) {
    let imgEl = document.createElement('img');
    imgEl.src = `images/icon-${iconName}.svg`;
    imgEl.style.height = '9rem';
    return imgEl;
};

const disableBtns = function () {
    btnPaper.disabled = true;
    btnRock.disabled = true;
    btnScissors.disabled = true;
    btnIcon.style.filter = 'grayscale(80%)';
    btnRock.style.border = 'none';
    btnPaper.style.border = 'none';
    btnScissors.style.border = 'none';
};

// Check if anyone has reached 5 points
const hasFivePoints = function () {
    if (userFinalScore === 5) {
        gameMessageEl.textContent = 'You win champ! 🎊';
        disableBtns();
    } else if (computerFinalScore === 5) {
        gameMessageEl.textContent = `Sorry! You suck! 🤪`;
        disableBtns();
    } else if (computerFinalScore === 5 && userFinalScore === 5) {
        gameMessageEl.textContent = `Oh! It's a draw again!😎`;
        disableBtns();
    }
};

const computerChoice = function () {
    const GAMEARR = ['rock', 'paper', 'scissors'];
    return GAMEARR[Math.trunc(Math.random() * 3)];
};

const whoWins = function (userBet, computerBet) {
    // Showing the img or icon
    bet0.textContent = '';
    bet0.appendChild(createImgEl(userBet));
    bet1.textContent = '';
    bet1.appendChild(createImgEl(computerBet));

    /* DIFFERENT WINNING POSSIBILITIES */
    if (
        // DRAW
        userBet === computerBet
    ) {
        gameMessageEl.textContent = `It's a draw! 😏`;
        userFinalScore += 1;
        computerFinalScore += 1;
        score0.textContent = userFinalScore;
        score1.textContent = computerFinalScore;
        hasFivePoints();
    } else if (
        // ALL WINNING POSSIBILITIES FOR USER
        (userBet === 'scissors' && computerBet === 'paper') ||
        (userBet === 'rock' && computerBet === 'scissors') ||
        (userBet === 'paper' && computerBet === 'rock')
    ) {
        gameMessageEl.textContent = 'You get 1 pt 😈';
        userFinalScore += 1;
        score0.textContent = userFinalScore;
        hasFivePoints();
    } else if (
        // LOSING POSSIBILITIES FOR USER
        (userBet === 'scissors' && computerBet === 'rock') ||
        (userBet === 'rock' && computerBet === 'paper') ||
        (userBet === 'paper' && computerBet === 'scissors')
    ) {
        gameMessageEl.textContent = 'You lost!🤣 ';
        computerFinalScore += 1;
        score1.textContent = computerFinalScore;
        hasFivePoints();
    }
};

/**** GAME BTNS HANDLERS ****/
// Rock
btnRock.addEventListener('click', function () {
    const userBet = 'rock';
    let computerBet = computerChoice();
    whoWins(userBet, computerBet);
});

// Paper
btnPaper.addEventListener('click', function () {
    const userBet = 'paper';
    let computerBet = computerChoice();
    whoWins(userBet, computerBet);
});

// Scissors
btnScissors.addEventListener('click', function () {
    const userBet = 'scissors';
    let computerBet = computerChoice();
    whoWins(userBet, computerBet);
});

// Reset game
btnReset.addEventListener('click', function () {
    btnRock.disabled = false;
    btnPaper.disabled = false;
    btnScissors.disabled = false;
    userFinalScore = 0;
    computerFinalScore = 0;
    score0.textContent = '0';
    score1.textContent = '0';
    bet0.textContent = '?';
    bet1.textContent = '?';
    gameMessageEl.textContent = '';
    btnRock.style.border = '0.4rem solid #ff0404';
    btnPaper.style.border = '0.4rem solid #2e8dfd';
    btnScissors.style.border = '0.4rem solid #f4a446';
});
