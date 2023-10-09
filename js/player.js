import { collision } from "./utils.js"

export class Player {
    constructor(x, y, game){
        this.game = game
        this.onPlatform = false
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
        this.onPlatform = false
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
        this.game.collisionBlocks.forEach(collisionBlock => {
            const DIFF = collisionBlock.y - 50
            const collisionCheck = collision(this, collisionBlock)
                if (collisionCheck.includes("collisionBottom") && this.vy > 0) {
                    this.vy = 0
                    this.y = DIFF
                    this.onPlatform = true
                } if (collisionCheck.includes("collisionTop")) {
                    this.vy = 0
                } if (collisionCheck.includes("collisionLeft")) {
                    this.vx = 0
                } if (collisionCheck.includes("collisionRight")) {
                    this.vx = 0
                }
        })
        
        this.y += this.vy
        if (this.onGround() && input.includes(' ')) {
            this.vy -= 15
        } else if (this.onPlatform === true && input.includes(' ')) {
            this.vy -= 15
            this.onPlatform = false
        } else if (!this.onGround() && this.onPlatform === false) {
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