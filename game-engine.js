import { initializeInputHandlers, getInputState } from './input.js';
import { checkIfOnPlatform, isColliding, collidingWithBoundaries, handleWallCollisions, handleTopCollisions, handleBottomCollisions } from './physics.js';
import { Camera } from './camera.js';
import { renderUI } from './ui.js';
import { Level } from './level.js';
import { level1Data, level2Data, level3Data, level4Data } from './level-data.js';

//CANVAS
document.getElementById('gameCanvas').focus();
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
canvas.width = 1080;
canvas.height = 1080;

const backgroundImage = new Image();
backgroundImage.src = 'assets/sinfall-background.png';



//WORLD
let level = 1;
let currentLevel = new Level(level1Data);
currentLevel.load(); 
let enemies = currentLevel.enemies;
let npcs = currentLevel.npcs;
let potions = currentLevel.potions;
let platforms = currentLevel.platforms;
let walls = currentLevel.walls;
let tops = currentLevel.tops;
let bottoms = currentLevel.bottoms;

//PLAYER
let players = currentLevel.player;
let player = players[0];




initializeInputHandlers();

export function gameLoop() {
    const camera = new Camera(player, canvas.width, canvas.height);
   

    //CANVAS
    context.clearRect(0, 0, canvas.width, canvas.height);

    //WORLD
    camera.update();
    camera.applyTransformations(context);
    if (backgroundImage.complete) {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
        context.fillStyle = '#000d17';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    platforms.forEach(platform => platform.render(context));
    walls.forEach(wall => wall.render(context));
    tops.forEach(top => top.render(context));
    bottoms.forEach(bottom => bottom.render(context));


    

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
        checkIfOnPlatform(enemy, platforms);
        handleBottomCollisions(enemy, bottoms);
        handleWallCollisions(enemy, walls);
        handleTopCollisions(enemy, tops);
        // checkHorizontalWallCollision(enemy, walls);
        if (isColliding(player, enemy)) {
            player.gotHit(enemy.attackPower)
        }
        collidingWithBoundaries(enemy, canvas);
    });

    //NPCS
    for (let i = npcs.length - 1; i >= 0; i--) {
        if (!npcs[i].isAlive){

        } else {
            npcs[i].update();
            npcs[i].render(context);
        }
    }
    npcs.forEach(npc => {
        checkIfOnPlatform(npc, platforms);
        handleBottomCollisions(npc, bottoms);
        handleWallCollisions(npc, walls);
        handleTopCollisions(npc, tops);
        // checkIfWall(npc, walls);
        if (isColliding(player, npc)) {
        }
        collidingWithBoundaries(npc, canvas);
    });    
    
    //ITEMS
    for (let i = potions.length - 1; i >= 0; i--) {
        if (!potions[i].unused){
            player.gainHealth(potions[i].giveHealth());
            potions.splice(i, 1);
        } else {
            potions[i].update();
            potions[i].render(context);
        }
    }
    potions.forEach(potion => {
        checkIfOnPlatform(potion, platforms);
        handleBottomCollisions(potion, bottoms);
        handleWallCollisions(potion, walls);
        handleTopCollisions(potion, tops);
        // checkIfWall(potion, walls);
        if (isColliding(player, potion)) {
            potion.unused = false;
        }
        collidingWithBoundaries(potion, canvas);
    });

    //PLAYER
    const input = getInputState();
    player.handleInput(input);
    player.update();
    player.render(context);
    player.renderAttackHitbox(context);
    player.updateProjectiles();
    player.renderProjectiles(context);
    collidingWithBoundaries(player, canvas);
    checkIfOnPlatform(player, platforms);
    handleTopCollisions(player, tops);
    handleBottomCollisions(player, bottoms);
    handleWallCollisions(player, walls);
    

  

    //COMBAT SYSTEM
    if (player.isAttacking) {
        enemies.forEach(enemy => {
            if (isColliding(player.attackHitbox, enemy)) {
                console.log(enemy.health)
                enemy.gotHit(player.attackPower)
            }
        });
        player.resetAttack();
    }
    player.projectiles.forEach((projectile, index) => {
        enemies.forEach(enemy => {
            if (isColliding(projectile, enemy)) {
                enemy.gotHit(player.attackPower)
                player.projectiles.splice(index, 1);
            }
        })
    });
    if (player.health <= 0) {
        player.die();
        document.getElementById('gameOverScreen').style.display = 'flex';
    }


    //Levels
    if (level === 1 && enemies.length === 0){
        level++
        currentLevel = new Level(level2Data);
        currentLevel.load();
        enemies = currentLevel.enemies;
        npcs = currentLevel.npcs;
        platforms = currentLevel.platforms;
        potions = currentLevel.potions;
        walls = currentLevel.walls;
        tops = currentLevel.tops;
        bottoms = currentLevel.bottoms;
    }
    if (level === 2 && enemies.length === 0){
        level++
        currentLevel = new Level(level3Data);
        currentLevel.load();
        enemies = currentLevel.enemies;
        npcs = currentLevel.npcs;
        platforms = currentLevel.platforms;
        potions = currentLevel.potions;
        walls = currentLevel.walls;
        tops = currentLevel.tops;
        bottoms = currentLevel.bottoms;
    }
    if (level === 3 && enemies.length === 0){
        level++
        currentLevel = new Level(level4Data);
        currentLevel.load();
        enemies = currentLevel.enemies;
        npcs = currentLevel.npcs;
        platforms = currentLevel.platforms;
        potions = currentLevel.potions;
        walls = currentLevel.walls;
        tops = currentLevel.tops;
        bottoms = currentLevel.bottoms;
    }

    camera.resetTransformations(context);
    renderUI(context, player);

    requestAnimationFrame(gameLoop);
}

export function resetGameState() {
    level = 1;
    currentLevel = new Level(level1Data);
    currentLevel.load(); 
    enemies = currentLevel.enemies;
    npcs = currentLevel.npcs;
    potions = currentLevel.potions;
    platforms = currentLevel.platforms;
    walls = currentLevel.walls;
    tops = currentLevel.tops;
    bottoms = currentLevel.bottoms;
    players = currentLevel.player;
    player = players[0];

}