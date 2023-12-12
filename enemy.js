import { FRICTION, GRAVITY, GROUND } from './physics.js'

export class Enemy {
    constructor(id, x, y, health, attackPower, defencePower, experience) {
        this.id = id;
        //Position
        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 75;

        //Rendering
        this.sprite = new Image();
        this.sprite.src = 'assets/enemy.png';

        //Movement
        this.vX = 0;
        this.vY = 0;
        this.acceleration = 1;
        this.maxSpeed = 10;
        this.jumpStrength = 15;

        //Physics
        this.weight = 1;

        //Attributes
        this.health = health;
        this.isAlive = true;
        this.attackPower = attackPower;
        this.defencePower = defencePower;
        this.experience = experience || 0;

        this.hitCooldown = 500;
        this.lastHitTime = 0;
    }
    render(context) {
        if (this.sprite.complete) {
            context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        } else {
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    update(deltaTime) {
        this.vX *= FRICTION;

        this.x += this.vX;
        this.y += this.vY;

        if (!this.onGround()){
            this.vY += GRAVITY * this.weight;
        } else this.vY = 0;

        if (this.y + this.height > GROUND) {
            this.y = GROUND - this.height;
        }

    }
    #setHealth(newHealth) {
            this.health = newHealth;
            console.log(this.health)
        
    }
    move(direction) {
        this.vX += direction * this.acceleration;
        this.vX = Math.max(-this.maxSpeed, Math.min(this.vX, this.maxSpeed));
    }
    jump() {
        if (this.onGround()){
            this.vY -= this.jumpStrength;
        }
    }
    gotHit(damage) {
        const currentTime = Date.now();

        if (currentTime - this.lastHitTime >= this.hitCooldown) {
            const newHealth = this.health - damage / this.defencePower;
            if(newHealth >= 1){
                this.#setHealth(newHealth);

                this.lastHitTime = currentTime;

            } else if (newHealth <= 0) {this.die();}
        }
    }
    onGround() {
        return this.y + this.height >= GROUND;
    }
    die() {
        this.isAlive = false;
        this.giveExp();
    }
    giveExp() {
        return this.experience;
    }
}