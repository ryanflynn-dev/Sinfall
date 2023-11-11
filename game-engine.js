import { Player } from './player.js';
import { initializeInputHandlers, getInputState } from './input.js';
import { Enemy } from './enemy.js';
import { checkIfOnPlatform, isColliding, collidingWithBoundaries } from './physics.js';
import { Platform } from './platform.js';
import { Camera } from './camera.js';
import { renderUI } from './ui.js';

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

//ENEMIES
const enemies = [];
enemies.push(new Enemy(1, 500, 850, 1, 10, 10, 50));
enemies.push(new Enemy(2, 800, 450, 1, 5, 20, 50));
enemies.push(new Enemy(3, 350, 550, 1, 15, 5, 50));
enemies.push(new Enemy(4, 650, 650, 1, 10, 15, 50));
enemies.push(new Enemy(5, 50, 450, 1, 20, 10, 50));
enemies.push(new Enemy(6, 800, 250, 1, 8, 25, 50));


//WORLD
const camera = new Camera(player, canvas.width, canvas.height)
const platforms = [
    new Platform(100, 900, 200),
    new Platform(200, 800, 50),
    new Platform(500, 900, 200),
    new Platform(900, 900, 100),
    new Platform(600, 700, 150),
    new Platform(300, 600, 100),
    new Platform(750, 500, 200),
    new Platform(50, 500, 100),
    new Platform(400, 400, 50),
    new Platform(800, 300, 150),
    new Platform(200, 200, 100)
];

initializeInputHandlers();

export function gameLoop() {    
    //CANVAS
    context.clearRect(0, 0, canvas.width, canvas.height);

    //WORLD
    camera.update()
    camera.applyTransformations(context);
    if (backgroundImage.complete) {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    platforms.forEach(platform => platform.render(context))
    if (enemies.length === 0){
        enemies.push(new Enemy(1, 500, 850, 100, 10, 10, 20));
        enemies.push(new Enemy(2, 800, 450, 150, 5, 20, 50));
        enemies.push(new Enemy(3, 350, 550, 100, 15, 5, 30));
        enemies.push(new Enemy(4, 650, 650, 120, 10, 15, 40));
        enemies.push(new Enemy(5, 50, 450, 100, 20, 10, 25));
        enemies.push(new Enemy(6, 800, 250, 150, 8, 25, 35));
    }

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

    //COMBAT SYSTEM
    if (player.isAttacking) {
        enemies.forEach(enemy => {
            if (isColliding(player.attackHitbox, enemy)) {
                enemy.gotHit(player.attackPower)
            }
        });
        player.resetAttack();
    }

    camera.resetTransformations(context);
    renderUI(context, player);

    requestAnimationFrame(gameLoop);
}