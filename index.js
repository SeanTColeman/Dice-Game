//variables for the game state
let player1Score = 0
let player2Score = 0
let round = 1
let player1Turn = true

//variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const roundCounter = document.getElementById("roundCounter")

function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}

//does not move to new round after the last roll of the game.
function showLastRoundCount() {
    if (roundCounter.textContent !== "SUDDEN DEATH") {
        round--
        roundCounter.textContent = `Round ${round}`
    }
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1

    if (player1Turn) {
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
       
        if (roundCounter.textContent !== "SUDDEN DEATH") {
        round++
        roundCounter.textContent = `Round ${round}`
        }
    }
    
    //if both are over 20 and tied, enter sudden death
    if (!player1Turn && player1Score >= 20 && player1Score === player2Score) {
        roundCounter.textContent = "SUDDEN DEATH"
    //Player 2 gets the last roll. Whoever has 20 or more wins. Then game resets.
    } else if (!player1Turn && player1Score >= 20 && player1Score > player2Score) {
        showLastRoundCount()
        message.textContent = "Player 1 Won 🥳"
        showResetButton()
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        
    }  else if (!player1Turn && player2Score >= 20) {
        showLastRoundCount()
        message.textContent = "Player 2 Won 🎉"
        showResetButton()
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
    }
    //Next  players turn. 
    player1Turn = !player1Turn
})
 
resetBtn.addEventListener("click", reset)

//Resets the game
function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    round = 1
    roundCounter.textContent = `Round ${round}`
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
}

//added a round count feature - done
//making sure the active class stays on the winner - done
//Players should have an equal amount of turns - done
//If both players are over 20 and tied, enter sudden death. -done
//Round should not increase when the game is over. - done
//After the sudden death round, the round text should still say sudden death - done
//Style the round text - done
//add clickable modal that says game objective