import { FRICTION, GRAVITY, GROUND } from './physics.js'

export class Player {
    constructor(x, y) {
        //Position
        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        //Rendering
        this.sprite = new Image();
        this.sprite.src = 'assets/sinfall-eggplant.png';

        //Movement
        this.vX = 0;
        this.vY = 0;
        this.acceleration = 1;
        this.maxSpeed = 10;
        this.jumpStrength = 20;
        this.direction = 'right';

        //Physics
        this.weight = 1;
        this.onPlatform = false;
        

        //Attributes
        this.maxHealth = 100;
        this.health = 100;
        this.attackPower = 10;
        this.isAttacking = false;
        this.attackHitbox = null;
        this.defencePower = 50;

        //Levelling
        this.experience = 0;
        this.level = 1;
    }

    render(context) {
        if (this.sprite.complete) {
            context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        } else {
            context.fillStyle = 'blue';
            context.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    update() {
        this.vX *= FRICTION;

        this.x += this.vX;
        this.y += this.vY;

        if (!this.onGround()){
            this.vY += GRAVITY * this.weight;
        } else this.vY = 0

        if (this.y + this.height > GROUND) {
            this.y = GROUND - this.height;
        }

    }

    handleInput(input) {
        if (input.left) {
            this.move(-1);
        }
        if (input.right) {
            this.move(1);
        }
        if (input.up) {
            this.jump();
        }
        if (input.jump) {
            this.jump();
        }
        if (input.attack) {
            this.attack();
        } 

        if (!input.left && !input.right && !input.up && !input.jump && !input.attack) {
            this.idle();
        }
    }
    #setHealth(newHealth) {
        if(newHealth >= 0){
            this.health = newHealth;
        } else this.die()
    }
    #setExp(amount) {
        if(this.experience < 100){
            this.experience += amount;
            console.log(`Gained ${amount} EXP. Total EXP: ${this.experience}`);
        }
        if (this.experience >= 100) {
            this.level++
            this.experience -= 100;
            console.log(`Level up! ${this.level}, Total EXP: ${this.experience}`);

        }
    }
    gainExp(amount) {
        this.#setExp(amount)
    }
    move(direction) {
        this.direction = direction > 0 ? 'right' : 'left';
        this.vX += direction * this.acceleration;
        this.vX = Math.max(-this.maxSpeed, Math.min(this.vX, this.maxSpeed));
    }

    jump() {
        if (this.onGround()){
            this.vY -= this.jumpStrength;
            this.onPlatform = false;
        }
    }

    idle() {
    }

    attack() {
        this.isAttacking = true;
        if (this.direction === 'right') {
            this.attackHitbox = { x: this.x + this.width, y: this.y, width: 50, height: this.height };
        } else if (this.direction === 'left') {
            this.attackHitbox = { x: this.x - 50, y: this.y, width: 50, height: this.height };
        }
    }
    //DEBUGGER
    renderAttackHitbox(context) {
        if (this.isAttacking) {
            context.strokeStyle = 'rgba(255, 0, 0, 0.5)';
            context.strokeRect(this.attackHitbox.x, this.attackHitbox.y, this.attackHitbox.width, this.attackHitbox.height);
        }
    }
    resetAttack() {
        this.isAttacking = false;
        this.attackHitbox = null;
    }
    gotHit(damage) {
        const newHealth = this.health - damage / this.defencePower;
        this.#setHealth(newHealth)
    }
    die() {
        this.health = 0;
        console.log("gameover")
    }
    onGround() {
        return this.y + this.height >= GROUND || this.onPlatform;
    }

}