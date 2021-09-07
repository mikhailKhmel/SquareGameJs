const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $time = document.querySelector('#time');
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $result = document.querySelector('#result');
const $gameTimeInput = document.querySelector('#game-time');

const $hardBtn = document.querySelector('#hard-level');
const $mediumBtn = document.querySelector('#medium-level');
const $easyBtn = document.querySelector('#easy-level');

const $levelText = document.querySelector('#level-text');

let score = 0;
let isGameStarted = false;
let squareSize = {
    min: 20,
    max: 100
};

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleSquareClick);
$gameTimeInput.addEventListener('input', handleTimeInput);

$hardBtn.addEventListener('click', function () {
    squareSize.min = 5;
    squareSize.max = 50;
    $levelText.textContent = 'Сложно';
});
$mediumBtn.addEventListener('click', function () {
    squareSize.min = 20;
    squareSize.max = 100;
    $levelText.textContent = 'Средне';
});
$easyBtn.addEventListener('click', function () {
    squareSize.min = 50;
    squareSize.max = 180;
    $levelText.textContent = 'Легко';
});

function show($el) {
    $el.classList.remove('hide');
}

function hide($el) {
    $el.classList.add('hide');
}

function startGame() {
    score = 0;
    $time.textContent = $gameTimeInput.value;
    $gameTimeInput.setAttribute('disabled', 'true');

    $hardBtn.setAttribute('disabled', 'true');
    $mediumBtn.setAttribute('disabled', 'true');
    $easyBtn.setAttribute('disabled', 'true');

    isGameStarted = true;
    $game.style.backgroundColor = '#fff';

    hide($start);
    hide($resultHeader);
    show($timeHeader);

    const interval = setInterval(function () {
        let time = parseFloat($time.textContent);
        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderSquare();
}

function endGame() {
    isGameStarted = false;
    show($start);
    show($game);
    show($gameTimeInput);
    show($resultHeader);
    hide($timeHeader);

    $gameTimeInput.removeAttribute('disabled');
    $hardBtn.removeAttribute('disabled');
    $mediumBtn.removeAttribute('disabled');
    $easyBtn.removeAttribute('disabled');

    $game.style.backgroundColor = '#ccc';
    $game.innerHTML = '';

    $result.textContent = score.toString();
}

function handleTimeInput() {
    $time.textContent = $gameTimeInput.value;
    hide($resultHeader);
    show($timeHeader);
}

function handleSquareClick(event) {
    if (isGameStarted) {
        if (event.target.dataset.square) {
            score++;
            renderSquare();
        }
    }
}

function renderSquare() {
    $game.innerHTML = '';
    const square = document.createElement('div');
    const size = getRandom(squareSize.min, squareSize.max);
    const gameSize = $game.getBoundingClientRect();
    const top = getRandom(0, gameSize.height - size);
    const left = getRandom(0, gameSize.width - size);

    const colorMin = 8;
    const colorMax = 15;
    const backgroundColor = `#${getRandom(colorMin, colorMax).toString(16)}${getRandom(colorMin, colorMax).toString(16)}${getRandom(colorMin, colorMax).toString(16)}`;

    square.style.height = square.style.width = `${size}px`;
    square.style.position = 'absolute';
    square.style.backgroundColor = backgroundColor;
    square.style.top = `${top}px`;
    square.style.left = `${left}px`;
    square.style.cursor = 'pointer';
    square.setAttribute('data-square', 'true');

    $game.insertAdjacentElement('afterbegin', square);

}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
