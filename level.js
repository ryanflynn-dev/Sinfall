import { Enemy } from './enemy.js';
import { Player } from './player.js';
import { Platform, Wall, Cap } from './blocks.js';
import { Npc } from './npc.js';
import { HealthPotion } from './items.js';

export class Level {
    constructor(levelData) {
        this.levelData = levelData;
        this.enemies = [];
        this.npcs = [];
        this.potions = [];
        this.platforms = [];
        this.walls = [];
        this.tops = [];
        this.bottoms = [];
        this.player = [];
    }
    load() {

        this.levelData.player.forEach(p => {
            this.player.push(new Player(p.x, p.y))
        })

        this.levelData.enemies.forEach(e => {
            this.enemies.push(new Enemy(e.id, e.x, e.y, e.health, e.attackPower, e.defencePower, e.experience));
        });

        this.levelData.npcs.forEach(n => {
            this.npcs.push(new Npc(n.id, n.x, n.y, n.health, n.attackPower, n.defencePower, n.experience));
        });

        this.levelData.potions.forEach(h => {
            this.potions.push(new HealthPotion(h.id, h.x, h.y, h.healValue));
        });

        this.levelData.platforms.forEach(p => {
            this.platforms.push(new Platform(p.x, p.y, p.width));
        });

        this.levelData.walls.forEach(w => {
            this.walls.push(new Wall(w.x, w.y, w.width, w.height));
        });

        this.levelData.walls.forEach(t => {
            const OFFSET = 20;
            this.tops.push(new Cap(t.x, t.y - OFFSET, t.width));
        })

        this.levelData.bottoms.forEach(b => {
            this.bottoms.push(new Cap(b.x, b.y, b.width));
        })

        
        
    }
};