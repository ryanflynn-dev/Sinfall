export class Platform {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 20;
        this.sprite = new Image();
        this.sprite.src = 'assets/sinfall-platform.png';
    }
    render(context){
        if (this.sprite.complete) {
            context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        } else {
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}