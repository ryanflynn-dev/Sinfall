import { FRICTION, GRAVITY, GROUND } from './physics.js'


export class HealthPotion {
    constructor(id, x, y, healValue){
        this.id = id;
        this.x = x;
        this.y = y;
        this.healValue = healValue || 0;
        this.width = 50;
        this.height = 50;

        this.unused = true;

        //Movement
        this.vX = 0;
        this.vY = 0;
        this.acceleration = 1;
        this.maxSpeed = 10;
        this.jumpStrength = 15;
        
        //Physics
        this.weight = 1;

        //Rendering
        this.sprite = new Image();
        this.sprite.src = 'assets/sinfall-heart.png';

   
    }
    render(context) {
        if (this.sprite.complete) {
            context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        } else {
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    update() {
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
    onGround() {
        return this.y + this.height >= GROUND;
    }
    used() {
        this.unused = false;
        this.giveHealth();
    }
    giveHealth(){
        return this.healValue;
    }
}