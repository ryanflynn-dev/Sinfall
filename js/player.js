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
        this.attacking = false
        this.state = "idle"
        this.attack = this.attack.bind(this)
        this.image = document.getElementById('eggplant')
        this.frameX = 0
        this.frameY = 0
    }
    update(input, deltaTime){
        this.onPlatform = false
        this.x += this.vx
        if (input.includes('d')) {
            this.speed = this.maxSpeed
            this.vx = this.speed
            this.state = "right"
        } else if (input.includes('a')) {
            this.speed = -this.maxSpeed
            this.vx = this.speed
            this.state = "left"
        } else { 
            this.speed = 0
            this.vx = 0
            if (this.state === "right") this.state = "idleRight"
            else if (this.state === "left") this.state = "idleLeft"
        }
        if (this.x < 0) this.x = 0
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width
        this.game.collisionBlocks.forEach(collisionBlock => {
            const DIFF = collisionBlock.y - this.height
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
        if (this.onGround() && input.includes(',')) {
            this.vy -= 15
            this.state = "jumping"
        } else if (this.onPlatform === true && input.includes(',')) {
            this.vy -= 15
            this.onPlatform = false
            this.state = "jumping"
        } else if (!this.onGround() && this.onPlatform === false) {
            this.vy += this.weight
            if (this.state === "jumping") this.state = "falling"
        } else if (this.onGround()){
            this.vy = 0
            this.y = this.game.height - this.height
            if (this.state === "falling") this.state = "idle"
        } else if (this.onPlatform === true) {
            this.vy = 0
            if (this.state === "falling") this.state = "idle"
        }
        if (input.includes('.')) {
            this.attack()
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    onGround(){
        return this.y >= this.game.height - this.height
    }
    attack(){
        if (this.state === "right" || this.state === "idleRight"){
            if (!this.attacking){
                this.attacking = true
                console.log("attack right")
                setTimeout(() => {
                    this.attacking = false
                }, 500)
            }
        }
        if (this.state === "left" || this.state === "idleLeft"){
            if (!this.attacking){
                this.attacking = true
                console.log("attack left")
                setTimeout(() => {
                    this.attacking = false
                }, 500)
            }
        }
        if (this.state === "idle"){
            if (!this.attacking){
                this.attacking = true
                console.log("attack")
                setTimeout(() => {
                    this.attacking = false
                }, 500)
            }
        }
    }
}