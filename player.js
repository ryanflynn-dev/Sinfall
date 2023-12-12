import { FRICTION, GRAVITY, GROUND } from './physics.js'
import { Projectile } from './projectile.js';


export class Player {
    constructor(x, y) {
        //Position
        this.x = x;
        this.y = y;

        this.width = 60;
        this.height = 50;

        //Rendering
        this.sprite = new Image();
        this.sprite.src = 'assets/player.gif';
        this.attackSpriteRight = new Image();
        this.attackSpriteRight.src = 'assets/sinfall-melee-right.png'
        this.attackSpriteLeft = new Image();
        this.attackSpriteLeft.src = 'assets/sinfall-melee-left.png'


        //Movement
        this.vX = 0;
        this.vY = 0;
        this.acceleration = 1;
        this.maxSpeed = 10;
        this.jumpStrength = 20;
        this.dashSpeed = 30;
        this.direction = 'right';

        //Physics
        this.weight = 1;
        this.onPlatform = false;
        
        //Attributes
        this.maxHealth = 100;
        this.health = 100;
        this.attackPower = 10;
        this.defencePower = 50;
        this.dashDuration = 200;
        

        //Arrays
        this.projectiles = [];

        //Switches
        this.isAttacking = false;
        this.attackHitbox = null;
        this.isDashing = false;
        

        //Timers
        this.lastShotTime = 0;
        this.shootCooldown = 1200;
        this.lastAttackTime = 0;
        this.attackCooldown = 500;
        this.attackDuration = 4000;
        this.attackEndTime = 0;
        this.dashCooldown = 1000;
        this.lastDashTime = 0;

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

    update(deltaTime) {
        const currentTime = Date.now()

        this.vX *= FRICTION;

        this.x += this.vX;
        this.y += this.vY;

        if (!this.onGround()){
            this.vY += GRAVITY * this.weight;
        } else this.vY = 0

        if (this.y + this.height > GROUND) {
            this.y = GROUND - this.height;
        }

        if (this.isDashing) {
            const dashDirection = (this.direction === 'left') ? -1 : 1;
            this.x += this.dashSpeed * dashDirection;
        }

        if (this.isAttacking && currentTime >= this.attackEndTime) {
            this.resetAttack();
        }

    }

    handleInput(input, deltaTime) {
        if (input.left) {
            this.move(-1, deltaTime);
        }
        if (input.right) {
            this.move(1, deltaTime);
        }
        if (input.up) {
            this.direction = "up";
        }
        if (input.down) {
            this.direction = "down"
        }
        if (input.jump) {
            this.jump();
        }
        if (input.attack) {
            this.attack();
        } 
        if (input.shoot) {
            this.shoot(this.direction);
        }
        if (input.dash) {
            this.dash();
        }


        if (!input.left && !input.right && !input.up && !input.jump && !input.attack && !input.shoot) {
            this.idle();
        }
    }
    
    #setHealth(newHealth) {
            this.health = newHealth;
    }

    #setExp(amount) {
        this.experience += amount;
        console.log(`Gained ${amount} EXP. Total EXP: ${this.experience}`);

        while (this.experience >= 100) {
            this.level++;
            this.experience -= 100;

            this.increaseStats();

            console.log(`Level up! Level: ${this.level}, Total EXP: ${this.experience}`);
        }
    }

    increaseStats() {
        this.attackPower += 10;
        this.defencePower += 10;
        this.maxHealth += 10;
    }

    gainExp(amount) {
        this.#setExp(amount);
    }

    gainHealth(healValue){
        if (this.health + healValue < this.maxHealth){
        const newHealth = this.health + healValue;
        this.#setHealth(newHealth);
        } else if (this.health + healValue >= this.maxHealth){
            this.#setHealth(this.maxHealth);
        }
    }

    move(direction, deltaTime) {
        this.direction = direction > 0 ? 'right' : 'left';
        this.vX += direction * this.acceleration * deltaTime;
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

    dash() {
        const currentTime = Date.now();
        if (!this.isDashing && currentTime - this.lastDashTime >= this.dashCooldown) {
            this.isDashing = true;
            this.lastDashTime = currentTime;
            setTimeout(() => {
                this.isDashing = false;
            }, this.dashDuration);
        }
    }
    

    attack() {
        const currentTime = Date.now()
        if (currentTime - this.lastAttackTime >= this.attackCooldown) {
            this.isAttacking = true;
            this.lastAttackTime = currentTime;
            this.attackEndTime = currentTime + this.attackDuration;
            let offsetX = 0;
            let offsetY = 0;
            const hitboxWidth = 50;
            const hitboxHeight = this.height;

            switch (this.direction) {
                case 'right':
                    offsetX = this.width;
                    break;
                case 'left':
                    offsetX = -hitboxWidth;
                    break;
                case 'up':
                    offsetY = -hitboxHeight;
                    break;
                case 'down':
                    offsetY = this.height;
                    break;
            }

            this.attackHitbox = { 
                x: this.x + offsetX, 
                y: this.y + offsetY, 
                width: hitboxWidth, 
                height: hitboxHeight 
            };
        }
    }

    renderAttackHitbox(context) {
        const currentTime = Date.now()
        if (this.isAttacking && currentTime < this.attackEndTime) {
            const sprite = this.getAttackSprite();
            if (sprite && sprite.complete) {
                context.drawImage(sprite, this.attackHitbox.x, this.y, this.width, this.height);
            } else {
                context.fillStyle = 'rgba(255, 0, 0, 0.5)';
                context.fillRect(this.attackHitbox.x, this.attackHitbox.y, this.attackHitbox.width, this.attackHitbox.height);
            }
        }
    }

    getAttackSprite() {
        switch (this.direction) {
            case 'right':
                return this.attackSpriteRight;
            case 'left':
                return this.attackSpriteLeft;
            default:
                return null;
        }
    }

    resetAttack() {
        this.isAttacking = false;
        this.attackHitbox = null;
    }

    shoot(direction) {
        const currentTime = Date.now();
        if (currentTime - this.lastShotTime >= this.shootCooldown) {
            let velocityX = 0;
            let velocityY = 0;
            const speed = 15;
            const projectileOffset = 25;
            const offsetX = 10;
            let X = this.x;
            let Y = this.y;

            switch(direction) {
                case 'right':
                    velocityX = speed;
                    X = this.x + projectileOffset;
                    break;
                case 'left':
                    velocityX = -speed;
                    X = this.x
                    break;
                case 'up':
                    velocityY = -speed;
                    X = this.x + offsetX;
                    Y = this.y - projectileOffset - 5;
                    break;
                case 'down':
                    velocityY = speed;
                    X = this.x + offsetX;
                    Y = this.y + projectileOffset;
            }

            const projectile = new Projectile(X, Y, velocityX, velocityY);
            this.projectiles.push(projectile);
            this.lastShotTime = currentTime;
        }
    }

    updateProjectiles() {
        this.projectiles.forEach(projectile => projectile.update());
        this.projectiles = this.projectiles.filter(projectile => !projectile.isExpired);
    }

    renderProjectiles(context) {
        this.projectiles.forEach(projectile => projectile.render(context));
    }

    gotHit(damage) {
        const newHealth = this.health - damage / this.defencePower;
        this.#setHealth(newHealth);
    }

    die() {
        this.health = 0;
    }

    onGround() {
        return this.y + this.height >= GROUND || this.onPlatform;
    }

}