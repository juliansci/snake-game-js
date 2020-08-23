import Game from './Game.js';

const startButton = document.getElementById('start');
const menu = document.getElementById('menu');
const boardGame = document.getElementById('boardGame');

const onFinishGame = (snake) => {
    console.log('onFinishGame: ', snake);
    const score = document.getElementById('score');
    score.innerHTML = `Your score: ${snake.body.length * 100}`;
    setTimeout(() => {
        menu.style.display = 'block';
        boardGame.style.display = 'none';
    }, 3000);
}

startButton.addEventListener('click', () => {
    const speedSelector = document.querySelector('input[name="speed"]:checked');
    const dimensionSelector = document.querySelector('input[name="dimension"]:checked');
    const speedValue = speedSelector && speedSelector.value;
    const dimensionValue = dimensionSelector && dimensionSelector.value;
    if (dimensionValue && speedValue) {
        const game = new Game(speedValue, dimensionValue);
        menu.style.display = 'none';
        boardGame.style.display = 'block';
        game.start(onFinishGame);
    }

});