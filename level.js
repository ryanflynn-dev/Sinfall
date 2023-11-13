import { Enemy } from './enemy.js';
import { Platform } from './platform.js';
import { Npc } from './npc.js';

export class Level {
    constructor(levelData) {
        this.levelData = levelData;
        this.enemies = [];
        this.npcs = [];
        this.platforms = [];
    }
    load() {

        this.levelData.enemies.forEach(e => {
            this.enemies.push(new Enemy(e.id, e.x, e.y, e.health, e.attackPower, e.defencePower, e.experience));
        });

        this.levelData.npcs.forEach(n => {
            this.npcs.push(new Npc(n.id, n.x, n.y, n.health, n.attackPower, n.defencePower, n.experience));
        });

        this.levelData.platforms.forEach(p => {
            this.platforms.push(new Platform(p.x, p.y, p.width));
        });
    }
};