import { collision } from "./utils.js"

export class Player {
    constructor(x, y, game){
        this.game = game
        this.onPlatform = false
        
        // Size
        this.width = 50
        this.height = 50


        // Old positioning
        this.xOld = x
        this.yOld = y

        // Placement
        this.x = x
        this.y = y



        // Movement
        this.vx = 0
        this.vy = 0
        this.weight = 1
        this.speed = 0
        this.maxSpeed = 10
    }

    update(input, deltaTime){

        console.log("Old Y = ", this.yOld, "Old X = ", this.xOld)

        this.onPlatform = false;

        
        // Movement
        this.x += this.vx
        // When the right arrow key is pressed, increment the character's x-coordinate.
        if (input.includes('ArrowRight')) {
            this.speed = this.maxSpeed
            this.vx = this.speed
        }
        //When the left arrow key is pressed, decrement the character's x-coordinate.
        else if (input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed
            this.vx = this.speed
        }
        else { 
            this.speed = 0
            this.vx = 0
        }

        if (this.x < 0) this.x = 0
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width

        
// THIS NEEDS WORK, WORKING ON THE PLATFORM COLLISION BUT BUG IN THE COLLISION BOTTOM STATEMENT WHERE YOU SINK INTO THE PLATFORMS
        this.game.collisionBlocks.forEach(collisionBlock => {
            const collisionCheck = collision(this, collisionBlock);
            
            let isPureBottomCollision = collisionCheck.includes("collisionBottom") &&
                                        !collisionCheck.includes("collisionTop") &&
                                        !collisionCheck.includes("collisionLeft") &&
                                        !collisionCheck.includes("collisionRight")
        
            if (isPureBottomCollision && this.vy > 0) {
                console.log("pure bottom collision")
                this.vy = 0
                this.y = collisionBlock.y - this.height
                this.onPlatform = true
            } else {
                if (collisionCheck.includes("collisionBottom") && this.vy > 0) {
                    console.log("bottom")
                    this.vy = 0
                }
                if (collisionCheck.includes("collisionTop")) {
                    console.log("top")
                    this.vy = 0
                }
                if (collisionCheck.includes("collisionLeft")) {
                    console.log("left")
                    this.vx = 0
                }
                if (collisionCheck.includes("collisionRight")) {
                    console.log("right")
                    this.vx = 0
                }
            }
        })
        
        


        this.y += this.vy
        // When the jump key is pressed, temporarily decrement the character's y-coordinate and then increment it back to simulate a jump.
        if (this.onGround() && input.includes(' ')) {
            this.vy -= 15
        }
        else if (this.onPlatform === true && input.includes(' ')) {
            this.vy -= 15
            this.onPlatform = false
        }
        // If not colliding, increment the character's y-coordinate to simulate gravity pulling them downwards.
        else if (!this.onGround() && this.onPlatform === false) {
            this.vy += this.weight
        } 
        // If a collision with the ground is detected, stop updating the character's y-coordinate downward.
        else if (this.onGround()){
            this.vy = 0
            this.y = this.game.height - this.height
        } 


        console.log("New Y = ", this.y, "New X = ", this.x)
    }

    draw(context){
        context.fillStyle = 'red'
        context.fillRect(this.x, this.y, this.width, this.height)
    }

//Continuously check if the character is colliding with a ground object.
    onGround(){
        return this.y >= this.game.height - this.height
    }

}