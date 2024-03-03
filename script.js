
// global variables
const nameInput = document.getElementById('nameInput');
const submitBtn = document.getElementById('submitBtn');
const guessContainer = document.getElementById('guess-container')
const playerImage = document.getElementById('player-image');
const messageText = document.getElementById('instruction-id')
const playerImageContainer = document.getElementById('player-img-container')
const resetBtn = document.getElementById('resetBtn');
const resetBtnReload = document.getElementById('resetBtnReload')
const giveUpBtn = document.getElementById('giveUpBtn')
var divCounter = 1;

// list of suns players
const players = [
    { breed: 'Cocker Spaniel', lifespan: '12-15', size:"M", purpose:"hunting", coatType:"Double-Coat", image: "https://images.yappy.com/yappicon/americancockerspaniel/americancockerspaniel-03.png" },
];

// function to get a random player from the array
function getRandomPlayer() {
    const randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex];
}

function pageReload() {

    location.reload();
}

// setting the correct guess, player image, and attempts on page load
let correctGuess = getRandomPlayer();
playerImage.src = correctGuess.image;
let attempts = 7;

// function for reset button
document.getElementById('resetBtn').addEventListener('click', function () {
    correctGuess = getRandomPlayer();
    playerImage.src = correctGuess.image;

    console.clear();
    console.log('Correct Guess: ', correctGuess.name)

    attempts = 7;
});

// event listener that submits guess when user presses "Enter" key
nameInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        submitBtn.click();
    }
});

// event listener for when user presses submit
submitBtn.addEventListener('click', function () {

    // if statement that runs while user has attempts
    if (attempts > 0) {

        // variables

        const guessedName = nameInput.value.trim().toLowerCase().replace(/'/g, '');
        const index = players.findIndex(player => player.name.trim().toLowerCase().replace(/'/g, '') === guessedName);
        const guessedPlayer = players[index];
        const messageText = document.getElementById('instruction-id')
        const validPlayer = players.find(player => player.name.toLowerCase().replace(/'/g, '') === guessedName);

        // if user enters nothing error handling
        if (guessedName === '') {
            alert('Please enter a name before submitting.');
            return;
        }

        // if user guesses a valid player
        if (validPlayer) {

            // if statement for correct answer
            if (guessedName === (correctGuess.name).toLowerCase().replace(/'/g, '')) {

                // changes to HTML / styles
                playerImage.classList.add('unveil')
                messageText.innerHTML = 'BANGGG!!!!'
                submitBtn.value = correctGuess.name;
                submitBtn.disabled = true;
                submitBtn.style.marginTop = '0';
                nameInput.style.display = 'none';
                playerImageContainer.classList.add('correct');
                resetBtn.style.display = 'none';
                resetBtnReload.style.display = 'block';

                // creating the correct guess clues container
                const newGuessDiv = document.createElement('div');
                newGuessDiv.classList.add('categories-container', 'correct', 'unveil');
                newGuessDiv.innerHTML = `<div class='category' id='college'>${correctGuess.draftedBy}</div> <div class='category' id='draft-year'>${correctGuess.debut}</div> <div class='category' id='height'>${correctGuess.height}</div> <div class='category' id='number'>${correctGuess.number}</div> <div class='category' id='position'>${correctGuess.position}</div> </p>`;
                guessContainer.appendChild(newGuessDiv);
                giveUpBtn.style.display = 'none';

            }

            // else statement for incorrect answer
            else {

                // subtracting 1 from attempts + HTML / styles changes
                attempts--;
                const newGuessDiv = document.createElement('div');
                messageText.innerHTML = `Guesses left: ${attempts}...`;
                resetBtn.style.display = 'none';
                resetBtnReload.style.display = 'block';

                // creating clues container for the guess
                newGuessDiv.classList.add('categories-container', 'incorrect');
                newGuessDiv.innerHTML = `<div class='category' id='college${divCounter}'>${guessedPlayer.draftedBy}</div> <div class='category' id='draft-year${divCounter}'>${guessedPlayer.debut}</div> <div class='category' id='height${divCounter}'>${guessedPlayer.height}</div> <div class='category' id='number${divCounter}'>${guessedPlayer.number}</div> <div class='category' id='position${divCounter}'>${guessedPlayer.position}</div> </p>`;
                guessContainer.appendChild(newGuessDiv);

                // creating height + position variables for comparison 
                const [guessedFeet, guessedInches] = guessedPlayer.height.split("'");
                const [correctFeet, correctInches] = correctGuess.height.split("'");
                const guessedFeetInt = parseInt(guessedFeet, 10) || 0;
                const guessedInchesInt = parseInt(guessedInches, 10) || 0;
                const correctFeetInt = parseInt(correctFeet, 10) || 0;
                const correctInchesInt = parseInt(correctInches, 10) || 0;
                const guessedTotalHeightInInches = guessedFeetInt * 12 + guessedInchesInt;
                const correctTotalHeightInInches = correctFeetInt * 12 + correctInchesInt;
                const positionWeights = {
                    "G": 1,
                    "G-F": 12,
                    "F-G": 21,
                    "F": 2,
                    "F-C": 23,
                    "C-F": 32,
                    "C": 3
                };
                const guessedPlayerPositionNumber = positionWeights[guessedPlayer.position];
                const correctPlayerPositionNumber = positionWeights[correctGuess.position];
                const guessedPlayerPositionString = guessedPlayerPositionNumber.toString();
                const correctPlayerPositionString = correctPlayerPositionNumber.toString();

                // the hints if statements...
                // COLLEGE IF STATEMENT
                if (guessedPlayer.draftedBy === correctGuess.draftedBy) {
                    const draftedBy = document.getElementById(`college${divCounter}`);
                    draftedBy.classList.add('correct');
                }

                // DRAFT YEAR IF STATEMENTS
                if (guessedPlayer.debut === correctGuess.debut) {
                    const draftYear = document.getElementById(`draft-year${divCounter}`);
                    draftYear.classList.add('correct');
                }

                if (Math.abs(correctGuess.debut - guessedPlayer.debut) <= 2 && correctGuess.debut !== guessedPlayer.debut) {
                    const draftYear = document.getElementById(`draft-year${divCounter}`);
                    draftYear.classList.add('close');
                }

                // HEIGHT IF STATEMENTS
                if (guessedPlayer.height === correctGuess.height) {
                    const height = document.getElementById(`height${divCounter}`);
                    height.classList.add('correct');
                }

                if (Math.abs(correctTotalHeightInInches - guessedTotalHeightInInches) <= 2 && correctTotalHeightInInches !== guessedTotalHeightInInches) {
                    const height = document.getElementById(`height${divCounter}`);
                    height.classList.add('close');
                }

                // NUMBER IF STATEMENTS
                if (guessedPlayer.number === correctGuess.number) {
                    const number = document.getElementById(`number${divCounter}`);
                    number.classList.add('correct');
                }

                if (Math.abs(correctGuess.number - guessedPlayer.number) <= 2 && correctGuess.number !== guessedPlayer.number) {
                    const number = document.getElementById(`number${divCounter}`);
                    number.classList.add('close');
                }

                // POSITION IF STATEMENTS
                let containsPosition = false;

                for (let i = 0; i < correctPlayerPositionString.length; i++) {
                    const digit = correctPlayerPositionString[i];

                    if (guessedPlayerPositionString.includes(digit)) {
                        containsPosition = true;
                        break;
                    }
                }

                if (guessedPlayer.position === correctGuess.position) {
                    const position = document.getElementById(`position${divCounter}`);
                    position.classList.add('correct');
                }

                if (containsPosition && guessedPlayer.position !== correctGuess.position) {
                    const position = document.getElementById(`position${divCounter}`);
                    position.classList.add('close');
                }

                // adding 1 to guess counter
                divCounter++;
            }
        }

        // alerting user if invalid player is entered
        else {
            alert('Player not found. Please try again.')
        }
    }

    // if the user runs out of attempts
    if (attempts === 0) {

        // changes to HTML and styles
        messageText.innerHTML = `It was ${correctGuess.name}! Better luck next time!`;
        playerImage.classList.add('unveil')
        submitBtn.value = correctGuess.name;
        submitBtn.disabled = true;
        submitBtn.style.marginTop = '0';
        nameInput.style.display = 'none';
        nameInput.disabled = true;
        submitBtn.disabled = true;
        playerImageContainer.classList.add('loss')
        resetBtn.style.display = 'none';
        resetBtnReload.style.display = 'block';
        giveUpBtn.style.display = 'none';

        // adding the final clues div with incorrect styling
        const newGuessDiv = document.createElement('div');
        newGuessDiv.classList.add('categories-container', 'loss', 'unveil');
        newGuessDiv.innerHTML = `<div class='category' id='college'>${correctGuess.college}</div> <div class='category' id='draft-year'>${correctGuess.debut}</div> <div class='category' id='height'>${correctGuess.height}</div> <div class='category' id='number'>${correctGuess.number}</div> <div class='category' id='position'>${correctGuess.position}</div> </p>`;
        guessContainer.appendChild(newGuessDiv);
    }

    // reseting the name value after guess to null
    nameInput.value = '';

});

// logging correct answer
console.log('Correct Guess:', correctGuess.name);

// suggestions list statements
const suggestionsList = document.getElementById('suggestions');

// event listener for when user types guess
nameInput.addEventListener('input', function () {
    const inputText = nameInput.value.trim().toLowerCase();
    const matchingPlayers = players.filter(player => {
        const fullName = player.name.toLowerCase();
        return fullName.includes(inputText);
    });
    displaySuggestions(matchingPlayers);
});

// function for displaying suggestions
function displaySuggestions(suggestions) {
    suggestionsList.innerHTML = '';

    if (suggestions.length === 0 || nameInput.value === "") {
        suggestionsList.style.display = 'none';
        return;
    }

    // creating list item for each suggestion with match
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion.name;
        li.addEventListener('click', () => {
            nameInput.value = suggestion.name;
            suggestionsList.style.display = 'none';
        });
        suggestionsList.appendChild(li);
    });

    suggestionsList.style.display = 'block';
}

// popup function
function togglePopup() {
    document.getElementById("help-popup").classList.toggle('active');
}

function giveUp() {

    // changes to HTML and styles
    messageText.innerHTML = `It was ${correctGuess.name}! Better luck next time!`;
    playerImage.classList.add('unveil')
    submitBtn.value = correctGuess.name;
    submitBtn.disabled = true;
    submitBtn.style.marginTop = '0';
    nameInput.style.display = 'none';
    nameInput.disabled = true;
    submitBtn.disabled = true;
    playerImageContainer.classList.add('loss')
    resetBtn.style.display = 'none';
    resetBtnReload.style.display = 'block';

    // adding the final clues div with incorrect styling
    const newGuessDiv = document.createElement('div');
    newGuessDiv.classList.add('categories-container', 'loss', 'unveil');
    newGuessDiv.innerHTML = `<div class='category' id='college'>${correctGuess.draftedBy}</div> <div class='category' id='draft-year'>${correctGuess.debut}</div> <div class='category' id='height'>${correctGuess.height}</div> <div class='category' id='number'>${correctGuess.number}</div> <div class='category' id='position'>${correctGuess.position}</div> </p>`;
    guessContainer.appendChild(newGuessDiv);
    giveUpBtn.style.display = 'none';

}

// functions for tool tips under categories
function toggleCollegeToolTip() {
    var tooltipContainers = document.querySelectorAll('[class^="tooltip-container"]');
    tooltipContainers.forEach(function (container) {
        container.style.display = 'none';
    });
    document.getElementById("tool-tip-container-college").classList.toggle('visible');
}

function toggleDebutToolTip() {
    var tooltipContainers = document.querySelectorAll('[class^="tooltip-container"]');
    tooltipContainers.forEach(function (container) {
        container.style.display = 'none';
    });
    document.getElementById("tool-tip-container-debut").classList.toggle('visible');
}

function toggleHeightToolTip() {
    var tooltipContainers = document.querySelectorAll('[class^="tooltip-container"]');
    tooltipContainers.forEach(function (container) {
        container.style.display = 'none';
    });
    document.getElementById("tool-tip-container-height").classList.toggle('visible');
}

function toggleNumberToolTip() {
    var tooltipContainers = document.querySelectorAll('[class^="tooltip-container"]');
    tooltipContainers.forEach(function (container) {
        container.style.display = 'none';
    });
    document.getElementById("tool-tip-container-number").classList.toggle('visible');
}

function togglePositionToolTip() {
    var tooltipContainers = document.querySelectorAll('[class^="tooltip-container"]');
    tooltipContainers.forEach(function (container) {
        container.style.display = 'none';
    });
    document.getElementById("tool-tip-container-position").classList.toggle('visible');
}

// function for iPhone that gets rid of tip after tap
document.body.addEventListener('click', function (event) {
    var target = event.target;
    var tooltipContainers = document.querySelectorAll('[class^="tooltip-container"]');
});