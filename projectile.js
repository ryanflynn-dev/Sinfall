export class Projectile {
    constructor(x, y, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.width = 20;
        this.height = 20;
        this.lifespan = 4000;
        this.creationTime = Date.now();
        this.isExpired = false;
        this.sprite = new Image()
        this.sprite.src = 'assets/sinfall-projectile.gif'
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (Date.now() - this.creationTime > this.lifespan) {
            this.isExpired = true;
        }
        }

    render(context) {
        if (this.sprite.complete) {
            context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        } else {
            context.fillStyle = 'yellow';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
