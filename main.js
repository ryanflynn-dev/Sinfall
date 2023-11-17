import { gameLoop, resetGameState } from "./game-engine.js";


window.onload = () => {
    document.getElementById('titleScreen').style.display = 'flex';
};


document.getElementById('playButton').addEventListener('click', () => {
    document.getElementById('titleScreen').style.display = 'none';
    startGame();
});

document.getElementById('replayButton').addEventListener('click', () => {
    document.getElementById('gameOverScreen').style.display = 'none';
    resetGameState();
});




function startGame() {
    gameLoop();
}

