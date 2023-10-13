import { Player } from "./player.js"
import { InputHandler } from "./input.js"
import { CollisionBlock } from "./collisionBlocks.js"
import { floorCollisions } from "../data/collisions.js"
import { Enemy } from "./enemy.js"

window.addEventListener("load", function(){
    const canvas = document.getElementById("game")
    const ctx = canvas.getContext("2d")
    canvas.width = 360 * 3
    canvas.height = 360 * 3
    class Game{
        constructor(width, height){
            this.width = width
            this.height = height
            this.input = new InputHandler()
            this.collisionBlocks = []
            this.cameraZoom = 1.5
            const floorCollisions2D = []
            for (let i = 0; i < floorCollisions.length; i += 30) {
                floorCollisions2D.push(floorCollisions.slice(i, i + 30))
            }
            floorCollisions2D.forEach((row, y) => {
                row.forEach((symbol, x) => {
                    if (symbol === 202) {
                    this.collisionBlocks.push(
                        new CollisionBlock({
                            x: x * 36,
                            y: y * 36,
                            width: 36,
                            height: 36,
                            ctx
                        })
                    )}
                })
            })
            this.player = new Player(0, this.height - 500, this)
            this.enemy = new Enemy(0, this.height - 500, this)
        }
        update(deltaTime){
            this.player.update(this.input.keys, deltaTime)
            this.enemy.update(deltaTime)
        }
        draw(ctx){
            ctx.clearRect(0, 0, this.width, this.height)
            ctx.save()
            ctx.scale(this.cameraZoom, this.cameraZoom)
            ctx.translate(-this.player.x + this.width / (2 * this.cameraZoom), -this.player.y + this.height / (1.4 * this.cameraZoom))
            ctx.fillStyle = 'black'
            ctx.fillRect(this.player.x - this.width / (2 * this.cameraZoom), this.player.y - this.height / (1.4 * this.cameraZoom), this.width / this.cameraZoom, this.height / this.cameraZoom)
            this.collisionBlocks.forEach((collisionBlock) => {
                collisionBlock.update()
            })
            this.player.draw(ctx)
            this.enemy.draw(ctx)
            ctx.restore()
        }
      }
    const game = new Game(canvas.width, canvas.height)
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