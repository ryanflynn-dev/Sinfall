export class Player {
    constructor(game, collisionBlock){
        this.game = game
        this.collisionBlock = collisionBlock
        this.onPlatform = false;
        
        // Size
        this.width = 50
        this.height = 50
        
        // Placement
        this.x = 0
        this.y = this.game.height - this.height

        // Movement
        this.vy = 0
        this.weight = 1
        this.speed = 0
        this.maxSpeed = 10
    }

    update(input, deltaTime){
        
        // Movement
        this.x += this.speed
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed
        else this.speed = 0

        if (this.x < 0) this.x = 0
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width

        this.y += this.vy
        if (this.onPlatform === true && input.includes(' ') || this.onGround() && input.includes(' ')) {
            this.onPlatform = false
            this.vy -= 15
        } else if (!this.onGround() && !this.onPlatform) { // add a check for not being on a platform
            this.vy += this.weight
        } else {
            this.vy = 0
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