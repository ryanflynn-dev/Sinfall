import { Player } from './player.js';
import { initializeInputHandlers, getInputState } from './input.js';
import { checkIfOnPlatform, isColliding, collidingWithBoundaries } from './physics.js';
import { Camera } from './camera.js';
import { renderUI } from './ui.js';
import { Level } from './level.js';
import { level1Data, level2Data } from './level-data.js';

//CANVAS
document.getElementById('gameCanvas').focus();
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
canvas.width = 1080;
canvas.height = 1080;

const backgroundImage = new Image();
backgroundImage.src = 'assets/sinfall-background.png';

//PLAYER
const player = new Player(100, 500);

//WORLD
const camera = new Camera(player, canvas.width, canvas.height)
let currentLevel = new Level(level1Data);
currentLevel.load(); 
let enemies = currentLevel.enemies;
let npcs = currentLevel.npcs;
let platforms = currentLevel.platforms;

initializeInputHandlers();

export function gameLoop() {    
    //CANVAS
    context.clearRect(0, 0, canvas.width, canvas.height);

    //WORLD
    camera.update();
    camera.applyTransformations(context);
    if (backgroundImage.complete) {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    platforms.forEach(platform => platform.render(context))

    //PLAYER
    const input = getInputState();
    player.handleInput(input);
    player.update();
    player.render(context);
    player.renderAttackHitbox(context);
    collidingWithBoundaries(player, canvas);
    checkIfOnPlatform(player, platforms);

    //ENEMIES
    for (let i = enemies.length - 1; i >= 0; i--) {
        if (!enemies[i].isAlive) {
            player.gainExp(enemies[i].giveExp());
            enemies.splice(i, 1);
        } else {
            enemies[i].update();
            enemies[i].render(context);
        }
    }
    enemies.forEach(enemy => {
        checkIfOnPlatform(enemy, platforms)
        if (isColliding(player, enemy)) {
            player.gotHit(enemy.attackPower)
        }
        collidingWithBoundaries(enemy, canvas);
    });

    //NPCS
    for (let i = npcs.length - 1; i >= 0; i--) {
        if (!npcs[i].isAlive) {
            player.gainExp(npcs[i].giveExp());
            npcs.splice(i, 1);
        } else {
            npcs[i].update();
            npcs[i].render(context);
        }
    }
    npcs.forEach(npc => {
        checkIfOnPlatform(npc, platforms)
        if (isColliding(player, npc)) {
        }
        collidingWithBoundaries(npc, canvas);
    });

    //COMBAT SYSTEM
    if (player.isAttacking) {
        enemies.forEach(enemy => {
            if (isColliding(player.attackHitbox, enemy)) {
                enemy.gotHit(player.attackPower)
            }
        });
        player.resetAttack();
    }

    //Levels
    if (enemies.length === 0){
        currentLevel = new Level(level2Data);
        currentLevel.load();
        enemies = currentLevel.enemies;
        npcs = currentLevel.npcs;
        platforms = currentLevel.platforms;
    }

    camera.resetTransformations(context);
    renderUI(context, player);

    requestAnimationFrame(gameLoop);
}