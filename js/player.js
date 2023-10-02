export class Player {
    constructor(x, y, game){
        this.game = game
        
        // Size
        this.width = 50
        this.height = 50



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

        

        


        this.y += this.vy
        // When the jump key is pressed, temporarily decrement the character's y-coordinate and then increment it back to simulate a jump.
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