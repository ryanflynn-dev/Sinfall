export class Player {
    constructor(x, y, game){
        this.game = game
        this.width = 50
        this.height = 50
        this.x = x
        this.y = y
        this.vx = 0
        this.vy = 0
        this.weight = 1
        this.speed = 0
        this.maxSpeed = 10
    }
    update(input, deltaTime){
        this.x += this.vx
        if (input.includes('ArrowRight')) {
            this.speed = this.maxSpeed
            this.vx = this.speed
        } else if (input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed
            this.vx = this.speed
        } else { 
            this.speed = 0
            this.vx = 0
        }

        if (this.x < 0) this.x = 0
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width

        this.y += this.vy
        if (this.onGround() && input.includes(' ')) {
            this.vy -= 15
        } else if (!this.onGround()) {
            this.vy += this.weight
        } else if (this.onGround()){
            this.vy = 0
            this.y = this.game.height - this.height
        } 
    }
    draw(context){
        context.fillStyle = 'red'
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    onGround(){
        return this.y >= this.game.height - this.height
    }
}