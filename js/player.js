import { MeleeHitBox } from "./hitBox.js"
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
        this.attackDirection = "right"
        this.state = "idle"
        this.attackBox = 0
        this.attack = this.attack.bind(this)
        this.image = document.getElementById('player-idle')
        this.imageRight = document.getElementById('player-right')
        this.imageLeft = document.getElementById('player-left')
        this.frameX = 0
        this.frameY = 0
    }
    update(input){
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
        if (input.includes('.') && this.attacking === false) {
                this.attack()
        }
    }
    draw(ctx){
        if (this.state === "idle"){
            ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
        } else if (this.state === "right" || this.state === "idleRight"){
            ctx.drawImage(this.imageRight, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
        } else if (this.state === "left" || this.state === "idleLeft"){
            ctx.drawImage(this.imageLeft, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
        } else {
            ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
        }
        if (this.attacking){
            let attackBox = 0
            if (this.state === "right" || this.state === "idleRight" || this.state === "idle") {
                this.attackDirection = "right"
                attackBox = new MeleeHitBox(this.x + this.width - 15, this.y + 10, "right", 50, 50, ctx)
                attackBox.draw()
                setTimeout(() => {
                    attackBox = null
                }, 50)
            } else if (this.state === "left" || this.state === "idleLeft") {
                this.attackDirection = "left"
                attackBox = new MeleeHitBox(this.x - this.width + 30, this.y + 10, "left", 50, 50, ctx)
                attackBox.draw()
                setTimeout(() => {
                    attackBox = null
                }, 50)
            } else if (this.state === "jumping" || this.state === "falling") {
                this.attackDirection = "right"
                attackBox = new MeleeHitBox(this.x + this.width - 15, this.y + 10, "right", 50, 50, ctx)
                attackBox.draw()
                setTimeout(() => {
                    attackBox = null
                }, 50)
            }
            this.attackBox = attackBox
        }
    }
    onGround(){
        return this.y >= this.game.height - this.height
    }
    attack(){
            this.attacking = true
            setTimeout(() => {
                this.attacking = false
            }, 50)
    }
}