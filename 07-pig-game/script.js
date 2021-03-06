'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Rolling the dice functionality
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true; //state variable to determine if the game is playing or not

function switchPlayer() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function (){
    if(playing){
        //1. generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //console.log(dice); 
        //2. display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //3. check for 1
        if (dice !== 1) {
            //add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //set current to 0
            switchPlayer();
        }
    }
});

//Hold current score
btnHold.addEventListener('click', function () {
    if(playing){
        // add current score to players score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // see if current score is > = 100
        if(scores[activePlayer] >= 100){
            //finish game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        }else{
            //switch player
            switchPlayer();
        }
    }
});

//reset the game
btnNew.addEventListener('click', function (){
    for (let i = 0; i < scores.length; i++){
        scores[i] = 0;
        document.getElementById(`score--${i}`).textContent = scores[i];
        document.getElementById(`current--${i}`).textContent = scores[i];
        document.querySelector(`.player--${i}`).classList.remove('player--winner');
    }
    currentScore = 0;
    playing = true;
    activePlayer = 0;
    player0El.classList.add('player--active');
});

