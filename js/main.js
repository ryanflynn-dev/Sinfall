import { Player } from "./player.js"
import { InputHandler } from "./input.js"
import { CollisionBlock } from "./collisionBlocks.js"
import { platformCollision } from "./utils.js"



window.addEventListener("load", function(){
    const canvas = document.getElementById("game")
    const ctx = canvas.getContext("2d")

    canvas.width = 360 * 3
    canvas.height = 360 * 3

    


    class Game{
        constructor(width, height){
            this.width = width
            this.height = height
            this.bgImage = new Image();
            this.bgImage.src = 'img/bg.png';
            this.player = new Player(this)
            this.input = new InputHandler()
            this.collisionBlock = new CollisionBlock(this.width - 500, 980, 200)

            this.cameraZoom = 1.5

        }

        update(deltaTime){
            this.player.update(this.input.keys, deltaTime)

            if (platformCollision({object1: this.player, object2: this.collisionBlock})) {
              this.player.onPlatform = true
          } else {
              this.player.onPlatform = false
          }
        }

        draw(context){
            context.save()

            context.drawImage(this.bgImage, 0, 0, this.width, this.height);


            context.scale(this.cameraZoom, this.cameraZoom)
            context.translate(-this.player.x + this.width / (2 * this.cameraZoom), -this.player.y + this.height / (1.4 * this.cameraZoom))

            this.player.draw(context)
            this.collisionBlock.draw(context)
            
            context.restore()
            
        }
      }

      



    const game = new Game(canvas.width, canvas.height)
    console.log(game)



    let lastTime = 0

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})